/* Item类型 */
export interface YContextmenuItem {
  type?: 'item'
  name: string
  eventKey: string
  icon?: string // unocss css icon图标 例如 i-
  shortcut?: string
  disabled?: boolean
  onClick?: () => void
  children?: YContextmenuNode[]
}
/* 分隔符 */
interface YContextmenuSperator {
  type: 'sperator'
  icon?: string
}
/* 节点类型 */
export type YContextmenuNode = YContextmenuItem | YContextmenuSperator
export interface YContextmenuProps {
  items: YContextmenuNode[]
}
export interface Point {
  x: number
  y: number
}
