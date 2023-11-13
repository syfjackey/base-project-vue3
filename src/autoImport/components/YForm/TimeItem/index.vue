<script setup lang="ts">
import type { YFormTimeItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormTimeItem' })
interface ComponentProps {
  props?: YFormTimeItemProps['props']
  event?: YFormTimeItemProps['event']
}

const modelValue = defineModel<string>({ required: true, default: '' })
const props = withDefaults(defineProps<ComponentProps>(), { props: () => ({}), event: () => ({}) })
</script>
<template>
  <el-time-picker
    class="flex-fit-w"
    v-model="modelValue"
    format="HH:mm:ss"
    value-format="HH:mm:ss"
    placeholder="请选择..."
    v-bind="props.props"
    v-on="props.event" />
</template>
<style lang="scss" scoped></style>
