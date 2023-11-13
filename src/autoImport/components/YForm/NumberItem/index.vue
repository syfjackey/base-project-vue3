<script setup lang="ts">
import type { YFormNumberItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormNumberItem' })
interface ComponentProps {
  props?: YFormNumberItemProps['props']
  event?: YFormNumberItemProps['event']
}

const modelValue = defineModel<number>({})
const props = withDefaults(defineProps<ComponentProps>(), { props: () => ({}), event: () => ({}) })
const { props: bindProps, event: bindEvent } = toRefs(props)
</script>
<template>
  <el-input-number
    class="w-100%"
    v-model="modelValue"
    controls-position="right"
    :precision="0"
    :value-on-clear="null"
    placeholder="请输入..."
    v-bind="bindProps"
    v-on="bindEvent" />
</template>
<style lang="scss" scoped></style>
