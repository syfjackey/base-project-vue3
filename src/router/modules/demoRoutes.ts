import type { RouteRecordRaw } from 'vue-router'
import YBarDemo from '@/views/demo/YBarDemo.vue'
const routes: readonly RouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'Demo',
    children: [
      {
        path: 'YBar',
        name: 'YBarDemo',
        component: YBarDemo
      }
    ]
  }
]
export default routes
