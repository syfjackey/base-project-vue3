<script setup lang="ts">
import type { ConvertProps, YFormNumberItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormNumberItem' })
interface ComponentProps {
  props?: ConvertProps<YFormNumberItemProps['props']>
  event?: YFormNumberItemProps['event']
}
const align = computed(() => {
  return props.props?.align || 'center'
})
const modelValue = defineModel<number>({})
const props = withDefaults(defineProps<ComponentProps>(), { props: () => ({}), event: () => ({}) })
const { props: bindProps, event: bindEvent } = toRefs(props)
</script>
<template>
  <el-input-number
    class="yform__numberitem"
    v-model="modelValue"
    controls-position="right"
    :precision="0"
    :value-on-clear="null"
    placeholder="请输入..."
    v-bind="bindProps"
    v-on="bindEvent" />
</template>
<style lang="scss" scoped>
.yform__numberitem {
  width: 100%;
  :deep(.el-input__inner) {
    text-align: v-bind(align);
  }
}
</style>
