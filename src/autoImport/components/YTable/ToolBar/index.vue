<script setup lang="ts">
import type { YButtonGroupItem } from '../../YButtonGroup/component-type'
import { basicTableTools } from '../tools'
defineOptions({ name: 'YTableTools' })
interface ComponentProps {
  tools?: YButtonGroupItem[]
}
const emit = defineEmits<{ click: [type: string] }>()
const props = withDefaults(defineProps<ComponentProps>(), { tools: () => basicTableTools })
</script>
<template>
  <YBar class="items-center pr-1px" v-if="props.tools.length > 0">
    <slot></slot>
    <template #right>
      <slot name="toolBefore"></slot>
      <YButtonGroup :items="props.tools" @click="(type) => emit('click', type)"></YButtonGroup>
      <slot name="toolEnd"></slot>
    </template>
  </YBar>
</template>
<style lang="scss" scoped></style>
