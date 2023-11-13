<script setup lang="ts">
const title = globalConfig.title || '未定义系统名称'
</script>
<template>
  <div class="applogo__container">
    {{ title }}
  </div>
</template>
<style lang="scss" scoped>
.applogo__container {
  @apply overflow-hidden;
}
</style>
