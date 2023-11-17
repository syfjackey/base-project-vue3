import type { RouteRecordRaw } from 'vue-router'
import YDemoLayout from '@/views/demo/index.vue'
import YBarDemo from '@/views/demo/YBarDemo.vue'
import YButtonDemo from '@/views/demo/YButtonDemo.vue'
import YButtonGroupDemo from '@/views/demo/YButtonGroupDemo.vue'
import YContainerDemo from '@/views/demo/YContainerDemo.vue'
import YContextmenuDemo from '@/views/demo/YContextmenuDemo.vue'
import YDictLabelDemo from '@/views/demo/YDictLabelDemo.vue'
import YFormDemo from '@/views/demo/YFormDemo.vue'
import YHelpDemo from '@/views/demo/YHelpDemo.vue'
import YIconDemo from '@/views/demo/YIconDemo.vue'
import YRouteTabDemo from '@/views/demo/YRouteTabDemo.vue'
import YSearchDemo from '@/views/demo/YSearchDemo.vue'
import YTableDemo from '@/views/demo/YTableDemo.vue'
import YPageTableDemo from '@/views/demo/YPageTableDemo.vue'
const routes: readonly RouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'Demo',
    component: YDemoLayout,
    children: [
      {
        path: 'YBar',
        name: 'YBarDemo',
        component: YBarDemo
      },
      {
        path: 'YButton',
        name: 'YButtonDemo',
        component: YButtonDemo
      },
      {
        path: 'YButtonGroup',
        name: 'YButtonGroupDemo',
        component: YButtonGroupDemo
      },
      {
        path: 'YContainer',
        name: 'YContainerDemo',
        component: YContainerDemo
      },
      {
        path: 'YContextmenu',
        name: 'YContextmenuDemo',
        component: YContextmenuDemo
      },
      {
        path: 'YDictLabel',
        name: 'YDictLabelDemo',
        component: YDictLabelDemo
      },
      {
        path: 'YForm',
        name: 'YFormDemo',
        component: YFormDemo
      },
      {
        path: 'YHelp',
        name: 'YHelpDemo',
        component: YHelpDemo
      },
      {
        path: 'YIcon',
        name: 'YIconDemo',
        component: YIconDemo
      },
      {
        path: 'YRouteTab',
        name: 'YRouteTabDemo',
        component: YRouteTabDemo
      },
      {
        path: 'YSearch',
        name: 'YSearchDemo',
        component: YSearchDemo
      },
      {
        path: 'YTable',
        name: 'YTableDemo',
        component: YTableDemo
      },
      {
        path: 'YPageTable',
        name: 'YPageTableDemo',
        component: YPageTableDemo
      }
    ]
  }
]
export default routes
