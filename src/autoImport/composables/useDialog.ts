/**
 * useDialog
 * @description 弹窗传值组合函数
 *
 * @param { T } defaultData 数据初始值
 * @param { boolean } defaultVisible 显隐初始值
 *
 * @returns visible 显隐开关
 * @returns openDialog 开启弹窗
 * @returns dialogData 数据
 */
export function useDialog<T>(defaultData?: T, defaultVisible: boolean = false) {
  const visible = ref<boolean>(defaultVisible)
  const dialogData = defaultData ? ref<T>(defaultData) : ref<T>()
  function openDialog(data: any, formatter: (data: any) => T | undefined): void
  function openDialog(row?: T): void
  function openDialog(data?: any, formatter?: (data: any) => T | undefined) {
    dialogData.value = formatter ? formatter(data) : data
    visible.value = true
  }
  return { visible, openDialog, dialogData }
}
