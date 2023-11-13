<script setup lang="ts">
defineOptions({ inheritAttrs: false, name: 'YFormSlotItem' })
interface ComponentProps {
  field: string
}
const props = withDefaults(defineProps<ComponentProps>(), {})
</script>
<template>
  <div class="yform-slotitem__container">{{ props.field }}插槽:空</div>
</template>
<style lang="scss" scoped>
.yform-slotitem__container {
  @apply w-100%  overflow-hidden items-center;
}
</style>
