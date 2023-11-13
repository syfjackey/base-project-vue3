import type { YButtonGroupItem } from '../YButtonGroup/component-type'
import type { FormLayout, YFormColumn } from '../YForm/componet-type'
import type { YTableColumn, YTableDataType } from '../YTable/component-type'
export interface YPageTableProps {
  /* 样式 */
  gap?: string
  /* 表格配置 */
  tableColumns: YTableColumn[]
  tableConfig?: {
    /* 是否显示复选框 */
    selection?: boolean
    tools?: YButtonGroupItem[]
    toolMergeMode?: 'cover' | 'append'
  }
  /* 表单配置 */
  formColumns?: YFormColumn[]
  formConfig?: {
    layout?: FormLayout
    foldGroup?: string[][]
    labelWidth?: string | number
  }
  /* 分页 */
  pageSize?: number
  /* 数据 */
  dataApi: YTableDataType
}
