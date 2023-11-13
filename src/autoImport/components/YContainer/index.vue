<script setup lang="ts">
import type { YContainerProps } from './component-type'
defineOptions({ inheritAttrs: false, name: 'YContainer' })
const props = withDefaults(defineProps<YContainerProps>(), { gap: '8px' })
const { gap } = toRefs(props)
const slots = useSlots()
const { top, left, right, bottom } = globalConfig?.hideContainer || {}
const query = basicTools.getQuery()
const hideTop = !slots.top || query.hideTop || top || false
const hideLeft = !slots.left || query.hideLeft || left || false
const hideRight = !slots.right || query.hideRight || right || false
const hideBottom = !slots.bottom || query.hideBottom || bottom || false
</script>
<template>
  <div class="ycontainer__container">
    <div class="ycontainer__container__header" v-if="!hideTop">
      <slot name="top"></slot>
    </div>
    <div class="ycontainer__container__main">
      <div class="ycontainer__container__main__left" v-if="!hideLeft"><slot name="left"></slot></div>
      <div class="ycontainer__container__main__center"><slot></slot></div>
      <div class="ycontainer__container__main__right" v-if="!hideRight"><slot name="right"></slot></div>
    </div>
    <div class="ycontainer__container__footer" v-if="!hideBottom"><slot name="bottom"></slot></div>
  </div>
</template>
<style lang="scss" scoped>
.ycontainer__container {
  @apply w-100% h-100% overflow-hidden flex-h;
  gap: v-bind(gap);
  &__header {
    @apply w-100% overflow-hidden;
  }
  &__main {
    @apply w-100% flex-fit-h  flex-w;
    gap: v-bind(gap);
    &__left {
      @apply h-100% overflow-hidden;
    }
    &__center {
      @apply h-100% overflow-hidden flex-fit-w;
    }
    &__right {
      @apply h-100% overflow-hidden;
    }
  }
  &__footer {
    @apply w-100% overflow-hidden;
  }
}
</style>
