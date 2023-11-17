<script setup lang="ts">
import type { ElTable } from 'element-plus'
import { defaultProps, filterProps, getDicts, getPageItems, useWatchChange } from './tools'
import type { YTableItem, YTableProps } from './component-type'
defineOptions({ name: 'YTable' })
/* 接收分页位置Dom */
const pageTeleport = inject<Ref<HTMLDivElement>>('pageTeleport')
const props = withDefaults(defineProps<YTableProps>(), defaultProps)
const emit = defineEmits<{ toolClick: [type: string] }>()
const indexMethod = (index: number) => {
  return props.indexConfig?.indexType === 'page' ? (pNum.value - 1) * pSize.value + index + 1 : index + 1
}
/* 同步分页 */
const pageSize = defineModel<number>('pageSize', { default: 10 })
const pageNum = defineModel<number>('pageNum', { default: 1 })
const pSize = ref(10)
const pNum = ref(1)
watch(pageSize, (num) => (pSize.value = num), { immediate: true })
watch(pageNum, (num) => (pNum.value = num), { immediate: true })
/* ElementTable 传参 */
const tableProps = computed(() => filterProps(props))
// #region  获取表格数据
const total = ref(0)
const tableItems = ref<YTableItem[]>([])
const tableParams = computed(() => ({ pageNum: pNum.value, pageSize: pSize.value, ...props.params }))
const loading = ref(false)
const getList = async (page?: number) => {
  page && (pNum.value = page)
  pageSize.value = pSize.value
  pageNum.value = pNum.value
  if (!props.data) {
    throw new Error('YTable组件缺少数据源')
  }
  loading.value = true
  const res = typeof props.data !== 'function' ? props.data : await props.data({ ...tableParams.value })
  loading.value = false
  const pageObj = getPageItems(res, pNum.value, pSize.value, props.isPage)
  total.value = pageObj.total
  tableItems.value = pageObj.list
  return
}
// #endregion

/* 监听变化 重新加载列表 */
const watchAndReloadList = useWatchChange(props.immediate, getList)
watchAndReloadList(pNum)
watchAndReloadList(pSize, 1)
watchAndReloadList(() => props.params, 1)
/* 初始化字典值 */
const { initDict } = useDict()
onBeforeMount(async () => {
  if (props.isInitDict) {
    const dicts = getDicts(props.columns)
    await initDict(dicts)
  }
})
/* 分页相关 */
const layout = computed(() => props.pageLayout.join(','))
/* 是否显示分页 */
const showPagination = computed(() => {
  if (!props.isPage) return false
  return total.value > pSize.value && tableItems.value.length <= pSize.value
})
/* 工具条 */
const toolEmit = (type: string) => emit('toolClick', type)
/* 定义插槽 */
const slots = defineSlots<{
  tool: () => any
  toolBefore: () => any
  toolEnd: () => any
  [key: `${string}Header`]: (props: { list: any[]; column: any; index: number }) => any
  [key: string]: (props: { list: any[]; getList: (page?: number) => Promise<void>; row: any; column: any; index: number }) => any
}>()
const slotNames = Object.keys(slots).filter((key) => !['tool', 'toolBefore', 'toolEnd'].includes(key))

const filterColumns = computed(() => {
  return props.columns.filter((column) => !!column)
})
const tableRef = ref<InstanceType<typeof ElTable>>()

defineExpose({
  getList,
  getTableInstance: () => tableRef.value
})
</script>
<template>
  <div class="ytable__container">
    <YTableToolBar :tools="props.tools" @click="toolEmit">
      <slot name="tool"></slot>
      <template #toolBefore>
        <slot name="toolBefore"></slot>
      </template>
      <template #toolEnd>
        <slot name="toolEnd"></slot>
      </template>
    </YTableToolBar>
    <div class="ytable__container__main">
      <el-table
        :data="tableItems"
        class="box-fit"
        ref="tableRef"
        v-loading="loading"
        height="100%"
        v-bind="tableProps"
        :row-key="props.rowKey">
        <el-table-column type="selection" width="55" v-if="props.selection" :reserve-selection="!!props.rowKey" />
        <el-table-column type="index" :index="indexMethod" v-if="props.indexConfig" v-bind="props.indexConfig" />
        <YTableColumnItem v-for="(fieldColumn, i) in filterColumns" :key="i" :column="fieldColumn">
          <template #[slotName]="{ row, column, index }" v-for="slotName in slotNames">
            <slot :name="slotName" :list="tableItems" :getList="getList" :row="row" :column="column" :index="index"></slot>
          </template>
        </YTableColumnItem>
      </el-table>
    </div>
    <Teleport :to="pageTeleport" :disabled="!pageTeleport">
      <div class="ytable__container__pagination" v-if="showPagination">
        <el-pagination v-model:page-size="pSize" :page-sizes="pageSizes" v-model:current-page="pNum" :total="total" :layout="layout" />
      </div>
    </Teleport>
  </div>
</template>
<style lang="scss" scoped>
.ytable__container {
  @apply w-100% h-100% overflow-hidden flex-h bg-white  box-border;
  gap: v-bind(gap);
  padding: v-bind(gap);
  &__search {
    @apply flex-none;
  }
  &__main {
    @apply flex-fit-h;
    color: #fff;
    border: solid 1px var(--el-border-color-lighter);
    border-bottom: none;
  }
  &__pagination {
    @apply flex-w flex-center;
  }
}
</style>
