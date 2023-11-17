import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { useLoginStore } from '@/stores/useLoginStore'
import { oAuthLoginIn } from '@/api/oauth'
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body' //指定进度条的父容器
})

const { enable, redirectUrl, callbackType } = globalConfig.oAuthConfig || { enable: false }

function goLogin(path: string) {
  const redirect = path === '/404' ? '' : `?redirect=${encodeURIComponent(path)}`
  if (enable) {
    sessionStorage.setItem('redirectPath', redirectUrl)
    const url = oAuthLoginIn()
    location.href = url
    return false
  }
  return `/login?${redirect}`
}
function getOAuthPath() {
  const backUrl = `${basicTools.getLocalUrl()}oauth`
  if (!redirectUrl) return backUrl
  try {
    const url = new URL(redirectUrl)
    if (globalConfig.hashRouter) {
      return `${url.protocol}//${url.host}${url.pathname}#/oauth`
    } else {
      const pathname = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`
      const path = url.pathname.includes('/oauth') ? redirectUrl : `${pathname}oauth`
      return `${url.protocol}//${url.host}${path}`
    }
  } catch (error) {
    return backUrl
  }
}
export function useRoutePermission(router: Router, defaultPath: string) {
  const homePath = defaultPath
  router.beforeEach(async (to, from) => {
    if (enable && callbackType) {
      /* 如果开启统一登录,则验证是否携带相关数据并跳转验证页面 */
      const url = new URL(location.href)
      const oAuthType = url.searchParams.get(callbackType) || to.query[callbackType]
      if (oAuthType && from.path === '/' && to.path === homePath) {
        const query = { ...to.query, ...Object.fromEntries(url.searchParams.entries()) }
        const params = basicTools.toParams(query)
        const localUrl = `${getOAuthPath()}?${params}`
        location.href = localUrl
        return false
      }
    }

    NProgress.start()
    const { required = false, auth = '' } = to.meta
    const { token, auths, loadStore, getIFrameAuth } = useLoginStore()
    let finallyAuth = auth
    // 访问登录页面
    if (to.path === '/login') {
      return token ? homePath : enable ? goLogin(to.fullPath) : true
    }
    // 访问认证界面
    if (to.path === '/oauth') return token ? homePath : true

    if (required) {
      if (token) {
        const dataStatus = await loadStore()
        if (dataStatus === 'load') return { ...to, replace: true }
        if (dataStatus === 'error') return goLogin(to.fullPath)
        /* iframe嵌入权限验证 */
        if (to.path === '/iframe') {
          if (typeof to.query.url !== 'string') {
            ElMessage({ type: 'warning', message: '页面访问出错,请检查访问地址' })
            return homePath
          } else {
            /* 验证地址与权限 */
            finallyAuth = getIFrameAuth(decodeURIComponent(to.query.url))
          }
        }
        const hasAuth = !finallyAuth || auths.includes(finallyAuth)
        if (!hasAuth) {
          ElMessage({ type: 'warning', message: '暂无权限访问该页面,请向管理员申请' })
        }
        return hasAuth ? true : homePath
      } else {
        return goLogin(to.fullPath)
      }
    }
    return true
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
