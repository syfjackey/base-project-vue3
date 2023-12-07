import type { FormRules } from 'element-plus'
import type { YFormColumn } from './componet-type'

/* 根据值 获取对应字典 数组返数组 值返值 */
export function reflexDicts(
  dicts: DictItem[],
  values: DictValue[] | string[] | DictItem[],
  valueType: 'label' | 'value' | 'item'
): DictItem[]
export function reflexDicts(
  dicts: DictItem[],
  values: DictValue | string | DictItem | undefined,
  valueType: 'label' | 'value' | 'item'
): DictItem | undefined
export function reflexDicts(
  dicts: DictItem[] = [],
  values: DictValue | DictValue[] | string | string[] | DictItem | DictItem[] | undefined,
  valueType: 'label' | 'value' | 'item' = 'value'
): DictItem[] | DictItem | undefined {
  if (values === undefined || values === null) return undefined
  const isArray = Array.isArray(values)
  if (dicts.length === 0) return isArray ? [] : undefined
  if (valueType === 'item') return values as DictItem[] | DictItem
  const keys: any[] = isArray ? values : [values]
  const dictMap = new Map()
  flatDict(dicts, valueType, dictMap)
  const filterDicts = keys.map((key) => dictMap.get(key)).filter((dict) => !!dict)
  return isArray ? filterDicts : filterDicts[0]
}
function flatDict(dicts: DictItem[] = [], key: 'label' | 'value' = 'value', map: Map<any, DictItem> = new Map()): Map<any, DictItem> {
  dicts.forEach((dict) => {
    flatDict(dict.children, key, map)
    map.set(dict[key], dict)
  })
  return map
}
export function getValueBy(dicts: DictItem[], key: 'label' | 'value' | 'item'): DictItem[] | DictValue[]
export function getValueBy(dict: DictItem | undefined, key: 'label' | 'value' | 'item'): DictItem | DictValue | undefined
export function getValueBy(dicts: DictItem[] | DictItem | undefined, key: 'label' | 'value' | 'item' = 'value') {
  if (dicts === undefined) return undefined
  if (key === 'item') return dicts
  const isArray = Array.isArray(dicts)
  if (key === 'label') return isArray ? dicts.map((dict) => dict.label) : dicts.label
  return isArray ? dicts.map((dict) => dict.value) : dicts.value
}

export function createDefaultForm(columns: YFormColumn[] = []) {
  return columns.reduce(
    (obj, column) => {
      obj[column.field] = rebackValue(column.defaultValue, column)
      return obj
    },
    {} as Record<string, any>
  )
}
/* 将组件用的表单 转换为 有效表单 */
type FieldMap = Record<string, { type: 'string' | 'fieldMap'; field: any[] }>
export function getEffectiveForm(form: Record<string, any>, columns: YFormColumn[] = [], fieldMap: FieldMap) {
  const newForm: Record<string, any> = JSON.parse(JSON.stringify(form))
  columns.forEach((column) => {
    const fieldValue = newForm[column.field]
    const map = fieldMap[column.field]
    delete newForm[column.field]
    if (map.type === 'fieldMap') {
      const values = Array.isArray(fieldValue) ? fieldValue : []
      map.field.forEach((field, i) => {
        setValue(newForm, field, convertValue(values[i], column))
      })
    } else {
      setValue(newForm, map.field, convertValue(fieldValue, column))
    }
  })
  return newForm
}
export function createFormRules(columns: YFormColumn[] = [], form: Record<string, any>): FormRules {
  return columns.reduce((ruleObj, column) => {
    if (column.rules) {
      const rules = Array.isArray(column.rules) ? column.rules : [column.rules]
      //@ts-ignore
      ruleObj[column.field] = rules.map((rule) => {
        if (rule.validator) {
          return {
            ...rule,
            //@ts-ignore
            validator: (...args: any[]) => rule.validator!(...args, form) as any
          }
        }
        return rule
      })
    }

    return ruleObj
  }, {} as FormRules)
}
export function getDicts(columns: YFormColumn[] = []): string[] {
  // @ts-ignore 获取字典值
  return columns.filter((column) => column.dict && typeof column.dict === 'string').map((column) => column.dict)
}
/* 获取组件绑定表单与实际表单映射关系 */
export function createFieldMap(columns: YFormColumn[] = []) {
  const obj: FieldMap = {}
  columns.forEach((column) => {
    // @ts-ignore 类型为 时间范围 日期范围 数字范围组件
    if (Array.isArray(column.fieldMap)) {
      obj[column.field] = {
        type: 'fieldMap',
        // @ts-ignore
        field: column.fieldMap.map((field) => field.split('.'))
      }
    } else {
      obj[column.field] = {
        type: 'string',
        field: column.field.split('.')
      }
    }
  })
  return obj
}
/* 给某个对象赋值 */
function setValue(obj: Record<string, any>, arrs: string[], value: any) {
  const key = arrs[0]
  let newValue: Record<string, any> = obj[key] || {}
  obj[key] = newValue
  const fields = arrs.slice(1)
  if (fields.length === 0) {
    obj[key] = value
  } else {
    fields.forEach((field, i) => {
      newValue[field] = newValue[field] || {}
      if (i === fields.length - 1) {
        newValue[field] = value
      } else {
        newValue = newValue[field]
      }
    })
  }
}
/* 组件表单转真实表单,需要根据转换类型映射 */
function convertValue(value: any, column: YFormColumn) {
  // @ts-ignore
  if (column.convertValue && Array.isArray(value)) {
    // @ts-ignore
    const separator = typeof column.convertValue === 'boolean' ? ',' : (column.convertValue as string)
    if (typeof value[0] === 'number' || typeof value[0] === 'string') {
      return value.join(separator)
    }
    console.warn(`${column.field}字段转换失败,只能转换number[]|string[]`)
  }
  return value
}
/* 真实表单映射到组件表单时需要进行类型还原 */
function rebackValue(value: any, column: YFormColumn) {
  // @ts-ignore
  if (column.convertValue && typeof value === 'string') {
    // @ts-ignore
    const separator = typeof column.convertValue === 'boolean' ? ',' : (column.convertValue as string)
    const values = value.split(separator)
    if (values.length === 0) return []
    return basicTools.isNum(values[0]) ? values.map((v) => +v) : values
  }
  return value
}

export function updateFieldsByRelation(
  oldForm: Record<string, any>,
  updateForm: Record<string, any>,
  fieldMap: FieldMap,
  columns: YFormColumn[]
) {
  const newForm = { ...oldForm }
  Object.keys(oldForm).forEach((field) => {
    const column = columns.find((column) => column.field === field)
    const map = fieldMap[field]

    if (map.type === 'string') {
      const res = checkObjectPath(updateForm, map.field)

      if (res.check) {
        newForm[field] = rebackValue(res.value, column!)
      }
    } else {
      const values: any[] = []
      let hasError = false
      for (let i = 0; i < map.field.length; i++) {
        const mapField = map.field[i]
        const res = checkObjectPath(updateForm, mapField)
        if (res.check) {
          values.push(rebackValue(res.value, column!))
        } else {
          hasError = true
          break
        }
      }
      if (!hasError) {
        newForm[field] = values
      }
    }
  })
  return newForm
}

export function updateFields(form: Record<string, any>, fieldMap: FieldMap, data: string | Record<string, any>, value?: any) {
  const keys = typeof data === 'string' ? [data] : Object.keys(data)
  const values = typeof data === 'string' ? [value] : Object.values(data)
  const newForm = { ...form }
  keys.forEach((key, i) => {
    if (fieldMap[key]) {
      newForm[key] = values[i]
    } else {
      console.warn(`表单字段不存在=>${key}`)
    }
  })

  return newForm
}
export function checkObjectPath(obj: Record<string, any>, paths: string[]) {
  return basicTools.checkPath(obj, paths)
}
/* 获取form传参 */

export function filterProps(props: Record<string, any>) {
  const filterKeys = ['columns', 'isInitDict', 'foldGroup', 'hideFoldGroup', 'layout', 'inline', 'rules', 'model', 'fieldGap']
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
