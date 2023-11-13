<script setup lang="ts">
import type { YFormDateRangeProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormDateRangeItem' })
interface ComponentProps {
  props?: YFormDateRangeProps['props']
  event?: YFormDateRangeProps['event']
  type?: 'monthRange' | 'dateRange' | 'datetimeRange'
}

const modelValue = defineModel<string | [string, string]>({ required: true, default: '' })
const props = withDefaults(defineProps<ComponentProps>(), { type: 'dateRange', props: () => ({}), event: () => ({}) })

const valueFormat = computed(() => {
  switch (props.type) {
    case 'monthRange':
      return 'YYYY-MM'
    case 'datetimeRange':
      return 'YYYY-MM-DD HH:mm:ss'
    default:
      return 'YYYY-MM-DD'
  }
})
const format = computed(() => {
  switch (props.type) {
    case 'datetimeRange':
      return 'YYYY-MM-DD HH:mm:ss'
    case 'monthRange':
      return 'YYYY年M月'
    default:
      return 'YYYY-MM-DD'
  }
})
const dateType = computed(() => props.type.toLowerCase() as 'monthrange' | 'daterange' | 'datetimerange')
</script>
<template>
  <el-date-picker
    v-model="modelValue"
    :format="format"
    :value-format="valueFormat"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :default-time="[new Date('2000-01-01 00:00:00'), new Date('2000-01-01 23:59:59')]"
    :type="dateType"
    v-on="props.event"></el-date-picker>
</template>
<style scoped lang="scss"></style>
