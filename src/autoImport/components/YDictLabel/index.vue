<script setup lang="ts">
import type { YDictLabelProps } from './component-type'

defineOptions({ name: 'YDictLabel' })
const props = withDefaults(defineProps<YDictLabelProps>(), { defaultLabel: '未知' })
const { type, value, defaultLabel } = toRefs(props)
const { getDictLabel } = useDict()
const label = getDictLabel(type, value, defaultLabel)
</script>
<template>
  <span class="ydictlabel__container">{{ label }}</span>
</template>
<style lang="scss" scoped>
.ydictlabel__container {
  white-space: nowrap;
}
</style>
