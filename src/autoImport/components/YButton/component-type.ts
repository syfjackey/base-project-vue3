import { type ButtonProps } from 'element-plus'
export interface YButtonProps extends Partial<ButtonProps> {
  /* 图标 */
  icon?: string
  /* 确认框内容 */
  confirm?: string
  /* 滑过提示 */
  tip?: string
  /* 触发方式 仅非确认框时有效 */
  trigger?: 'click' | 'hover' | 'focus' | 'contextmenu'
  /* 权限标识 */
  auth?: string
}
