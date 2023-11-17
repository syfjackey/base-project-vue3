<script setup lang="ts">
import type { YContextmenuProps, YContextmenuNode, YContextmenuItem, Point } from './component-type'

defineOptions({ inheritAttrs: false, name: 'YContextmenu' })
const emit = defineEmits<{ click: [type: string] }>()
/* 写成递归组件比较好,不过就一级也就无所谓了 */
const visible = defineModel<boolean>({ default: false })
const props = withDefaults(defineProps<YContextmenuProps>(), { items: () => [] })
const { items } = toRefs(props)
const position = defineModel<Point>('position')
const options = computed(() => {
  return {
    zIndex: 99,
    minWidth: 160,
    ...position.value
  }
})
const hasIcon = (items: YContextmenuNode[] = []) => {
  return items.some((item) => !!item.icon)
}
const hasChildren = (item: YContextmenuItem) => {
  if (!item.children) return false
  return item.children.length > 0
}
const onClick = (item: YContextmenuItem, event: PointerEvent) => {
  event.preventDefault()
  event.stopPropagation()
  item.eventType && emit('click', item.eventType)
  item.onClick?.()
}
</script>
<template>
  <context-menu v-model:show="visible" :options="options">
    <template v-for="item in items" :key="item.id">
      <context-menu-sperator v-if="item.type === 'sperator'" />
      <template v-else>
        <context-menu-group
          v-if="hasChildren(item)"
          :preserveIconWidth="hasIcon(items)"
          :label="item.label"
          :icon="item.icon"
          :shortcut="item.shortcut"
          :disabled="item.disabled">
          <template v-for="subItem in item.children" :key="subItem.id">
            <context-menu-sperator v-if="subItem.type === 'sperator'" />
            <context-menu-item
              v-else
              :preserveIconWidth="hasIcon(item.children)"
              :label="subItem.label"
              :icon="subItem.icon"
              :shortcut="subItem.shortcut"
              :onClick="(event: PointerEvent) => onClick(subItem, event)"
              :disabled="subItem.disabled" />
          </template>
        </context-menu-group>
        <context-menu-item
          v-else
          :preserveIconWidth="hasIcon(items)"
          :label="item.label"
          :icon="item.icon"
          :shortcut="item.shortcut"
          @click="item.onClick?.()"
          :disabled="item.disabled" />
      </template>
    </template>
  </context-menu>
</template>
<style lang="scss" scoped>
.ycontextmenu__container {
  @apply overflow-hidden;
}
</style>
<style lang="scss">
.mx-context-menu {
  --mx-menu-backgroud-radius: 3px;
  --mx-menu-placeholder-width: 18px;
  --mx-menu-icon-size: 14px;
  padding: 4px 0 !important;
  border: solid 1px var(--mx-menu-divider);

  .mx-context-menu-item {
    border-radius: 3px;
    margin: 0 4px;
    padding: 6px 8px;
  }

  .mx-context-menu-item-sperator {
    padding: 4px 0;
  }

  .mx-right-arrow {
    width: 12px;
    height: 12px;
  }
}
</style>
