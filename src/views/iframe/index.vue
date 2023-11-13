<script setup lang="ts">
const route = useRoute()

/* 支持传递数据  比如 token 等*/

const iframeUrl = computed(() => {
  const url = decodeURIComponent(route.query.url as string)
  return basicTools.isUrl(url) ? url : `//${url}`
})
</script>
<template>
  <iframe class="iframe__container" :src="iframeUrl"> </iframe>
</template>
<style lang="scss" scoped>
.iframe__container {
  @apply w-100% h-100% overflow-hidden border-none;
}
</style>
