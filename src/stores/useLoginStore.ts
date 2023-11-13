import { selectUserData } from '@/api/user'
import { oAuthLoginOut } from '@/api/oauth'
import { defineStore } from 'pinia'
const defaultHome = globalConfig.homePath || '/home'
/* 基础库 */
export const useLoginStore = defineStore(
  'loginStore',
  () => {
    const isReady = ref(false)
    const router = useRouter()
    const token = ref('')
    const auths = ref<string[]>([])
    const userInfo = ref<UserItem>({} as UserItem)
    const menus = ref<MenuItem[]>([])
    const loginOut = (isReload: boolean = true) => {
      const remoteToken = token.value
      token.value = ''
      reset()
      if (globalConfig.oAuthConfig?.enable) {
        sessionStorage.removeItem('redirectPath')
        const result = oAuthLoginOut(remoteToken)
        if (result) return
      }
      isReload && router.replace('/login')
    }
    const loadStore = async () => {
      if (isReady.value) return 'ready'
      reset()
      try {
        const [user, [menuList, authList]] = await selectUserData()
        userInfo.value = user
        auths.value = authList
        menus.value = menuList
        isReady.value = true
        return 'load'
      } catch (error) {
        ElMessage({ type: 'error', message: '获取登录信息失败,请检查' })
        loginOut(false)
        return 'error'
      }
    }
    async function loginIn(value: string, redirect?: string, callback?: () => void) {
      token.value = value
      const status = await loadStore()
      if (status === 'error') {
        return
      }
      callback?.()
      const url = redirect || defaultHome
      router.replace(url)
    }
    function reset() {
      isReady.value = false
      auths.value = []
      menus.value = []
      userInfo.value = {} as UserItem
    }
    function getIFrameAuth(url: string) {
      /* 获取iframe嵌入方式的权限 菜单时候直接将路径当做权限存入 */
      return url
    }

    return { token, userInfo, loginOut, auths, loginIn, loadStore, menus, getIFrameAuth }
  },
  {
    persist: {
      paths: ['token'],
      storage: localStorage
    }
  }
)
