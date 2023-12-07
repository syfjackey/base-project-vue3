<script setup lang="ts">
import type { YTableColumn } from '../component-type'
defineOptions({ name: 'YTableColumnItem' })
interface ComponentProps {
  column: YTableColumn
  pageSize: number
  pageNum: number
}

const props = withDefaults(defineProps<ComponentProps>(), {})

const isShow = () => {
  if (typeof props.column.show === 'boolean') return props.column.show
  if (typeof props.column.show === 'function') return props.column.show()
  return true
}
const hasChildren = computed(() => props.column.children && props.column.children.length > 0)

const { getDictLabel } = useDict()
const formatText = (row: any, column: any, _: any, index: number) => {
  const field = props.column.field
  const keys = field.split('.')
  let keyValue: any = basicTools.checkPath(row, keys).value

  const dictType = props.column.dict
  let returnVal = keyValue
  if (dictType) {
    if (typeof dictType === 'string') {
      returnVal = getDictLabel(dictType, keyValue).value!
    }
    if (Array.isArray(dictType)) {
      returnVal = dictType.find((dict) => dict.value === keyValue)?.label
    }
  }
  if (props.column.formatter) return props.column.formatter(row, column, index, keyValue, props.pageSize, props.pageNum)
  return returnVal ?? props.column.defaultValue
}

const slots = defineSlots<{
  [key: `${string}Header`]: (props: { column: any; index: number }) => any
  [key: string]: (props: { row: any; column: any; index: number }) => any
}>()
const slotNames = Object.keys(slots).filter((key) => ![`${props.column.field}`, `${props.column.field}Header`].includes(key))
const hasDefaultSlot = computed(() => {
  if (props.column.type === 'slot') {
    return !!slots[props.column.field]
  }
  return hasChildren.value
})
</script>
<template>
  <el-table-column
    :column-key="props.column.field"
    :prop="props.column.field"
    :label="props.column.label"
    v-if="isShow()"
    :formatter="formatText"
    v-bind="props.column.props">
    <template #header="{ column, $index }" v-if="props.column.type === 'slot'">
      <slot :name="`${props.column.field}Header`" :column="column" :index="$index">{{ props.column.label }} </slot>
    </template>
    <template #default="{ row, column, $index }" v-if="hasDefaultSlot">
      <template v-if="hasChildren">
        <YTableColumnItem
          v-for="(fieldColumn, i) in props.column.children"
          :key="i"
          :column="fieldColumn"
          :page-size="pageSize"
          :page-num="pageNum">
          <template #[slotName]="{ row, column, index }" v-for="slotName in slotNames">
            <slot :name="slotName" :row="row" :column="column" :index="index"></slot>
          </template>
        </YTableColumnItem>
      </template>
      <slot :name="props.column.field" :row="row" :column="column" :index="$index" v-else> 自定义插槽:{{ props.column.field }} </slot>
    </template>
  </el-table-column>
</template>
