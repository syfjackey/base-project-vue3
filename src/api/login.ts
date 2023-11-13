import { request } from '@/axios'
export interface LoginForm_AParams {
  username: string
  password: string
}
/* 验证登录 */
export async function loginApp(data: LoginForm_AParams): Promise<{ token: string }> {
  return request<{ token: string }>({ url: '/login', data, method: 'post' })
}
