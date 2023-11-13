<script setup lang="ts">
import type { YButtonGroupItem, YButtonGroupProps } from './component-type'

defineOptions({ inheritAttrs: false, name: 'YButtonGroup' })
const emit = defineEmits<{ click: [type: string] }>()
const props = withDefaults(defineProps<YButtonGroupProps>(), { items: () => [] })
const { hasAuth } = useAuth()
const filterItems = ref<YButtonGroupItem[]>([])
const changeIcon = (icons: string[] = [], icon?: string) => {
  if (icons.length === 0) return icon
  const index = icons.findIndex((ic) => ic === icon)
  if (index < 0) return icon
  return icons[index + 1] || icons[0]
}
const emitEvent = (item: YButtonGroupItem) => {
  item.icon = changeIcon(item.icons, item.icon)
  if (!item.onClick) {
    return emit('click', item.type)
  }
  return item.onClick()
}

watch(
  () => props.items,
  (items) => {
    filterItems.value = items.filter((item) => {
      if (!item.icon && !item.label) return false
      return hasAuth(item.auth)
    })
  },
  { immediate: true }
)
</script>
<template>
  <div class="ybuttongroup__container">
    <template v-for="(item, i) in filterItems" :key="i">
      <el-tooltip placement="top" trigger="hover" effect="light" :disabled="!item.tip" :content="item.tip">
        <div class="ybuttongroup__container__item" @click="emitEvent(item)">
          <YIcon :icon="item.icon" size="14px" color="#8B8EA9"></YIcon>
          <span v-if="item.label">{{ item.label }}</span>
          <YHelp :message="item.help" size="12px" color="#8B8EA9"></YHelp>
        </div>
      </el-tooltip>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.ybuttongroup__container {
  @apply flex;
  &__item {
    @apply flex-center cursor-pointer font-size-14px select-none transition;
    height: 36px;
    border: 1px solid #e0e2f7;
    padding: 0 14px;
    margin-right: -1px;
    &:hover {
      background: rgba(239, 239, 239, 0.3);
    }
    &:active {
      background: rgba(239, 239, 239, 0.8);
    }
    &:first-child {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-child {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
}
</style>
