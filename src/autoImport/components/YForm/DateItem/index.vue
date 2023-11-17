<script setup lang="ts">
import type { YFormDateItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormDateItem' })
interface ComponentProps {
  props?: YFormDateItemProps['props']
  event?: YFormDateItemProps['event']
  type?: 'date' | 'year' | 'month' | 'dates' | 'week' | 'datetime'
}

const modelValue = defineModel<string | [string, string]>({ required: true, default: '' })
const props = withDefaults(defineProps<ComponentProps>(), { type: 'date', props: () => ({}), event: () => ({}) })

const valueFormat = computed(() => {
  switch (props.type) {
    case 'datetime':
      return 'YYYY-MM-DD HH:mm:ss'
    case 'month':
      return 'YYYY-MM'
    case 'year':
      return 'YYYY'
    default:
      return 'YYYY-MM-DD'
  }
})
const format = computed(() => {
  switch (props.type) {
    case 'datetime':
      return 'YYYY-MM-DD HH:mm:ss'
    case 'month':
      return 'YYYY年M月'
    case 'year':
      return 'YYYY年'
    case 'week':
      return 'YYYY年第w周'
    default:
      return 'YYYY-MM-DD'
  }
})
</script>
<template>
  <el-date-picker
    class="flex-fit-w"
    v-model="modelValue"
    :format="format"
    :value-format="valueFormat"
    placeholder="请选择..."
    :type="props.type"
    v-bind="props.props"
    v-on="props.event" />
</template>
<style lang="scss" scoped></style>
