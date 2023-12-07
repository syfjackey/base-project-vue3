<script setup lang="ts">
import type { ConvertProps, YFormPasswordItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormPasswordItem' })
interface ComponentProps {
  props?: ConvertProps<YFormPasswordItemProps['props']>
  event?: YFormPasswordItemProps['event']
}

const modelValue = defineModel<string>({ required: true, default: '' })
const props = withDefaults(defineProps<ComponentProps>(), { props: () => ({}), event: () => ({}) })
</script>
<template>
  <el-input
    class="yform-password__container"
    type="password"
    show-password
    v-model="modelValue"
    placeholder="请输入..."
    v-bind="props.props"
    v-on="props.event">
  </el-input>
</template>
<style lang="scss" scoped>
.yform-password__container {
  min-width: var(--inlineform-item-min-width);
}
</style>
