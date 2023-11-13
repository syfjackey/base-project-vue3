<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
</script>
<template>
  <YContainer>
    <template #top>
      <AppHeader></AppHeader>
    </template>
    <template #left> </template>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </YContainer>
</template>
<style lang="scss" scoped></style>
