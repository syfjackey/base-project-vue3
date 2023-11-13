<script setup lang="ts">
import type { YHelpProps } from './component-type'

defineOptions({ name: 'YHelp' })
const props = withDefaults(defineProps<YHelpProps>(), {
  message: '',
  icon: 'i-custom:help',
  size: '16px',
  color: '#999'
})
const items = computed(() => {
  return Array.isArray(props.message) ? props.message : [props.message]
})
</script>
<template>
  <el-tooltip placement="right" trigger="hover" effect="light" v-if="props.message">
    <template #content>
      <div class="yhelp__container">
        <div class="yhelp__container__item" v-for="(item, i) in items" :key="i">{{ item }}</div>
      </div>
    </template>
    <YIcon v-bind="$attrs" :icon="props.icon" :size="props.size" :color="props.color" class="cursor-pointer"></YIcon>
  </el-tooltip>
</template>
<style lang="scss" scoped>
.yhelp__container {
  &__item {
    white-space: nowrap;
    font-size: 14px;
    color: #333;
    line-height: 24px;
  }
}
</style>
