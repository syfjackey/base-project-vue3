<script setup lang="ts">
defineOptions({ inheritAttrs: false, name: 'YFormTextItem' })

const modelValue = defineModel<any>({ required: true, default: '' })
</script>
<template>
  <div class="yform-input__container">
    {{ modelValue }}
  </div>
</template>
<style lang="scss" scoped>
.yform-input__container {
  min-width: var(--yform-input-min-width);
}
</style>
