import { request } from '@/axios'

/* 获取用户基本信息 */
export async function selectUserInfo(): Promise<UserItem> {
  return { id: '' } as UserItem
}

/* 获取用户菜单列表 */
export async function selectUserMenus(): Promise<[MenuItem[], string[]]> {
  const list = await request<MixMenuItem[]>({ url: '/user/menus', method: 'get' })
  const auths = getAuths(list)
  // 注意 菜单会改变list 所以要后执行
  const menus: MenuItem[] = getMenus(list)
  return [menus, auths]
}

export async function selectUserData() {
  return Promise.all([selectUserInfo(), selectUserMenus()])
}

function getAuths(items: MixMenuItem[] = []) {
  const auths: string[] = []
  items.forEach((item) => {
    if (item.enable) {
      if (item.type === 'menu') {
        if (item.isLink) {
          auths.push(item.path)
        } else {
          const subAuth = getAuths(item.children)
          auths.push(...subAuth)
        }
      } else if (item.type === 'auth') {
        auths.push(item.auth)
      }
    }
  })
  return auths
}
function getMenus(items: MixMenuItem[] = []) {
  const menus: MenuItem[] = []
  items.forEach((item) => {
    if (item.enable && item.type === 'menu') {
      const children = getMenus(item.children)
      item.children = children
      menus.push(item)
    }
  })
  return menus
}
