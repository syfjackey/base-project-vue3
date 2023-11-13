<script setup lang="ts">
import type { TabPaneName } from 'element-plus'
import { routeTabStore } from './routeTabStore'
import { HomePageName } from '@/router/modules/baseRoutes'
import type { YContextmenuNode } from '../YContextmenu/component-type'
import { useContextMenu } from '../YContextmenu/tools'
import type { DelType } from './component-type'
defineOptions({ name: 'YRouteTab' })
const tabStore = routeTabStore()
const route = useRoute()
const router = useRouter()
const tabChange = async (tabKey: TabPaneName) => {
  tabStore.changeRouteTab(tabKey)
}
const removeTab = (tabKey: TabPaneName, type: DelType = 'self') => {
  tabStore.delRouteTab(`${tabKey}`, type)
}
const refresh = () => router.go(0)

const showTab = computed(() => {
  if (!tabStore.currentTab) return false
  if (tabStore.routeTabs.length === 1 && tabStore.routeTabs[0].routeName === HomePageName) {
    return false
  }
  return true
})

watch(route, (routeValue) => tabStore.addRouteTab(routeValue), { immediate: true })
const { visible, position, openContextMenu, clickItem } = useContextMenu<string>()
const contextmenus = computed<YContextmenuNode[]>(() => {
  if (clickItem.value === tabStore.routeTabs[0].tabKey) {
    return [
      { name: '关闭其他', eventKey: 'closeOther', onClick: () => tabStore.delRouteTab(clickItem.value, 'other') },
      { name: '关闭右侧标签页', eventKey: 'closeRight', onClick: () => tabStore.delRouteTab(clickItem.value, 'right') }
    ]
  }
  return [
    { name: '关闭', eventKey: 'closeSelf', onClick: () => tabStore.delRouteTab(clickItem.value) },
    { name: '关闭其他', eventKey: 'closeOther', onClick: () => tabStore.delRouteTab(clickItem.value, 'other') },
    { name: '关闭右侧标签页', eventKey: 'closeRight', onClick: () => tabStore.delRouteTab(clickItem.value, 'right') }
  ]
})
</script>
<template>
  <div class="yroutetab__container" v-if="showTab" @contextmenu.prevent>
    <div class="yroutetab__container__main">
      <el-tabs :model-value="tabStore.currentTab?.tabKey" @tab-change="tabChange" type="border-card" closable @tab-remove="removeTab">
        <el-tab-pane v-for="item in tabStore.routeTabs" :key="item.tabKey" :name="item.tabKey">
          <template #label>
            <div class="yroutetab__container__item" @contextmenu="openContextMenu($event, item.tabKey)">
              <span>{{ item.title }}</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="yroutetab__container__end" @click="refresh()"><YIcon icon="i-custom:refresh" /> <span>刷新</span></div>
    <YContextmenu v-model="visible" v-model:position="position" :items="contextmenus"></YContextmenu>
  </div>
</template>
<style lang="scss" scoped>
.yroutetab__container {
  @apply w-100%  overflow-hidden h-40px  select-none flex-w items-center box-border;
  // 背景色
  --el-fill-color-light: #fff;
  // 边框颜色
  --el-border-color: #e4e7ed;
  // 字体颜色
  --el-color-primary: #1f85c4;
  // 选中背景色
  --el-bg-color-overlay: #f0f0fa;
  border-top: 1px solid var(--el-border-color);
  border-bottom: 1px solid var(--el-border-color);
  :deep(.el-tabs) {
    border: none;
    .el-tabs__header {
      overflow: hidden;
      border: none;
    }
    .el-tabs__content {
      display: none;
    }
    .el-tabs__item {
      margin-top: 0;
      border-bottom: none;
      border-top: none;
      &:nth-child(1) {
        i {
          display: none;
        }
      }
      outline: none;
    }
    .el-tabs__item:hover .is-icon-close {
      width: 14px;
    }
    .el-tabs__item .is-icon-close {
      width: 0;
    }
    .el-tabs__header .el-tabs__item {
      border-color: var(--el-border-color);
      padding: 0;
    }
  }

  &__main {
    @apply flex-fit-w;
  }
  &__item {
    @apply box-fit flex-center;
    padding: 0 20px;
  }
  &__end {
    @apply h-100% flex-center;
    color: #303133;
    border-left: 1px solid var(--el-border-color);
    padding: 0 10px;
    flex: none;
    cursor: pointer;
    &:active {
      background: var(--el-bg-color-overlay);
    }
  }
}
</style>
