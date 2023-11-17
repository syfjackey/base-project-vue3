/* YTableTools 基础组件类型 */
import type { YButtonGroupItem } from '../YButtonGroup/component-type'
import type { TableProps } from 'element-plus'
/* 表格工具条 */
export type YTableToolBasicType = 'search' | 'refresh' | 'export' | 'column'
export type YTableToolType = YTableToolBasicType | YButtonGroupItem
/* 分页布局类型 */
export type YTablePageLayout = 'prev' | 'pager' | 'next' | 'jumper' | 'total' | 'sizes'

/* 表格字段类型 */
export interface YTableFieldProps {
  field: string
  label: string
  formatter?: (row: any, column: any) => string
  type?: 'slot' | ''
  props?: {
    align?: 'left' | 'right' | 'center'
    width?: string | number
    minWidth?: string | number
    fixed?: 'left' | 'right'
    columnKey?: string //默认是当前字段
    sortable?: boolean | 'custom'
    sortBy?: any
    resizable?: boolean
    showOverlowTooltip?: boolean
    headerAlign?: 'left' | 'right' | 'center'
  }
  /* 字典 */
  dict?: string | DictItem[]
  /* 显隐列 */
  show?: boolean
  /* 多级表头 */
  children?: YTableFieldProps[]
}
// 请求时附加的传参
export interface YTableParams {
  [key: string]: any
}

/* 分页响应 */
export interface YTablePageResponse<T> {
  total: number // 总条数
  pageNum?: number // 当前页码
  pageSize?: number // 每页条数
  pages?: number // 总页数
  list: T[]
}
// 表格数据基础结构
export interface YTableItem {
  [key: string]: any
}

export type YTableColumn = YTableFieldProps
/* 数据响应 */
export type YTableResDataType = YTableItem[] | YTablePageResponse<YTableItem>
export type YTableDataType = (params: any) => Promise<YTableResDataType> | YTableResDataType

export interface YTableIndexProps {
  label: string
  width: number | string
  align?: 'left' | 'right' | 'center'
  /* 序号按分页生成 还是 当前排 */
  indexType?: 'page' | 'current'
}
/* YTable组件传参 */
export interface YTableProps extends Partial<Omit<TableProps<YTableItem>, 'data'>> {
  /* 是否初始化字典 */
  isInitDict?: boolean
  /* 分页设置 */
  pageSizes?: number[]
  pageLayout?: YTablePageLayout[]
  /* 工具条 */
  tools?: YButtonGroupItem[]
  /* 样式 */
  gap?: string
  /* 表格配置 */
  columns: YTableColumn[]
  /* 附加传参 */
  params?: YTableParams
  /* 数据 */
  data: YTableItem[] | YTableDataType
  /* 是否分页 比如调分页接口 但仅需显示某几条时使用 */
  isPage?: boolean
  /* 是否显示复选框 */
  selection?: boolean
  /* 主键 */
  rowKey?: string
  /* 是否立即执行 */
  immediate?: boolean
  /* 显示序号 */
  indexConfig?: YTableIndexProps
}
