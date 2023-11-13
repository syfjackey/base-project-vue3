// @unocss-include
import { HomePageName } from '@/router/modules/baseRoutes'
import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { DelType, YRouteTabItem } from './component-type'

const defaultHome: YRouteTabItem = { title: '首页', routeName: HomePageName, tabKey: HomePageName }
/* 生成唯一键值 */
function getTabKey(route: RouteLocationNormalizedLoaded) {
  const query = JSON.stringify(route.query)
  const params = JSON.stringify(route.params)
  const name = route.name as string
  return `${name}_${query}_${params}`
}
export const routeTabStore = defineStore(
  'routeTabStore',
  () => {
    const routeTabs = ref<YRouteTabItem[]>([defaultHome])
    const currentTab = ref<YRouteTabItem | undefined>(routeTabs.value[0])
    const router = useRouter()
    const changeRouteTab = (tabKey?: string | number) => {
      if (!tabKey) return
      if (tabKey === currentTab.value?.tabKey) return
      const activeTab = routeTabs.value.find((item) => item.tabKey === tabKey)
      if (!activeTab) return
      router.push({
        name: activeTab.routeName,
        query: activeTab.query,
        params: activeTab.params
      })
    }
    function addRouteTab(route: RouteLocationNormalizedLoaded, diyTitle?: string) {
      if (!route.name || typeof route.name === 'symbol' || route.meta.tabHide || route.name === HomePageName) {
        if (route.name === HomePageName) {
          // 更新首页传参
          defaultHome.query = route.query
          defaultHome.params = route.params
          defaultHome.tabKey = getTabKey(route)
          currentTab.value = defaultHome
          return
        }
        currentTab.value = undefined
        return
      }
      const tabTitle = diyTitle || route.params.tabTitle || route.meta?.title || route.name || '未定义'
      const title = Array.isArray(tabTitle) ? tabTitle.join('-') : tabTitle
      const routeTab = routeTabs.value.find((item) => {
        return item.tabKey === getTabKey(route)
      })
      if (!routeTab) {
        const addTab: YRouteTabItem = {
          title,
          routeName: route.name,
          query: route.query,
          params: route.params,
          tabKey: getTabKey(route)
        }
        routeTabs.value.push(addTab)
        currentTab.value = addTab
        return
      }
      currentTab.value = routeTab
    }
    function delRouteTab(tabKey?: string, type: DelType = 'self') {
      if (!tabKey) return changeRouteTab()
      const tabIndex = routeTabs.value.findIndex((item) => item.tabKey === tabKey)
      if (tabIndex < 0) return changeRouteTab()
      const tab = routeTabs.value[tabIndex]
      /* 不允许删除首页 */
      if (type === 'self' && tab.routeName === HomePageName) {
        return changeRouteTab()
      }
      /* 保留首页 */
      if (type === 'all') {
        routeTabs.value = [defaultHome]
        if (currentTab.value === defaultHome) {
          return changeRouteTab()
        }
        return changeRouteTab(defaultHome.tabKey)
      }
      /* 保留自身 */
      if (type === 'other') {
        routeTabs.value = routeTabs.value.filter((item) => {
          return item.tabKey === defaultHome.tabKey || item.tabKey === tabKey
        })

        if (currentTab.value?.tabKey === tabKey) {
          return changeRouteTab()
        }
        return changeRouteTab(tabKey)
      }
      /* 清除右侧 */
      if (type === 'right') {
        routeTabs.value.splice(tabIndex + 1)
        const curItem = routeTabs.value.find((item) => item.tabKey === currentTab.value?.tabKey)
        if (curItem) {
          return changeRouteTab()
        }
        return changeRouteTab(tabKey)
      }
      /* 关闭自身 */
      routeTabs.value.splice(tabIndex, 1)
      const curItem = routeTabs.value.find((item) => item.tabKey === currentTab.value?.tabKey)
      if (curItem) {
        return changeRouteTab()
      }
      return changeRouteTab(routeTabs.value[tabIndex - 1].tabKey)
    }

    return { routeTabs, currentTab, addRouteTab, delRouteTab, changeRouteTab }
  },
  {
    persist: {
      paths: ['routeTabs', 'currentTab'],
      storage: sessionStorage
    }
  }
)
