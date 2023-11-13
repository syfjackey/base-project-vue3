// 类型定义于 @/types/system.d.ts中
// eslint-disable-next-line no-unused-vars
const globalConfig = {
  title: '公共项目',
  /* 登录后默认跳转页面 */
  // homePath: '/home',
  hashRouter: true,
  /* 接口基础配置 */
  axiosConfig: {
    /* 接口地址 */
    baseURL: '/proxy',
    /* 超时时间 */
    timeout: 12000
  },
  oAuthConfig: {
    /* 启用统一登录 */
    enable: false,
    /* 统一认证地址 */
    oAuthUrl: 'http://192.168.100.132:9900',
    /* 重定向地址 */
    redirectUrl: 'http://127.0.0.1:8088',
    /* 返回的赋值字段 */
    callbackType: 'code',
    /* 客户端ID */
    clientId: 'pcsdp',
    /* 客户端密钥 */
    clientSecret: 'pcsdp'
  },
  /* 辅助接口地址 */
  supplyUrl: {}
  /* 隐藏容器布局 */
  // hideContainer: {
  //   top: false,
  //   left: false,
  //   right: false,
  //   bottom: false
  // }
}
