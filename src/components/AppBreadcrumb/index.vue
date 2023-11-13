<script setup lang="ts">
import { useLoginStore } from '@/stores/useLoginStore'
const { menus } = useLoginStore()
</script>
<template>
  <div class="appbreadcrumb__container">
    <span class="appbreadcrumb__container__lable">当前位置: </span>
    <template>
      <span class="appbreadcrumb__container__item"></span>
      <span class="appbreadcrumb__container__spe">/</span>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.appbreadcrumb__container {
  @apply w-100% h-40px overflow-hidden;
  &__label {
  }
  &__item {
  }
  &__spe {
    &:last-child {
      display: none;
    }
  }
}
</style>
