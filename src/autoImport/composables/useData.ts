import type { WatchOptions, WatchSource, Ref } from 'vue'

interface WatchKeyOptions<T> extends WatchOptions {
  /* 只有当监听的值为真时 才执行 */
  exist?: boolean
  /* 回调函数 */
  callback?: (data: T) => void
}
/**
 * useData
 * @description
 * @param value 默认值
 * @param watchOptions watch配置
 * @returns data  数据
 * @returns watchKey 监听方法
 * @returns reset 重置数据
 */
export function useData<T>(defaultData: T, watchOptions?: WatchKeyOptions<T>) {
  const data = ref<T>(defaultData) as Ref<T>
  function watchKey(key: WatchSource<T>, dataFormat?: (val: T) => T | undefined, options?: WatchKeyOptions<T>): void
  function watchKey<W>(key: WatchSource<W>, dataFormat: (val: W) => T | undefined, options?: WatchKeyOptions<T>): void
  function watchKey(key: WatchSource<any>, dataFormat?: (val?: any) => any, options?: WatchKeyOptions<T>) {
    const { exist = true, callback } = { ...watchOptions, ...options }
    watch(
      key,
      async (val) => {
        const noDo = val === null || val === undefined || val === false
        if (exist && noDo) return
        const p = dataFormat ? await dataFormat(val) : val
        if (p === undefined) return
        data.value = p
        callback?.(data.value)
      },
      { ...watchOptions, ...options }
    )
  }
  function reset(value: T) {
    data.value = value === undefined ? defaultData : value
  }
  return { data, watchKey, reset }
}
interface useAsyncDataReturn<T, W extends (args: any) => T | Promise<T>> {
  data: Ref<T>
  watchKey: {
    <M extends Parameters<W>[0]>(key: WatchSource<M>, paramsFormat?: (val: M) => M | undefined, options?: WatchKeyOptions<T>): void
    <V>(key: WatchSource<V>, paramsFormat: (val: V) => Parameters<W>[0] | undefined, options?: WatchKeyOptions<T>): void
  }
  loading: Ref<boolean>
  reset: (value?: T) => void
}
/**
 * useAsyncData
 * @description 初始化数据
 *
 * @param defaultData  默认值
 * @param getData 更新函数
 * @param params 函数传参
 * @returns data  数据
 * @returns watchKey 监听方法
 */
export function useAsyncData<T, W extends () => T | Promise<T>>(defaultData: T, getData: W): useAsyncDataReturn<T, W>
export function useAsyncData<T, W extends (args: any) => T | Promise<T>>(
  defaultData: T,
  getData: W,
  params: Parameters<W>[0] | Ref<Parameters<W>[0]>
): useAsyncDataReturn<T, W>
export function useAsyncData<T, W extends (args: any) => T | Promise<T>>(
  defaultData: T,
  getData: W,
  params?: Parameters<W>[0] | Ref<Parameters<W>[0]>
): useAsyncDataReturn<T, W> {
  const loading = ref(false)
  const data = ref<T>(defaultData) as Ref<T>
  const newParams = isRef(params) ? params.value : params
  async function init() {
    loading.value = true
    data.value = await getData(newParams)
    loading.value = false
  }
  init()
  if (isRef(params)) {
    watchKey(params)
  }
  function watchKey<M extends Parameters<W>[0]>(
    key: WatchSource<M>,
    paramsFormat?: (val: M) => M | undefined,
    options?: WatchKeyOptions<T>
  ): void
  function watchKey<V>(key: WatchSource<V>, paramsFormat: (val: V) => Parameters<W>[0] | undefined, options?: WatchKeyOptions<T>): void
  function watchKey(key: WatchSource<any>, paramsFormat?: (val?: any) => any, options?: WatchKeyOptions<T>) {
    watch(
      key,
      async (val) => {
        const exist: boolean = options?.exist || true
        const noDo = val === null || val === undefined || val === false
        if (exist && noDo) return
        const p = paramsFormat ? paramsFormat(val) : val
        if (exist && !p) return
        loading.value = true
        data.value = await getData(p)
        loading.value = false
        options?.callback?.(data.value)
      },
      { ...options }
    )
  }
  function reset(value?: T) {
    data.value = value === undefined ? defaultData : value
  }
  return { data, watchKey, loading, reset }
}
