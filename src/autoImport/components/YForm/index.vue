<script setup lang="ts">
/**
 * 此页面调整时会出现死循环现象,此现象仅出现在热更新时,故暂无影响
 * 不绑定v-model 也不会出现此现象
 */

defineOptions({ name: 'YForm' })

import type { YFormProps, YFormColumn } from './componet-type'
import {
  createDefaultForm,
  createFieldMap,
  createFormRules,
  filterProps,
  getDicts,
  getEffectiveForm,
  updateFields,
  updateFieldsByRelation
} from './tools'

const props = withDefaults(defineProps<YFormProps>(), {
  hideFoldGroup: false,
  isInitDict: true,
  foldGroup: () => [],
  layout: () => ({ type: 'grid', cols: 1, gap: 0 }),
  showMessage: true
})
/* ElementTable 传参 */
const formProps = computed(() => filterProps(props))
const isInline = computed(() => {
  return props.layout.type === 'inline'
})
/* 获取列间隔 */
const yFormGap = computed(() => {
  return typeof props.layout.gap === 'string' ? props.layout.gap : `${props.layout.gap ?? 32}px`
})
/* 获取列 */
const yFormCol = computed(() => {
  const col = props.layout.cols ?? 1
  return isInline.value ? 0 : col < 1 ? 1 : col
})

/* 注入 */
provide('yform-inline', isInline)
/* 同步绑定 */
const modelValue = defineModel<Record<string, any>>()
/* 默认值 */
const defaultForm = createDefaultForm(props.columns)

/* 组件表单与真正表单映射关系 */
const fieldMap = createFieldMap(props.columns)
/* 组件使用的表单 */
const bindForm = ref<Record<string, any>>(basicTools.cloneDeep(defaultForm))

// /* 真正表单 */
const effectiveForm = computed(() => getEffectiveForm(bindForm.value, props.columns, fieldMap))
/* 表单验证 */
const { formRef, validateForm } = useForm()

const rules = createFormRules(props.columns, bindForm.value)
/* 初始化字典值 */
const { initDict } = useDict()
onBeforeMount(async () => {
  if (props.isInitDict) {
    const dicts = getDicts(props.columns)
    await initDict(dicts)
  }
})
/* 直接更新表单 */
type UpdateForm = (field: string, value: any) => void | ((map: Record<string, any>) => void)
const updateForm: UpdateForm = (data: string | Record<string, any>, value?: any) => {
  bindForm.value = updateFields(bindForm.value, fieldMap, data, value)
}
/* 根据映射关系更新表单 */
const updateFormByRelation = (map: Record<string, any>) => {
  if (!map) return
  bindForm.value = updateFieldsByRelation(bindForm.value, map, fieldMap, props.columns)
}
/* 重置表单 */
const resetForm = () => {
  const form = basicTools.cloneDeep(defaultForm)
  if (!basicTools.isEmpty(props.form)) {
    bindForm.value = updateFieldsByRelation(form, props.form!, fieldMap, props.columns)
  } else {
    bindForm.value = form
  }
  formRef.value!.clearValidate()
}
/* 表单显隐 */
const isShow = (column: YFormColumn) => {
  if (typeof column.show === 'boolean') {
    return column.show
  }
  return column.show ? column.show(bindForm.value) : true
}
const coverEvent = (event?: Record<string, any>) => {
  if (!event) return event
  return Object.keys(event).reduce(
    (obj, key) => {
      obj[key] = (...args: any[]) => event[key](...args, bindForm.value)
      return obj
    },
    {} as Record<string, any>
  )
}
/* 表单分组 */
const updateNum = ref(0)
const columnGroup = computed<YFormColumn[][]>(() => {
  if (updateNum.value > -1) {
    // 只为重新更新表格
  }
  const propColumns = props.columns.map((column) => {
    const event = coverEvent(column.event)
    return {
      ...column,
      event
    } as YFormColumn
  })
  if (!props.foldGroup || !Array.isArray(props.foldGroup) || props.foldGroup.length === 0) return [propColumns]
  const columns = [...propColumns]
  const groups: YFormColumn[][] = []
  props.foldGroup.forEach((fields) => {
    const newlist: YFormColumn[] = []
    fields.forEach((field) => {
      const index = columns.findIndex((column) => column.field === field)
      if (index > -1) {
        newlist.push(...columns.splice(index, 1))
      }
    })
    groups.push(newlist)
  })
  columns.length > 0 && groups.push(columns)
  return groups
})

/* 获取列类型表单样式 */
const getColClass = (i: number, columns?: YFormColumn[]) => {
  if (isInline.value) return 'yform__container__field__inline'
  let num = 0
  if (columns) {
    for (let index = 0; index <= i; index++) {
      num = (columns[index].span || 1) + num
    }
  } else {
    num = i + 1
  }
  return num % yFormCol.value === 0 ? 'yform__container__field yform__container__field__nomr ' : 'yform__container__field'
}
/* 更新配置 */
const refresh = () => (updateNum.value = updateNum.value++)
/* 同步modelValue */
watch(effectiveForm, (val) => (modelValue.value = JSON.parse(JSON.stringify(val))), { immediate: true, deep: true })
watch(modelValue, (val) => {
  if (!val || JSON.stringify(val) === '{}') return
  if (JSON.stringify(val) === JSON.stringify(effectiveForm.value)) return
  updateFormByRelation(val)
})
/* 表单赋值 */
watch(
  () => props.form,
  (formObj: Record<string, any>) => {
    if (basicTools.isEmpty(formObj)) return
    updateFormByRelation(formObj)
  },
  {
    immediate: true
  }
)
/* 定义插槽类型 */
defineSlots<{
  formStart: () => any
  formEnd: () => any
  [key: `formGroup_${number}`]: () => any
  [key: `formSeparator_${number}`]: () => any
  [key: string]: (props: { data: { modelValue: any } }) => any
}>()

defineExpose({
  validateForm,
  updateForm,
  resetForm,
  refresh,
  getForm: () => JSON.parse(JSON.stringify(effectiveForm.value)) as Record<string, any>
})
</script>
<template>
  <el-form :rules="rules" :model="bindForm" ref="formRef" :inline="isInline" class="yform__container" v-bind="formProps">
    <slot name="formStart" :data="{ modelValue: undefined }"></slot>
    <template v-for="(columns, i) in columnGroup" :key="i">
      <div
        :class="[
          'yform__container__group',
          isInline ? '' : 'yform__container__grid',
          props.hideFoldGroup && i !== 0 ? 'yform__container__group__none' : ''
        ]">
        <div
          :class="getColClass(index, columns)"
          v-for="(column, index) in columns"
          :key="column.field"
          :style="{ '--grid-field-span': column.span || 1 }">
          <YFormField v-model="bindForm[column.field]" :item="column" v-show="isShow(column)">
            <template #[column.field]="{ data }" v-if="column.type === 'slot'">
              <slot :name="column.field" :data="data"></slot>
            </template>
          </YFormField>
        </div>
        <div :class="['el-form-item', getColClass(columns.length)]" v-if="$slots[`formGroup_${i}`]">
          <slot :name="`formGroup_${i}`" :data="{ modelValue: undefined }"></slot>
        </div>
      </div>
      <slot :name="`formSeparator_${i}`" :data="{ modelValue: undefined }"></slot>
    </template>
    <slot name="formEnd" :data="{ modelValue: undefined }"></slot>
  </el-form>
</template>
<style lang="scss" scoped>
.yform__container {
  --field-margin-bottom: var(--yform-field-margin-bottom, 18px);
  --yform-gap: v-bind(yFormGap);
  --yform-col: v-bind(yFormCol);
  &.el-form--inline {
    .el-form-item {
      margin-right: var(--yform-gap);
      color: var(--el-text-color-regular);
      font-size: 14px;
    }
  }
  :deep(.el-form-item) {
    margin-bottom: var(--field-margin-bottom);
  }
  &__field {
    width: calc(
      (100% - (var(--yform-col) - 1) * var(--yform-gap)) / var(--yform-col) * var(--grid-field-span) + (var(--grid-field-span) - 1) *
        var(--yform-gap)
    );
    margin-right: var(--yform-gap);
    color: var(--el-text-color-regular);
    font-size: 14px;
    &__nomr {
      margin-right: 0;
    }
    &__inline {
      display: inline-block;
    }
  }
  &__grid {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
  }
  &__group {
    transition: all 0.3s;
    overflow: hidden;

    &__none {
      height: 0;
    }
  }
}
</style>
