/**
 * request 请求函数
 * @description 基于axios进行封装,支持防抖
 */
import axios from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import handleMessage from './handleMessage'
import { useLoginStore } from '@/stores/useLoginStore'

interface RequestConfig extends AxiosRequestConfig {
  cancelDebounce?: boolean
  errorMessage?: string
}

const axiosInstance = axios.create(globalConfig.axiosConfig)
/* 获取Token */
const getToken = () => useLoginStore().token

const requestMap: Map<string, AbortController> = new Map()

const getKey = (config: AxiosRequestConfig) => {
  const { url, method, params, data } = config
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
const removeKey = (config: AxiosRequestConfig) => {
  const key = getKey(config)
  if (requestMap.has(key)) {
    const controller = requestMap.get(key)
    controller!.abort()
    requestMap.delete(key)
  }
}
const addKey = (config: AxiosRequestConfig) => {
  const key = getKey(config)
  const controller = new AbortController()
  config.signal = controller.signal
  requestMap.set(key, controller)
}
const cancelRef = (config: AxiosRequestConfig) => {
  config.url = unref(config.url)
  config.method = unref(config.method)
  config.params = unref(config.params)
  config.data = unref(config.data)
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    cancelRef(config)
    if (!config.headers?.Authorization) {
      config.headers.Authorization = getToken()
    }
    const type = basicTools.getType(config.data)
    if (type !== 'formdata' && !(config as RequestConfig).cancelDebounce) {
      removeKey(config)
      addKey(config)
    }
    return config
  },
  (error) => {
    removeKey(error.config)
    return Promise.reject({ code: 400, message: error.config.errorMessage })
  }
)
axiosInstance.interceptors.response.use(
  (response) => {
    removeKey(response.config)
    if (isBasicResponse(response.data)) {
      const { code, message } = response.data
      if (code === 200 || code === 0) {
        return response.data
      }
      handleMessage(code, message || (response.config as RequestConfig).errorMessage)
      return Promise.reject({ code, message: message || (response.config as RequestConfig).errorMessage })
    }
    return {
      code: 200,
      message: '操作成功',
      data: response.data
    }
  },
  (error) => {
    if (!axios.isCancel(error)) {
      if (error instanceof RangeError) {
        throw new Error('检查传参是否支持JSON.stringify')
      }
      removeKey(error.config)
      handleMessage(error.response.status, error.config.errorMessage)
      return Promise.reject({ code: error.response.status, message: error.config.errorMessage })
    }
    return Promise.reject({ code: 409 })
  }
)

function isBasicResponse(data: any) {
  if (Object.prototype.toString.call(data) !== '[object Object]') return false
  const hasCode = Object.hasOwn(data, 'code') && typeof data.code === 'number'
  const hasData = Object.hasOwn(data, 'data')
  if (hasCode && hasData) return true
  return false
}
interface RequestOptions {
  showSuccessMessage?: boolean
  successMessage?: string
  errorMessage?: string
  cancelDebounce?: boolean
}
function request<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
  const mergeOptions: RequestOptions = {
    showSuccessMessage: false,
    successMessage: '',
    errorMessage: '',
    cancelDebounce: false,
    ...options
  }
  ;(config as RequestConfig).cancelDebounce = mergeOptions.cancelDebounce
  ;(config as RequestConfig).errorMessage = mergeOptions.errorMessage
  return new Promise((resolve, reject) => {
    axiosInstance
      .request<any, any>(config)
      .then((res: BasicResponse<T>) => {
        resolve(res.data)
        if (mergeOptions.showSuccessMessage) {
          handleMessage(200, res.message || mergeOptions.successMessage)
        }
      })
      .catch((error) => reject(error))
  })
}
const clear = () => {
  requestMap.forEach((controller) => controller.abort())
  requestMap.clear()
}
export { clear, request }
