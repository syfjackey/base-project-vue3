/* -------------------------- 默认基础类型文件 -------------------------- */
/**
 * 如无必要,请不要修改此内容
 * 可控修改位于base-types.d.ts中
 */

/* -------------------------- 全局通用类型 -------------------------- */

/* 默认树形结构  * 建议所有树形结构都继承此类型 */
interface TreeItem {
  children?: TreeItem[]
}

/* 基础响应类型 */
interface BasicResponse<T> {
  /* 响应状态 */
  code: number
  /* 响应信息 */
  message: string
  /* 响应数据 */
  data: T
}

/* 字典值类型 */
type DictValue = string | number

/* 默认字典类型 */
interface DictItem {
  /* 字典名 */
  label: string
  /* 字典值 */
  value: DictValue
  /* 远端原始数据 仅限远端接口 */
  _rawData?: RemoteDictItem
  children?: DictItem[]
  /* 图标 */
  icon?: string
}
/* 菜单 */
interface MenuItem {
  /* 菜单ID */
  id: string
  /* 图标 */
  icon?: string
  /* 类型:  菜单  */
  type: 'menu'
  /* 菜单名称 */
  name: string
  /* 菜单路径 */
  path: string
  /* 传参 能转换为对象的字符串 */
  query: string
  /* 打开方式:自身 新窗口 */
  open: 'self' | 'new'
  /* 是否是外部链接 */
  isLink: boolean
  /* 是否使用框架打开 */
  iframe: boolean
  /* 父ID */
  parentId?: string
  /* 状态:启用 停用 */
  enable: boolean
  /* 显隐 */
  show: boolean
  /* 排序 */
  order: number
  /* 描述 */
  desc?: string
  children?: (MenuItem | AuthItem)[]
}
/* 权限 */

interface AuthItem {
  /* 菜单ID */
  id: string
  /* 父ID */
  parentId: string
  /* 类型 */
  type: 'auth'
  /* 名称 */
  name: string
  /* 描述 */
  desc?: string
  /* 权限 */
  auth: string
  /* 状态:启用 停用 */
  enable: boolean
}

type MixMenuItem = MenuItem | AuthItem
