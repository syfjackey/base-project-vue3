<script setup lang="ts">
import type { ElTree } from 'element-plus'
import { basicTableTools, filterTableColumns, getShowTableColumns } from '../YTable/tools'
import YTable from '../YTable/index.vue'
import type { YPageTableProps } from './component-type'

defineOptions({ name: 'YTable' })

const props = withDefaults(defineProps<YPageTableProps>(), { gap: '12px', formColumns: () => [], pageSize: 20 })
const emit = defineEmits<{ toolClick: [type: string] }>()
const pageSize = ref(props.pageSize)
const tools = computed(() => {
  const rTools = props.tableConfig?.tools || []
  return props.tableConfig?.toolMergeMode !== 'cover' ? [...basicTableTools, ...rTools] : rTools
})
/* 工具条 */
const toolEmit = (type: string) => {
  switch (type) {
    case 'search-tool':
      showForm.value = !showForm.value
      break
    case 'refresh-tool':
      tableRef.value?.getList()
      break
    case 'filterColumn-tool':
      openDialog()
      break
    default:
      emit('toolClick', type)
      break
  }
}

/* 定义插槽 */
const slots = defineSlots<{
  tool: () => any
  toolBefore: () => any
  toolEnd: () => any
  // @ts-ignore
  btns: (props: { search: () => Promise<any>; reset: () => void | undefined; expand: () => void }) => any
  btnEnd: () => any
  [key: `${string}Header`]: (props: { list: any[]; column: any; index: number }) => any
  [key: string]: (props: { list: any[]; row: any; column: any; index: number }) => any
}>()
const { visible } = useDialog()
const treeRef = ref<InstanceType<typeof ElTree>>()
/* 展示列 */
const checkedTableColumns = ref<string[]>(getShowTableColumns(props.tableColumns))
/* 展示列 */
const tableColumns = computed(() => {
  const columns = basicTools.cloneDeep(props.tableColumns)
  return filterTableColumns(columns, checkedTableColumns.value)
})
const openDialog = () => {
  visible.value = true
  nextTick(() => {
    treeRef.value!.setCheckedKeys(checkedTableColumns.value)
  })
}
const changeTableColumns = () => {
  checkedTableColumns.value = treeRef.value!.getCheckedKeys() as string[]
  visible.value = false
}
/* 变更查询传参 */
const params = ref({})
const changeParams = (form: Record<string, any>) => (params.value = form)

/* 表单显隐控制 */
const showForm = ref(true)
const showSearch = computed(() => {
  const hasForm = props.formColumns.length > 0
  return hasForm && showForm.value
})
/*  */
const tableRef = ref<InstanceType<typeof YTable>>()
</script>
<template>
  <div class="ypagetable__container">
    <div class="ypagetable__container__search" v-show="showSearch">
      <YSearch :columns="formColumns" :isInitDict="false" v-bind="formConfig" @search="changeParams">
        <template #btns="events">
          <slot name="btns" v-bind="events"></slot>
        </template>
        <template #btnEnd>
          <slot name="btnEnd"></slot>
        </template>
      </YSearch>
    </div>
    <div class="ypagetable__container__main">
      <YTable
        ref="tableRef"
        v-model:pageSize="pageSize"
        :data="props.dataApi"
        :tools="tools"
        @toolClick="toolEmit"
        :selection="props.tableConfig?.selection"
        :columns="tableColumns"
        :index-config="props.tableConfig?.indexConfig"
        :isInitDict="false"
        :params="params"
        :gap="props.gap">
        <template #[slotName]="{ row, column, index, list }" v-for="slotName in Object.keys(slots)">
          <slot :name="slotName" :list="list" :row="row" :column="column" :index="index"></slot>
        </template>
      </YTable>
    </div>
    <el-dialog v-model="visible" title="变更展示字段" width="30%">
      <div class="ypagetable__container__dialog">
        <el-tree ref="treeRef" show-checkbox :data="props.tableColumns" node-key="field" :check-on-click-node="true"> </el-tree>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="changeTableColumns"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.ypagetable__container {
  @apply w-100% h-100% overflow-hidden flex-h  box-border;
  --ypagetable-gap: v-bind(gap);
  gap: var(--ypagetable-gap);
  &__search {
    @apply flex-none;
    border-radius: 4px;
    padding: 0 calc(var(--ypagetable-gap) * 2);
  }
  &__main {
    @apply flex-fit-h;
    border-radius: 4px;
  }
  &__dialog {
    max-height: 600px;
  }
  :deep(.el-table--border) {
    &::before {
      width: 0;
    }
    .el-table__border-left-patch {
      width: 0;
    }
    .el-table__inner-wrapper::after {
      height: 0;
    }
  }
}
</style>
