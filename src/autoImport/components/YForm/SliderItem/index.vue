<script setup lang="ts">
import type { YFormSliderItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormSliderItem' })
interface ComponentProps {
  props?: YFormSliderItemProps['props']
  event?: YFormSliderItemProps['event']
}

const modelValue = defineModel<number | [number, number]>({ required: true, default: 0 })
const props = withDefaults(defineProps<ComponentProps>(), { props: () => ({}), event: () => ({}) })
</script>
<template>
  <div class="yform-slider__container">
    <el-slider class="w-100%" v-model="modelValue" v-bind="props.props" v-on="props.event" />
  </div>
</template>
<style lang="scss" scoped>
.yform-slider__container {
  @apply flex w-100% box-border;
  padding: 0 12px;
  min-width: 100px;
}
</style>
