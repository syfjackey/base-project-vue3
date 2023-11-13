<script setup lang="ts">
import { useLoginStore } from '@/stores/useLoginStore'
const test = useLoginStore()
</script>
<template>
  <div class="appmenus__container">支持左右滚动的 顶部菜单 菜单必须是后端返回的所有可访问的页面</div>
</template>
<style lang="scss" scoped>
.appmenus__container {
  @apply overflow-hidden flex-1;
}
</style>
