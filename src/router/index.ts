import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useRoutePermission } from './permission'
import type { RouteRecordRaw } from 'vue-router'
import LoginPage from '@/views/login/index.vue'

import OAuthPage from '@/views/oauth/index.vue'
import LayoutContainer from '@/components/LayoutContainer/index.vue'
import BaseRoutes from './modules/baseRoutes'
import demoRoutes from './modules/demoRoutes'
/* 默认跳转页面 */
/**
 * 注意 如果开启统一登录,首页需要接收url中传参时,请避开使用统一登录所使用的callbackType
 */
export const defaultPath = globalConfig.homePath || '/home'
/* 路由集合 */
export const mainRoutes = [...BaseRoutes]
const defaultRoutes: readonly RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/oauth',
    name: 'oauth',
    component: OAuthPage
  },
  {
    path: '/',
    name: 'welcome',
    redirect: defaultPath,
    component: LayoutContainer,
    meta: { required: true },
    children: mainRoutes
  },
  ...demoRoutes,
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
  history: globalConfig.hashRouter ? createWebHashHistory() : createWebHistory(import.meta.env.BASE_URL),
  routes: [...defaultRoutes],
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

useRoutePermission(router, defaultPath)

export default router
