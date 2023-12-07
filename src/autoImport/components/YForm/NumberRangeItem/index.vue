<script setup lang="ts">
import type { ConvertProps, YFormNumberRangeItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormNumberRangeItem' })
interface ComponentProps {
  props?: ConvertProps<YFormNumberRangeItemProps['props']>
  event?: YFormNumberRangeItemProps['event']
}

const modelValue = defineModel<number[] | string>({})
const props = withDefaults(defineProps<ComponentProps>(), { props: () => ({}), event: () => ({}) })
const { props: bindProps, event: bindEvent } = toRefs(props)
const startValue = ref<number>()
const endValue = ref<number>()
watch(
  () => modelValue.value,
  (val) => {
    if (Array.isArray(val)) {
      startValue.value = isNaN(+val[0]) ? undefined : +val[0]
      endValue.value = isNaN(+val[1]) ? undefined : +val[1]
    } else if (typeof val === 'string') {
      const vals = val.split(',')
      startValue.value = isNaN(+vals[0]) ? undefined : +vals[0]
      endValue.value = isNaN(+vals[1]) ? undefined : +vals[1]
    }
  },
  {
    immediate: true,
    deep: true
  }
)
let timer: number
const changeNum = () => {
  bindEvent.value?.change?.(startValue.value, endValue.value)
  if (typeof startValue.value === 'number' && typeof endValue.value === 'number') {
    const vals = [startValue.value, endValue.value]
    modelValue.value = vals
  }
  clearTimeout(timer)
  timer = setTimeout(() => {
    sortNum()
  }, 300)
}
const sortNum = () => {
  if (typeof startValue.value === 'number' && typeof endValue.value === 'number') {
    if (startValue.value > endValue.value) {
      modelValue.value = [endValue.value, startValue.value]
    }
  }
}
</script>
<template>
  <div class="yform-numberrange__container">
    <el-input-number
      v-model="startValue"
      :controls="false"
      controls-position="right"
      :precision="0"
      :value-on-clear="null"
      class="flex-fit-w"
      @change="changeNum()"
      @blur="sortNum()"
      v-bind="bindProps" />
    <span class="yform-numberrange__container__separator"> {{ bindProps.separator || '-' }} </span>
    <el-input-number
      v-model="endValue"
      :controls="false"
      controls-position="right"
      :precision="0"
      :value-on-clear="null"
      class="flex-fit-w"
      @change="changeNum()"
      @blur="sortNum()"
      v-bind="bindProps" />
  </div>
</template>
<style lang="scss" scoped>
.yform-numberrange__container {
  @apply flex w-100% box-border items-center;
  min-width: 100px;
  &__separator {
    margin: 0 12px;
  }
}
</style>
