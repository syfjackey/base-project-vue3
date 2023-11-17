import dicts from '@/dict/index'

// 基础设置
const GlobalDict = new Map<string, DictItem[]>()
Object.entries(dicts).map(([key, value]) => GlobalDict.set(key, value))
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
async function initDict(dictTypes: string[] = [], cache: boolean = true) {
  const promiseList = dictTypes.map((dictType) => getDict(dictType, cache))
  await Promise.allSettled(promiseList)
  return true
}
/**
 * getLocalDict 获取本地字典
 * @param dictType 字典类型
 * @returns
 */
function getLocalDict(dictType: string) {
  if (!dictType) return []
  return GlobalDict.get(dictType) || []
}
/**
 * getDict 异步获取字典
 * @param dictType 字典类型
 * @param cache 是否缓存
 * @returns
 */
async function getDict(dictType: string, cache = true) {
  if (!dictType) return []
  if (GlobalDict.has(dictType)) {
    return GlobalDict.get(dictType)!
  } else {
    const list = await GetRemoteDict(dictType)
    if (cache) {
      GlobalDict.set(dictType, list)
    }
    return list
  }
}
/**
 * getLocalDictLabel 获取本地字典名
 * @param dictType 字典类型
 * @param value  字典值
 * @param defaultLabel 默认名称
 * @returns
 */
function getLocalDictLabel(dictType: string, value: DictValue, defaultLabel: DictValue = '未知') {
  const list = GlobalDict.get(dictType) || []
  const item = searchDictItem(list, value)
  return item?.label || defaultLabel
}
/**
 * getDictLabel 异步获取字典名
 * @param dictType 字典类型
 * @param value  字典值
 * @param defaultLabel 默认名称
 * @returns
 */
async function getDictLabel(dictType: string, value: DictValue, defaultLabel?: DictValue) {
  await getDict(dictType)
  return getLocalDictLabel(dictType, value, defaultLabel)
}

/**
 * setRemote 配置远端字典接口
 * @description 如需进行远程获取,请在main.ts中进行配置
 *
 * @param remoteFn 远程获取字典函数
 * @param options 匹配规则
 */

function setRemote(remoteFn: (dictType: string) => Promise<DictItem[]> | DictItem[]): void
function setRemote(
  remoteFn: (dictType: string) => Promise<RemoteDictItem[]> | RemoteDictItem[],
  options: {
    label: string
    value: string
  }
): void
function setRemote(
  remoteFn: (dictType: string) => Promise<any[]> | any[],
  options?: {
    label: string
    value: string
  }
) {
  const ops = { label: 'label', value: 'value', ...options }

  GetRemoteDict = async (dictType: string) => {
    const list = await remoteFn(dictType)
    return coverRemoteItem(list, ops)
  }
}
/**
 * getDictByYFormDict YForm组件用的工具函数
 * @param dict
 * @returns
 */
async function getDictByYFormDict(dict?: string | DictItem[] | ((dictType?: string) => Promise<DictItem[]>)): Promise<DictItem[]> {
  if (!dict) return []
  if (typeof dict === 'string') {
    return getDict(dict)
  } else if (Array.isArray(dict)) {
    return dict
  } else if (typeof dict === 'function') {
    return dict()
  }
  return []
}

/**
 * 字典工具
 *
 * @returns initDict 初始化字典项
 * @returns getLocalDict 获取本地字典
 * @returns getLocalDictLabel 获取本地字典名
 * @returns getDict 异步获取字典
 * @returns getDictLabel 异步获取字典名
 * @returns getRefDict 字典Ref
 * @returns setRemote 配置远端主机
 * @returns getDictByYFormDict 用于YForm组件的工具
 */
export const useDict = () => ({
  initDict,
  getDict,
  getDictLabel,
  getLocalDict,
  getLocalDictLabel,
  getRefDict,
  setRemote,
  getDictByYFormDict
})

/**
 * getRefDict 获取字典
 * @description 获取Ref类型的字典列表
 *
 * @param dictType 字典Key
 * @returns Ref<DictItem[]>
 */

function getRefDict(dictType: string) {
  const dict = shallowRef<DictItem[]>([])
  getDict(dictType).then((list) => (dict.value = list))
  return dict
}

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

function coverRemoteItem(
  remoteItems: RemoteDictItem[],
  options: {
    label: string
    value: string
  }
): DictItem[] {
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
