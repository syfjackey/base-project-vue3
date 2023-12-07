<script setup lang="ts">
import YFormInputItem from '../InputItem/index.vue'
import YFormPasswordItem from '../PasswordItem/index.vue'
import YFormTextareaItem from '../TextareaItem/index.vue'
import YFormSelectItem from '../SelectItem/index.vue'
import YFormCascaderItem from '../CascaderItem/index.vue'
import YFormRadioItem from '../RadioItem/index.vue'
import YFormSwitchItem from '../SwitchItem/index.vue'
import YFormNumberItem from '../NumberItem/index.vue'
import YFormNumberRangeItem from '../NumberRangeItem/index.vue'
import YFormSliderItem from '../SliderItem/index.vue'
import YFormSlotItem from '../SlotItem/index.vue'
import YFormCheckboxItem from '../CheckboxItem/index.vue'
import YFormDateItem from '../DateItem/index.vue'
import YFormTimeItem from '../TimeItem/index.vue'
import YFormTimeRangeItem from '../TimeRangeItem/index.vue'
import YFormDateRangeItem from '../DateRangeItem/index.vue'
import YFormTreeSelectItem from '../TreeSelectItem/index.vue'
import YFormTextItem from '../TextItem/index.vue'
import type { YFormItemProps } from '../componet-type'
defineOptions({ name: 'YFormItem' })
interface ComponentProps {
  item: YFormItemProps
}
const isInline = inject('yform-inline', ref(false))
const modelValue = defineModel<any>({ required: true })
const props = withDefaults(defineProps<ComponentProps>(), { item: () => ({}) as YFormItemProps })
const componetName = computed(() => {
  switch (props.item.type) {
    case 'input':
      return YFormInputItem
    case 'password':
      return YFormPasswordItem
    case 'textarea':
      return YFormTextareaItem
    case 'select':
      return YFormSelectItem
    case 'cascader':
      return YFormCascaderItem
    case 'radio':
      return YFormRadioItem
    case 'switch':
      return YFormSwitchItem
    case 'number':
      return YFormNumberItem
    case 'numberRange':
      return YFormNumberRangeItem
    case 'slider':
      return YFormSliderItem
    case 'checkbox':
      return YFormCheckboxItem
    case 'date':
    case 'month':
    case 'week':
    case 'year':
    case 'dates':
    case 'datetime':
      return YFormDateItem
    case 'time':
      return YFormTimeItem
    case 'timeRange':
      return YFormTimeRangeItem
    case 'treeSelect':
      return YFormTreeSelectItem
    case 'dateRange':
    case 'datetimeRange':
    case 'monthRange':
      return YFormDateRangeItem
    case 'text':
      return YFormTextItem
    case 'slot':
      return YFormSlotItem
    default:
      console.log('不存在该组件')
      return YFormSlotItem
  }
})
const componentWidth = computed(() => {
  if (!props.item.width) {
    if (isInline.value) {
      switch (props.item.type) {
        case 'datetimeRange':
          return '340px'
        case 'switch':
        case 'radio':
        case 'checkbox':
          return '100%'
        case 'date':
        case 'slider':
          return '120px'
        case 'week':
          return '140px'
        case 'month':
          return '120px'
        case 'datetime':
          return '180px'
        case 'time':
          return '104px'
        case 'timeRange':
          return '180px'
        case 'dateRange':
        case 'monthRange':
          return '220px'
        case 'year':
          return '96px'
        case 'number':
          return '100px'
        case 'numberRange':
          return '160px'
        default:
          /* 默认宽度 */
          return '160px'
      }
    }
    return '100%'
  }
  return typeof props.item.width === 'number' ? `${props.item.width}px` : props.item.width
})

const slotName = computed(() => {
  if (props.item.type === 'slot') {
    return props.item.field
  }
  return
})

const bindProps = computed(() => {
  const pObj = props.item.props as Record<string, any>
  if (!pObj) return pObj
  return Object.keys(pObj)?.reduce(
    (obj, key: string) => {
      obj[key] = isRef(pObj[key]) ? unref(pObj[key]) : pObj[key]
      return obj
    },
    {} as Record<string, any>
  )
})
</script>
<template>
  <div class="yform-item__container">
    <slot :name="slotName">
      <component :is="componetName" v-bind="item" :props="bindProps" v-model="modelValue"></component>
    </slot>
  </div>
</template>
<style lang="scss" scoped>
.yform-item__container {
  @apply flex items-center box-border;
  --yform-item-width: v-bind(componentWidth);
  width: var(--yform-item-width);
  :deep(.el-date-editor--datetimerange) {
    --el-date-editor-datetimerange-width: 320px;
    .el-range-input {
      width: 44%;
    }
  }
}
</style>
