<script lang="ts" setup>
import type { YBarProps } from './component-type'

defineOptions({ name: 'YBar' })
const props = withDefaults(defineProps<YBarProps>(), { gap: '0', dir: 'row' })
const { gap, dir } = toRefs(props)
const slots = useSlots()

const beforeSlot = computed(() => {
  if (dir.value === 'row') {
    return slots.left || slots.top
  }
  return slots.top || slots.left
})
const defaultSlot = computed(() => {
  return slots.default
})
const afterSlot = computed(() => {
  if (dir.value === 'row') {
    return slots.right || slots.bottom
  }
  return slots.bottom || slots.right
})
defineSlots<{
  left: () => any
  right: () => any
  top: () => any
  bottom: () => any
  default: () => any
}>()
</script>
<template>
  <div :class="['ybar__container', dir === 'row' ? 'w-100%' : 'h-100%']">
    <div class="ybar__container__before" v-if="beforeSlot"><component :is="beforeSlot"></component></div>
    <div :class="['ybar__container__default', dir === 'row' ? 'w-0' : 'h-0']">
      <template v-if="defaultSlot"><component :is="defaultSlot"></component></template>
    </div>
    <div :class="['ybar__container__after']" v-if="afterSlot">
      <component :is="afterSlot"></component>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.ybar__container {
  @apply flex overflow-hidden   justify-between box-border;
  flex-direction: v-bind(dir);
  gap: v-bind(gap);
  &__before {
    @apply flex-none;
  }
  &__default {
    @apply flex-1 overflow-hidden;
  }
  &__after {
    @apply flex-none;
  }
}
</style>
