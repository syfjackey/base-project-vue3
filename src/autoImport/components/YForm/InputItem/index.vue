<script setup lang="ts">
import type { YFormInputItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormInputItem' })
interface ComponentProps {
  props?: YFormInputItemProps['props']
  event?: YFormInputItemProps['event']
}

const modelValue = defineModel<string>({ required: true, default: '' })
const props = withDefaults(defineProps<ComponentProps>(), { props: () => ({}), event: () => ({}) })
const { props: bindProps, event: bindEvent } = toRefs(props)
</script>
<template>
  <el-input v-model="modelValue" placeholder="请输入..." v-bind="bindProps" v-on="bindEvent" class="yform-input__container">
    <template #prefix v-if="bindProps?.prefixIcon"> <YIcon :icon="bindProps.prefixIcon"></YIcon> </template>
    <template #suffix v-if="bindProps?.suffixIcon"> <YIcon :icon="bindProps.suffixIcon"></YIcon></template>
  </el-input>
</template>
<style lang="scss" scoped>
.yform-input__container {
  min-width: var(--yform-input-min-width);
}
</style>
