import type { Point } from './component-type'
/**
 * useContextMenu 与右键菜单组件 配合使用
 * @returns visible 显隐
 * @returns position 弹出位置
 * @returns clickItem 当前点击赋值
 * @returns openContextMenu 弹出函数
 */
export function useContextMenu<T>() {
  const visible = ref(false)
  const position = ref<Point>({ x: 0, y: 0 })
  const clickItem = ref<T>()
  const openContextMenu = (event: MouseEvent, data?: T) => {
    event.preventDefault()

    visible.value = true
    clickItem.value = data
    position.value = {
      x: event.x,
      y: event.y
    }
  }
  return {
    visible,
    position,
    clickItem,
    openContextMenu
  }
}
