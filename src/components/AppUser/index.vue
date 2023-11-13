<script setup lang="ts">
import { useLoginStore } from '@/stores/useLoginStore'
const test = useLoginStore()
</script>
<template>
  <div class="appuser__container">头像 用户 退出 修改密码 等等基础内容</div>
</template>
<style lang="scss" scoped>
.appuser__container {
  @apply overflow-hidden;
}
</style>
