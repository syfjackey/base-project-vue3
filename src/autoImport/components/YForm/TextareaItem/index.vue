<script setup lang="ts">
import type { YFormTextareaItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormTextareaItem' })
interface ComponentProps {
  props?: YFormTextareaItemProps['props']
  event?: YFormTextareaItemProps['event']
}

const modelValue = defineModel<string>({ required: true, default: '' })
const props = withDefaults(defineProps<ComponentProps>(), { props: () => ({}), event: () => ({}) })
</script>
<template>
  <el-input type="textarea" v-model="modelValue" placeholder="请输入..." v-bind="props.props" v-on="props.event"> </el-input>
</template>
<style lang="scss" scoped></style>
