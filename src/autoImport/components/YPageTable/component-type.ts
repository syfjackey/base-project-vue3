import type { YButtonGroupItem } from '../YButtonGroup/component-type'
import type { FormLayout, YFormColumn } from '../YForm/componet-type'
import type { YTableColumn, YTableDataType, YTableIndexProps } from '../YTable/component-type'
export interface YPageTableProps {
  /* 样式 */
  gap?: string
  /* 表格配置 */
  tableColumns: YTableColumn[]
  tableConfig?: {
    /* 是否显示复选框 */
    selection?: boolean
    /* 附加工具条 */
    tools?: YButtonGroupItem[]
    /* 工具条追加方式 */
    toolMergeMode?: 'cover' | 'append'
    /* 序号配置 */
    indexConfig?: YTableIndexProps
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
