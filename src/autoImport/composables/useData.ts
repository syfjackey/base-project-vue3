import type { WatchOptions, WatchSource, Ref } from 'vue'

interface WatchKeyOptions<T> extends WatchOptions {
  /* 只有当监听的值为真时 才执行 */
  exist?: boolean
  /* 回调函数 */
  callback?: (data: T) => void
}
/**
 * useData
 * @description
 * @param value 默认值
 * @param watchOptions watch配置
 * @returns data  数据
 * @returns watchKey 监听方法
 * @returns reset 重置数据
 */
export function useData<T>(defaultData: T, watchOptions?: WatchKeyOptions<T>) {
  const data = ref<T>(defaultData) as Ref<T>
  function watchKey(key: WatchSource<T>, dataFormat?: (val: T) => T | undefined, options?: WatchKeyOptions<T>): void
  function watchKey<W>(key: WatchSource<W>, dataFormat: (val: W) => T | undefined, options?: WatchKeyOptions<T>): void
  function watchKey(key: WatchSource<any>, dataFormat?: (val?: any) => any, options?: WatchKeyOptions<T>) {
    const { exist = true, callback } = { ...watchOptions, ...options }
    watch(
      key,
      async (val) => {
        const noDo = val === null || val === undefined || val === false
        if (exist && noDo) return
        const p = dataFormat ? await dataFormat(val) : val
        if (p === undefined) return
        data.value = p
        callback?.(data.value)
      },
      { ...watchOptions, ...options }
    )
  }
  function reset(value: T) {
    data.value = value === undefined ? defaultData : value
  }
  return { data, watchKey, reset }
}
