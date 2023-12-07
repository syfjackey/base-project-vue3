import type { FormProps } from 'element-plus'
import { type Ref } from 'vue'
/* 公共方法 */
type CheckRefType<T> = T extends Ref<infer U> ? U : T
export type ConvertProps<T> = {
  [P in keyof T]: CheckRefType<T[P]>
}
/* -------------------------- YForm 基础表单组件 -------------------------- */
export interface FormLayout {
  /* 行内 或 grid 布局 */
  type?: 'inline' | 'grid'
  /* 间隔 */
  gap?: number | string
  /* 几列 仅grid生效 */
  cols?: number
}
/* 支持的表单项类型 */
export type YFormItemType =
  /* 输入框 */
  | 'input'
  /* 文本框 */
  | 'textarea'
  /* 密码框 */
  | 'password'
  /* 下拉框 */
  | 'select'
  /* 级联选择器 */
  | 'cascader'
  /* 单选 */
  | 'radio'
  /* 日期 */
  | 'date'
  | 'datetime'
  | 'month'
  | 'year'
  | 'week'
  | 'dates'
  /* 日期范围 */
  | 'datetimeRange'
  | 'dateRange'
  | 'monthRange'
  /* 时分秒 */
  | 'time'
  /* 时分秒范围 */
  | 'timeRange'
  /* 树形下拉框 */
  | 'treeSelect'
  /* 复选框 */
  | 'checkbox'
  /* 开关 */
  | 'switch'
  /* 数字 */
  | 'number'
  /* 数字范围 */
  | 'numberRange'
  /* 滑块 */
  | 'slider'
  /* 插槽 */
  | 'slot'
  /* 普通文本 */
  | 'text'
  /* 上传 */
  | 'upload'
export type YFormItemRuleTrigger = 'blur' | 'change'

export interface YFormBasicItemProps {
  /* 监听事件 */
  event?: {
    [key: string]: (...any: any[]) => void
  }
  /* 宽度 */
  width?: string | number
}
export interface YFormBasicRule {
  type?: 'date' | 'array' | 'number' | 'string' | 'object' | 'url'
  validator?: (
    rule: YFormBasicRule,
    value: any,
    callback: (error?: any) => void,
    source: any,
    options: any,
    form: Record<string, any>
  ) => void
  message: string
  trigger?: YFormItemRuleTrigger | YFormItemRuleTrigger[]
  required?: boolean
}
export interface YFormBasicFieldProps {
  /* 绑定字段 */
  field: string
  /* 显示名称 */
  label: string
  /* 帮助提示 */
  help?: string | string[]
  /* 显示隐藏 */
  show?: boolean | ((form?: any) => boolean)
  /* elForm 规则 */
  rules?: YFormBasicRule | YFormBasicRule[]
  /* 当为grid布局时,占据几列 */
  span?: number
}

export interface YFormDictType {
  /* 字典类型 */
  dict: string | DictItem[] | (() => Promise<DictItem[]>) | Ref<string>
  /* 绑定类型 */
  bindDictValue?: 'item' | 'label' | 'value'
}
export interface YFormValueType {
  /* 对返回值是否进行转换处理  默认逗号分割  */
  convertValue?: boolean | string
}

/* 文本框类型 */
export interface YFormInputItemProps extends YFormBasicItemProps {
  type: 'input'
  /* 默认值 */
  defaultValue?: string
  /* 支持传参 */
  props?: {
    /* 参考 el-input */
    maxlength?: string | number
    showWordLimit?: boolean
    placeholder?: string
    clearable?: boolean
    disabled?: boolean | Ref<boolean>
    size?: 'large' | 'default' | 'small'
    /* 前缀图标 */
    prefixIcon?: string
    /* 后缀图标 */
    suffixIcon?: string
    readonly?: boolean
  }
}
/* 文本域类型 */
export interface YFormTextareaItemProps extends YFormBasicItemProps {
  type: 'textarea'
  /* 默认值 */
  defaultValue?: string
  /* 支持传参 */
  props?: {
    /* 参考 el-input */
    maxlength?: string | number
    showWordLimit?: boolean
    placeholder?: string
    disabled?: boolean | Ref<boolean>
    size?: 'large' | 'default' | 'small'
    readonly?: boolean
    rows?: number
    autosize?: boolean
    resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  }
}
/* 密码框类型 */
export interface YFormPasswordItemProps extends YFormBasicItemProps {
  type: 'password'
  /* 默认值 */
  defaultValue?: string
  /* 支持传参 */
  props?: {
    /* 参考 el-input */
    maxlength?: string | number
    placeholder?: string
    clearable?: boolean
    disabled?: boolean | Ref<boolean>
    size?: 'large' | 'default' | 'small'
    /* 前缀图标 */
    prefixIcon?: string
    /* 后缀图标 */
    suffixIcon?: string
    readonly?: boolean
    showPassword?: boolean
  }
}
/* 下拉框类型 */
export interface YFormSelectItemProps extends YFormBasicItemProps, YFormDictType, YFormValueType {
  type: 'select'
  defaultValue?: any
  /* 支持传参 */
  props?: {
    multiple?: boolean
    disabled?: boolean | Ref<boolean>
    size?: 'large' | 'default' | 'small'
    clearable?: boolean
    collapseTags?: boolean
    collapseTagsTooltip?: boolean
    multipleLimit?: number
    placeholder?: string
    filterable?: boolean
    allowCreate?: boolean
    tagType?: '' | 'success' | 'info' | 'warning' | 'danger'
    placement?:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end'
  }
}
/* 级联选择器类型 */
export interface YFormCascaderItemProps extends YFormBasicItemProps, YFormDictType, YFormValueType {
  type: 'cascader'
  defaultValue?: any
  /* 支持传参 */
  props?: {
    size?: 'large' | 'default' | 'small'
    placeholder?: string
    disabled?: boolean | Ref<boolean>
    clearable?: boolean
    showAllLevels?: boolean
    filterable?: boolean
    tagType?: '' | 'success' | 'info' | 'warning' | 'danger'
    collapseTags?: boolean
    collapseTagsTooltip?: boolean
    separator?: string
    props?: {
      multiple?: boolean
      checkStrictly?: boolean
      emitPath?: boolean
    }
  }
}
/* 单选类型 */
export interface YFormRadioItemProps extends YFormBasicItemProps, YFormDictType {
  type: 'radio'
  defaultValue?: string | number | boolean
  props?: {
    size?: 'large' | 'default' | 'small'
    disabled?: boolean | Ref<boolean>
  }
}
/* 开关类型 */
export interface YFormSwitchItemProps extends YFormBasicItemProps {
  type: 'switch'
  defaultValue?: string | number | boolean
  props?: {
    size?: 'large' | 'default' | 'small'
    disabled?: boolean | Ref<boolean>
    inlinePrompt?: boolean
    activeText?: string
    inactiveText?: string
    activeValue?: string | number | boolean
    inactiveValue?: string | number | boolean
  }
}
/* 数字类型 */
export interface YFormNumberItemProps extends YFormBasicItemProps {
  type: 'number'
  defaultValue?: number
  props?: {
    align?: 'center' | 'left' | 'right'
    min?: number
    max?: number
    step?: number
    stepStrictly?: boolean
    precision?: number
    size?: 'large' | 'default' | 'small'
    disabled?: boolean | Ref<boolean>
    controls?: boolean
    controlsPosition?: '' | 'right'
    placeholder?: string
    valueOnClear?: number | null | 'min' | 'max'
  }
}
/* 数字范围 */
export interface YFormNumberRangeItemProps extends YFormBasicItemProps, YFormValueType {
  type: 'numberRange'
  defaultValue?: [number, number] | string
  fieldMap?: [string, string]
  props?: {
    min?: number
    max?: number
    step?: number
    stepStrictly?: boolean
    precision?: number
    size?: 'large' | 'default' | 'small'
    disabled?: boolean | Ref<boolean>
    controls?: boolean
    controlsPosition?: '' | 'right'
    placeholder?: string
    valueOnClear?: number | null | 'min' | 'max'
    separator?: string
  }
  event?: {
    change?: (startNum?: number, endNum?: number) => void
  }
}
/* 滑块类型 */
export interface YFormSliderItemProps extends YFormBasicItemProps {
  type: 'slider'
  defaultValue?: number | [number, number]
  props?: {
    min?: number
    max?: number
    disabled?: boolean | Ref<boolean>
    step?: number
    showInput?: boolean
    showInputControls?: boolean
    size?: 'large' | 'default' | 'small'
    showStop?: boolean
    showTooltip?: boolean
    formatTooltip?: (val: number) => string
    range?: boolean
    marks?: any
  }
}
/* 插槽类型 */
export interface YFormSlotItemProps extends YFormBasicItemProps {
  field: string
  type: 'slot'
  event?: never
  defaultValue?: any
  props?: Record<string, any>
}
/* 复选框类型 */
export interface YFormCheckboxItemProps extends YFormBasicItemProps, YFormDictType, YFormValueType {
  type: 'checkbox'
  defaultValue?: string[] | number[]
  /* 支持传参 */
  props?: {
    disabled?: boolean | Ref<boolean>
    min?: number
    max?: number
    textColor?: string
    size?: 'large' | 'default' | 'small'
    fill?: string
    tag?: string
  }
}
/* 日期类型 */
export interface YFormDateItemProps extends YFormBasicItemProps, YFormValueType {
  type: 'date' | 'year' | 'month' | 'dates' | 'week' | 'datetime'
  defaultValue?: number | string | string[]

  props?: {
    size?: 'large' | 'default' | 'small'
    disabled?: boolean | Ref<boolean>
    readonly?: boolean
    editable?: boolean
    clearable?: boolean
    placeholder?: string
    format?: string
    defaultValue?: Date
    defaultTime?: Date
    valueFormat?: string
  }
}

/* 时间类型 */
export interface YFormTimeItemProps extends YFormBasicItemProps {
  type: 'time'
  defaultValue?: number | string
  props?: {
    disabled?: boolean | Ref<boolean>
    readonly?: boolean
    editable?: boolean
    clearable?: boolean
    placeholder?: string
    size?: 'large' | 'default' | 'small'
    arrowControl?: boolean
    format?: string
    valueFormat?: string
    disabledHours?: (...any: any[]) => number[]
    disabledMinutes?: (...any: any[]) => number[]
    disabledSeconds?: (...any: any[]) => number[]
  }
}
/* 时间范围类型 */
export interface YFormTimeRangeProps extends YFormBasicItemProps, YFormValueType {
  type: 'timeRange'
  defaultValue?: [string, string] | string
  fieldMap?: [string, string]
  props?: {
    disabled?: boolean | Ref<boolean>
    readonly?: boolean
    editable?: boolean
    clearable?: boolean
    startPlaceholder?: string
    endPlaceholder?: string
    size?: 'large' | 'default' | 'small'
    arrowControl?: boolean
    format?: string
    valueFormat?: string
    disabledHours?: (...any: any[]) => number[]
    disabledMinutes?: (...any: any[]) => number[]
    disabledSeconds?: (...any: any[]) => number[]
    rangeSeparator?: string
  }
}
/* 日期范围类型 */
export interface YFormDateRangeProps extends YFormBasicItemProps, YFormValueType {
  type: 'monthRange' | 'dateRange' | 'datetimeRange'
  defaultValue?: [string, string] | string
  fieldMap?: [string, string]
  props?: {
    size?: 'large' | 'default' | 'small'
    disabled?: boolean | Ref<boolean>
    readonly?: boolean
    editable?: boolean
    clearable?: boolean
    format?: string
    defaultValue?: [Date, Date]
    defaultTime?: [Date, Date]
    valueFormat?: string
    startPlaceholder?: string
    endPlaceholder?: string
    rangeSeparator?: string
  }
}
/* 树形下拉类型 */
export interface YFormTreeSelectItemProps extends YFormBasicItemProps, YFormDictType, YFormValueType {
  type: 'treeSelect'
  defaultValue?: any
  props?: {
    /* elTree组件 */
    highlighCurrent?: boolean
    defaultExpandAll?: boolean
    expandOnClickNode?: boolean
    checkOnClickNode?: boolean
    autoExpandParent?: boolean
    defaultExpandedKeys?: DictValue[]
    showCheckbox?: boolean
    checkStrictly?: boolean
    accordion?: boolean
    /* elSelect */
    multiple?: boolean
    disabled?: boolean | Ref<boolean>
    size?: 'large' | 'default' | 'small'
    clearable?: boolean
    collapseTags?: boolean
    collapseTagsTooltip?: boolean
    multipleLimit?: number
    placeholder?: string
    filterable?: boolean
  }
}
export interface YFormTextItemProps extends YFormBasicItemProps {
  type: 'text'
  defaultValue?: any
  props?: Record<string, any>
}
export type YFormItemProps =
  | YFormInputItemProps
  | YFormTextareaItemProps
  | YFormPasswordItemProps
  | YFormSelectItemProps
  | YFormCascaderItemProps
  | YFormRadioItemProps
  | YFormSwitchItemProps
  | YFormNumberItemProps
  | YFormNumberRangeItemProps
  | YFormSliderItemProps
  | YFormSliderItemProps
  | YFormSlotItemProps
  | YFormCheckboxItemProps
  | YFormDateItemProps
  | YFormTimeItemProps
  | YFormTimeRangeProps
  | YFormDateRangeProps
  | YFormTreeSelectItemProps
  | YFormTextItemProps

export type YFormColumn = YFormItemProps & YFormBasicFieldProps

/* YForm */
export interface YFormProps extends Partial<Omit<FormProps, 'inline' | 'rules' | 'model'>> {
  columns: YFormColumn[]
  isInitDict?: boolean
  /* 折叠分组 */
  foldGroup?: string[][]
  /* 是否隐藏除第一个外的分组 */
  hideFoldGroup?: boolean
  /* 布局 */
  layout?: FormLayout
  /* 表单数据同步 */
  form?: Record<string, any>
}
