<script setup lang="ts">
import type { ConvertProps, YFormSwitchItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormSwitchItem' })
interface ComponentProps {
  props?: ConvertProps<YFormSwitchItemProps['props']>
  event?: YFormSwitchItemProps['event']
}
const modelValue = defineModel<string | number | boolean>({})
const props = withDefaults(defineProps<ComponentProps>(), { props: () => ({}), event: () => ({}) })
</script>
<template>
  <el-switch v-model="modelValue" inline-prompt v-bind="props.props" v-on="props.event" />
</template>
<style lang="scss" scoped></style>
