import { request } from '@/axios'
const { oAuthUrl, clientId, clientSecret, callbackType, redirectUrl } = globalConfig.oAuthConfig || { clientId: '', clientSecret: '' }
/* 统一登录 token 响应体 */
interface ResphoneToken {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}

/* 统一登录 - 跳转地址 */
export function oAuthLoginIn() {
  /* 和下方字段同步变更 */
  const loginUrl = `${oAuthUrl}/api-uaa/oauth/authorize`
  return `${loginUrl}?client_id=${clientId}&response_type=${callbackType}&redirect_uri=${redirectUrl}`
}
/* 统一登录 - 登出接口 */
export function oAuthLoginOut(token: string) {
  location.href = `${oAuthUrl}/api-uaa/oauth/remove/token?redirect_uri=${redirectUrl}&access_token=${token}`
  /* 由于location.href 需要时间跳转 导致后续代码执行,返回true 阻止后续代码执行 */
  return true
}
/* 统一登录 获取token */
export async function getOAuthToken(code: string): Promise<{ token: string }> {
  if (!oAuthUrl) return { token: '' }
  const redirect = sessionStorage.getItem('redirectPath')
  const result = await request<ResphoneToken>(
    {
      url: `${oAuthUrl}/api-uaa/oauth/token`,
      method: 'post',
      headers: {
        Authorization: 'Basic ' + window.btoa(`${clientId}:${clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirect,
        scope: 'all'
      }
    },
    { errorMessage: '验证码过期,请重新获取' }
  )
  return { token: result.access_token }
}
