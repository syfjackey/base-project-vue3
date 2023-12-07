import dicts from '@/dict/index'
import { type Ref } from 'vue'
import type { YFormDictType } from '../components/YForm/componet-type'
// 基础设置
const GlobalDict = reactive<Record<string, DictItem[]>>(dicts)
let GetRemoteDict: (dictType: string) => Promise<DictItem[]> = async (dictType: string) => {
  console.warn(`字典:${dictType} -- 查询失败`)
  return []
}
/**
 * initDict 初始化字典项
 * @param dictTypes  字典类型数组
 * @param cache 是否缓存
 * @returns
 */
async function initDict(dictTypes: string[] = []) {
  const promiseList = dictTypes.map((dictType) => requireDict(dictType))
  await Promise.allSettled(promiseList)
  return true
}
const requireDict = async (dictType: string) => {
  if (GlobalDict[dictType]) return GlobalDict[dictType]
  GlobalDict[dictType] = []
  const list = await GetRemoteDict(dictType)

  GlobalDict[dictType].push(...list)
  return GlobalDict[dictType]
}
/**
 * getDict 获取字典
 * @param dictType 字典类型
 * @param cache 是否缓存
 * @returns Ref<DictItem[]>
 */
function getDict(dictType: string | Ref<string>): Ref<DictItem[]> {
  return computed(() => {
    const type = isRef(dictType) ? dictType.value : dictType
    if (!type) return []

    if (!Array.isArray(GlobalDict[type])) {
      GlobalDict[type] = []
      console.log(type)
      GetRemoteDict(type).then((list) => {
        GlobalDict[type].push(...list)
      })
    }
    return GlobalDict[type]
  })
}

/**
 * getDictLabel 获取字典名
 * @param dictType 字典类型
 * @param value  字典值
 * @param defaultLabel 默认名称
 * @returns
 */
function getDictLabel(dictType: string | Ref<string>, value?: DictValue | Ref<DictValue>, defaultLabel?: DictValue | Ref<DictValue>) {
  return computed(() => {
    const type = isRef(dictType) ? dictType.value : dictType
    const val = isRef(value) ? value.value : value
    const defaultVal = isRef(defaultLabel) ? defaultLabel.value : defaultLabel

    if (!type) return defaultVal
    if (typeof val !== 'string' && typeof val !== 'number') return defaultVal

    // console.log(3333, type, val)
    const dicts = getDict(type).value
    const dict = dicts.find((item) => item.value === val)

    return dict?.label || defaultVal
  })
}

/**
 * setRemote 配置远端字典接口
 * @description 如需进行远程获取,请在main.ts中进行配置
 *
 * @param remoteFn 远程获取字典函数
 * @param options 匹配规则
 */
interface DictOptionMap {
  label: string
  value: string
}
interface RemoteData {
  options: DictOptionMap
  dicts: RemoteDictItem[]
}
function setRemote(remoteFn: (dictType: string) => Promise<RemoteData> | RemoteData): void
function setRemote(remoteFn: (dictType: string) => Promise<DictItem[]> | DictItem[]): void
function setRemote(remoteFn: (dictType: string) => Promise<RemoteDictItem[]> | RemoteDictItem[], options: DictOptionMap): void
function setRemote(remoteFn: (dictType: string) => Promise<any[]> | any[] | RemoteData | Promise<RemoteData>, options?: DictOptionMap) {
  const ops = { label: 'label', value: 'value', ...options }
  GetRemoteDict = async (dictType: string) => {
    const list = await remoteFn(dictType)
    if (Array.isArray(list)) {
      return coverRemoteItem(list, ops)
    }
    return coverRemoteItem(list.dicts, list.options)
  }
}
/**
 * getDictByYFormDict YForm组件用的工具函数
 * @param dict
 * @returns
 */
type YFormDict = YFormDictType['dict']
function getDictByYFormDict<T>(
  dict?: string | Ref<string> | YFormDict | Ref<YFormDict> | (() => Promise<DictItem[]> | DictItem[]) | Readonly<Ref<Promise<DictItem[]>>>
): Ref<T> {
  return asyncComputed(async () => {
    const rDict = isRef(dict) ? dict.value : dict
    if (!rDict) return []
    if (Array.isArray(rDict)) {
      return rDict
    } else if (typeof rDict === 'function') {
      return await rDict()
    } else if (typeof rDict === 'string') {
      return getDict(rDict).value
    } else {
      return await rDict
    }
  }, []) as Ref<T>
}

/**
 * 字典工具
 *
 * @returns initDict 初始化字典项
 * @returns getDict 获取字典 Ref类型
 * @returns getDictLabel 获取字典名 Ref类型
 * @returns setRemote 配置远端主机
 * @returns getDictByYFormDict 用于YForm组件的工具
 */
export const useDict = () => ({
  initDict,
  getDict,
  getDictLabel,
  setRemote,
  getDictByYFormDict,
  coverRemoteItem
})

/**
 * 根据值查找字典树
 */
function searchDictItem(items: DictItem[], value: DictValue): DictItem | undefined {
  let result: DictItem | undefined = undefined
  items.some((item) => {
    result = findDictItem(item, value)
    return !!result
  })
  return result
}
function findDictItem(item: DictItem, value: DictValue): DictItem | undefined {
  if (item.value === value) {
    return item
  }
  for (const child of item.children || []) {
    const result = findDictItem(child, value)
    if (result) {
      return result
    }
  }
  return
}

/**
 * 远端字典转换为本地字典
 */

function coverRemoteItem(remoteItems: RemoteDictItem[], options: DictOptionMap): DictItem[] {
  const result: DictItem[] = []
  remoteItems.forEach((remoteItem) => {
    let children: DictItem[] = []
    if (remoteItem.children) {
      children = coverRemoteItem(remoteItem.children, options)
    }
    result.push({ label: `${remoteItem[options.label]}`, value: remoteItem[options.value], children, _rawData: remoteItem })
  })

  return result
}
