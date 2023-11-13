<script setup lang="ts">
import type { YIconProps } from './component-type'

defineOptions({ inheritAttrs: false, name: 'YIcon' })
const props = withDefaults(defineProps<YIconProps>(), { color: '', size: '14px' })
const { icon, size, color } = toRefs(props)
const iconType = computed(() => {
  if (!icon?.value) return ''
  if (icon.value.startsWith('i-') && !icon.value.includes('.')) return 'icon'
  return 'img'
})
const imgSrc = computed(() => {
  return `url("${basicTools.getImg(icon?.value!)}")`
})
</script>
<template>
  <i v-if="iconType === 'icon'" :class="['common__icon', icon]" v-bind="$attrs"> </i>
  <i v-else-if="iconType === 'img'" :class="['common__icon', 'common__icon__img']" v-bind="$attrs"></i>
  <i v-else class="display-none"></i>
</template>
<style lang="scss" scoped>
.common__icon {
  font-size: v-bind(size);
  color: v-bind(color);
  vertical-align: middle;
  display: inline-block;
  &:has(+ *) {
    margin-right: 4px;
  }
  &__img {
    width: v-bind(size);
    height: v-bind(size);
    background-image: v-bind(imgSrc);
    background-size: contain;
  }
}
</style>
