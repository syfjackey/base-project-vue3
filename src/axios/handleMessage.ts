import { useLoginStore } from '@/stores/useLoginStore'
/* 注意 同步修改index文件 */
const CodeMap: { [key: number]: string } = {
  0: '操作成功',
  200: '操作成功',
  400: '验证失败',
  401: 'token失效,请重新登录',
  409: '用户取消了此次请求',
  500: '服务出现异常,请联系管理员!'
}

export default (code: number, message?: string) => {
  if (code === 401) {
    const { loginOut } = useLoginStore()
    loginOut()
  }

  ElMessage({
    message: message || CodeMap[code] || `服务出现异常,请联系管理员! 错误码(${code})`,
    type: code === 200 ? 'success' : 'error',
    grouping: true
  })
}
