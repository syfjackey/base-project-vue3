export interface YButtonGroupItem {
  /* 事件类型 */
  type: string
  /* 图标 */
  icon?: string
  /* 文本 */
  label?: string
  /* tooltip */
  tip?: string
  /* 帮助信息 */
  help?: string | string[]
  /* 权限 */
  auth?: string
  /* 自定义事件 */
  onClick?: () => void
  /* 切换图标组 */
  icons?: string[]
}
export interface YButtonGroupProps {
  items: YButtonGroupItem[]
}
