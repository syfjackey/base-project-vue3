<script setup lang="ts">
import type { ConvertProps, YFormTimeRangeProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormTimeRangeItem' })
interface ComponentProps {
  props?: ConvertProps<YFormTimeRangeProps['props']>
  event?: YFormTimeRangeProps['event']
}

const modelValue = defineModel<string>({ required: true, default: '' })
const props = withDefaults(defineProps<ComponentProps>(), { props: () => ({}), event: () => ({}) })
</script>
<template>
  <el-time-picker
    class="w-100%"
    is-range
    v-model="modelValue"
    format="HH:mm:ss"
    value-format="HH:mm:ss"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="请选择..."
    v-bind="props.props"
    v-on="props.event" />
</template>
<style lang="scss" scoped></style>
