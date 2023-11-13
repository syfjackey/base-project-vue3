// @unocss-include

import type { YButtonGroupItem } from '../YButtonGroup/component-type'
import type { YTableColumn, YTablePageLayout, YTablePageResponse } from './component-type'
/* 基础按钮组 */
export const basicTableTools: YButtonGroupItem[] = [
  {
    type: 'search-tool',
    icon: 'i-custom:togger-search',
    tip: '显示/隐藏搜索栏'
  },
  {
    type: 'refresh-tool',
    icon: 'i-custom:refresh',
    tip: '刷新'
  },
  {
    type: 'filterColumn-tool',
    icon: 'i-custom:filter',
    tip: '变更展示字段'
  }
]
/* 基础分页组 */
const defaultPageSizes = [10, 20, 30, 50, 100]
const defaultPageLayout: YTablePageLayout[] = ['total', 'prev', 'pager', 'next']
/* 默认传参值 */
export const defaultProps = {
  isInitDict: true,
  pageSizes: () => defaultPageSizes,
  pageLayout: () => defaultPageLayout,
  tools: () => [],
  gap: '8px',
  params: () => ({}),
  isPage: true,
  fit: true,
  showHeader: true,
  selectOnIndeterminate: true,
  immediate: true
}

/* 分页函数 */
export function getPageItems<T>(data: T[] | YTablePageResponse<T>, pageNum: number, pageSize: number, isPage: boolean) {
  const res: T[] | YTablePageResponse<T> = JSON.parse(JSON.stringify(data))
  if (Array.isArray(res)) {
    const total = res.length
    const list = isPage ? res.slice((pageNum - 1) * pageSize, pageNum * pageSize) : res
    return { total, list }
  }
  return { total: res.total, list: res.list }
}
/* 过滤传参仅保留elementTable传参 */
export function filterProps(props: Record<string, any>) {
  const filterKeys = [
    'pageSize',
    'pageNum',
    'tools',
    'pageSizes',
    'pageLayout',
    'gap',
    'params',
    'data',
    'isPage',
    'columns',
    'immediate',
    'isInitDict',
    'indexConfig'
  ]
  return Object.keys(props).reduce(
    (propObj, key) => {
      if (!filterKeys.includes(key)) {
        propObj[key] = props[key]
      }
      return propObj
    },
    {} as Record<string, any>
  )
}

/* 监听变化 */
export function useWatchChange(immediate: boolean, exeFn: (page?: number) => void) {
  let timer: number
  return (key: any, page?: number) =>
    watch(
      key,
      () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          exeFn(page)
        }, 20)
      },
      { immediate, deep: true }
    )
}

/* 获取需要初始化的字典类型 */
export function getDicts(columns: any[] = [], dicts: string[] = []): string[] {
  columns.forEach((column) => {
    if (typeof column.dict === 'string') {
      dicts.push(column.dict)
    }
    dicts.push(...getDicts(column.children))
  })
  return dicts
}

/* 获取显示的列表 */
export function getShowTableColumns(columns: YTableColumn[] = []): string[] {
  const keys: string[] = []
  columns.forEach((column) => {
    if (column.show !== false) {
      keys.push(column.field)
    }
    if (column.children && column.children.length > 0) {
      const subKeys = getShowTableColumns(column.children)
      keys.push(...subKeys)
    }
  })
  return keys
}
/* 根据field 过滤 表格数组 */
export function filterTableColumns(columns: YTableColumn[] = [], keys: string[] = []): YTableColumn[] {
  const filterColumns: YTableColumn[] = columns.reduce((newColumns: YTableColumn[], column) => {
    let children: YTableColumn[] = []
    if (column.show !== false) {
      if (column.children) {
        children = filterTableColumns(column.children, keys)
        if (children.length > 0) {
          newColumns.push({ ...column, children })
        }
      } else if (keys.includes(column.field)) {
        newColumns.push(column)
      }
    }
    return newColumns
  }, [])
  return filterColumns
}
