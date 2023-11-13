<script setup lang="ts">
import type { YFormColumn } from '../componet-type'

defineOptions({ name: 'YFormField' })
interface ComponentProps {
  item: YFormColumn
  size?: 'large' | 'default' | 'small'
}
const modelValue = defineModel<any>({ required: true })
const props = withDefaults(defineProps<ComponentProps>(), { size: 'default' })

const iconSize = computed(() => {
  switch (props.size) {
    case 'large':
      return '16px'
    case 'small':
      return '12px'
    default:
      return '16px'
  }
})

const tempField = {
  get modelValue() {
    return modelValue.value
  },
  set modelValue(val) {
    modelValue.value = val
  }
}
</script>
<template>
  <el-form-item :prop="props.item.field">
    <template #label="{ label }">
      <div class="yform-field__label">
        <span>{{ item.label }}</span>
        <YHelp class="ml-3px" :message="item.help" :size="iconSize"></YHelp>
        <span>{{ label }}</span>
      </div>
    </template>
    <YFormItem :item="props.item" v-model="modelValue">
      <template #[props.item.field] v-if="props.item.type === 'slot'">
        <slot :name="props.item.field" :data="tempField"></slot>
      </template>
    </YFormItem>
  </el-form-item>
</template>
<style lang="scss" scoped>
.yform-field__label {
  display: inline-block;
  box-sizing: border-box;
}
</style>
