import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
import '@/assets/css/main.scss'
import useCommonDirectives from '@/autoImport/directives/index'
import useDirectives from '@/directives/index'
import { selectDict, dictMap } from '@/api/dict'
/* 右键菜单组件 */
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import 'dayjs/locale/zh-cn'
const { setRemote } = useDict()
// 初始化远端字典配置
setRemote(selectDict, dictMap)
const store = createPinia()
store.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(store)
app.use(router)
app.use(useCommonDirectives)
app.use(useDirectives)
app.use(ContextMenu)
app.mount('#app')
