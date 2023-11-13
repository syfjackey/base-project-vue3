import type { FormLayout, YFormColumn } from '../YForm/componet-type'
export interface YSearchProps {
  columns: YFormColumn[]
  isInitDict?: boolean
  foldGroup?: string[][]
  layout?: FormLayout
  labelWidth?: string | number
  /* 是否立即执行 */
  immediate?: boolean
}
