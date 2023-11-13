<script setup lang="ts"></script>
<template>
  <div class="appheader__container">
    <AppLogo></AppLogo>
    <AppHeaderMenu></AppHeaderMenu>
    <AppUser></AppUser>
  </div>
</template>
<style lang="scss" scoped>
.appheader__container {
  @apply w-100%  overflow-hidden h-80px flex-w items-center;
}
</style>
