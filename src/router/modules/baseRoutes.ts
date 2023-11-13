import type { RouteRecordRaw } from 'vue-router'
import NotFoundPage from '@/views/404/index.vue'
import IframePage from '@/views/iframe/index.vue'
import HomePage from '@/views/home/index.vue'
export const HomePageName = 'home'
const routes: readonly RouteRecordRaw[] = [
  {
    path: '/home',
    name: HomePageName,
    component: HomePage,
    meta: { required: false }
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFoundPage,
    meta: { required: true, tabHide: true }
  },
  {
    path: '/iframe',
    name: 'iframe',
    component: IframePage,
    meta: { required: false }
  }
]
export default routes
