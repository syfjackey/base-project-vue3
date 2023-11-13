import 'vue-router'
import type { GlobalComponents } from 'vue'

/* -------------------------- 系统类型 -------------------------- */

/* 路由参数定义 */
declare module 'vue-router' {
  /* 路由meta定义 */
  interface RouteMeta {
    /* 页面标题 */
    title?: string
    /* 页面图标 */
    icon?: string
    /* 访问权限 */
    auth?: string
    /* 是否出现在路由页签中 */
    tabHide?: boolean
  }
}
/* 配置项参数定义 */
declare global {
  export const globalConfig: {
    /* 项目名称 */
    title: string
    /* 登录后默认跳转页面 */
    homePath: string
    /* 是否是hash路由 */
    hashRouter: boolean
    /* 接口配置 */
    axiosConfig: {
      /* 基础接口地址 */
      baseUrl: string
      /* 超时时间 */
      timeout: number
    }
    /* 使用统一认证 */
    oAuthConfig: {
      /* 是否开启 */
      enable: boolean
      /* 统一认证基础地址 */
      oAuthUrl: string
      /* 重定向地址 */
      redirectUrl: string
      /* 返回赋值字段 */
      callbackType: string
      /* 客户端Id */
      clientId: string
      /* 客户端密钥 */
      clientSecret: string
    }
    /* 辅助接口地址 */
    supplyUrl: {
      [key: string]: string
    }
    /* 隐藏界面容器 */
    hideContainer: {
      top: boolean
      left: boolean
      right: boolean
      bottom: boolean
    }
  }
  type GlobalInstanceType = {
    [Property in keyof GlobalComponents]: InstanceType<GlobalComponents[Property]>
  }
}
