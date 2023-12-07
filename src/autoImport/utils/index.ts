/**
 * 获取图片
 * @param src  图片地址
 * @param defaultSrc 默认图片
 * @returns
 */
function getImg(src?: string, defaultSrc?: string) {
  const newSrc = src || defaultSrc || ''
  if (!newSrc) return ''
  if (newSrc.toLowerCase().startsWith('http')) return newSrc
  if (newSrc.startsWith('/')) return newSrc
  return new URL(`../../assets/images/${newSrc}`, import.meta.url).href
}
/**
 * 分割数组
 * @param arr 原数组
 * @param num 切分数量
 * @returns
 */
function splitArr(arr: any[], num: number) {
  //arr是你要分割的数组，num是以几个为一组
  const newArr = [] //首先创建一个新的空数组。用来存放分割好的数组
  for (let i = 0; i < arr.length; ) {
    //注意：这里与for循环不太一样的是，没有i++
    newArr.push(arr.slice(i, (i += num)))
  }
  return newArr
}
/**
 * 验证字符串是否为url
 * @param {string} url
 * @returns { boolean }
 * @example isUrl("http://www.test.com")===true?'是':'否'
 */
function isUrl(url: string) {
  const reg = new RegExp(/^(https:|http:)?\/\//, 'i')
  return reg.test(url)
}
/**
 * 图片转换
 * @param hex 16进值
 * @returns { string } Base64
 */
function coverHexToImg(hex: string) {
  const list = hex.match(/.{1,2}/g)
  if (!list) return ''
  const bytes = list.map((byte) => parseInt(byte, 16))
  const base64 = btoa(String.fromCharCode.apply(null, bytes))
  return 'data:image/png;base64,' + base64
}
/**
 * 判断是否数字
 * @param value
 * @returns { boolean }
 */
function isNum(value: any) {
  if (typeof value === 'number') return true
  if (typeof value !== 'string') return false
  const numberRegex = /^-?\d+(\.\d+)?$/
  return numberRegex.test(value)
}

/**
 * 判断字符串数组是否存在交集
 */
function hasIntersection<T>(arr1: T[], arr2: T[]): boolean {
  return arr1.some((item) => arr2.includes(item))
}

/**
 *  判断url是否已编码
 */
function getEncoded(uri: string = '') {
  return uri !== decodeURIComponent(uri) ? decodeURIComponent(uri) : uri
}
/**
 * 判断类型
 */
type ValueType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'array'
  | 'null'
  | 'formdata'
  | 'date'
  | 'regexp'
  | 'set'
  | 'map'
/**
 * getType 获取数据类型
 * @param value
 * @returns
 */
function getType(value: any): ValueType {
  const type = typeof value
  if (type !== 'object') {
    // 如果是基本数据类型，直接返回
    return type
  }
  // 如果是引用数据类型，再进一步判断，正则返回结果
  return Object.prototype.toString
    .call(value)
    .replace(/^\[object (\S+)\]$/, '$1')
    .toLowerCase() as 'array' | 'null' | 'formdata'
}
/**
 * 判断是否为空<简单版>
 */
function isEmpty(value: any) {
  if (!value) return true
  if (JSON.stringify(value) === '{}') return true
  if (JSON.stringify(value) === '[]') return true
  return false
}

/**
 * 下载文件
 */
export const downloadFile = (fileUrl: string, callback?: () => void) => {
  const a = document.createElement('a') // 创建一个<a></a>标签
  a.href = fileUrl
  a.style.display = 'none' // 隐藏a标签
  document.body.appendChild(a) // 将a标签追加到文档对象中
  a.click() // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
  a.remove() // 一次性的，用完就删除a标签
  callback?.()
}

/* 获取本地地址 */
function getLocalUrl() {
  let localUrl = ''
  if (globalConfig.hashRouter) {
    localUrl = `${location.origin}${location.pathname}#/`
  } else {
    const path = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
    localUrl = `${location.protocol}//${location.host}${path}`
  }
  return localUrl
}
/* 对象转参数 */
function toParams(data: { [key: string]: any }) {
  return Object.keys(data)
    .map((key) => key + '=' + data[key])
    .join('&')
}
/* 数组转树 */
function toTree<T extends TreeItem, K extends keyof T & string>(list: T[] = [], id: K, pid: K): T[] {
  const tree: T[] = []
  const treeMap = new Map<T[K], T>()
  for (const node of list) {
    treeMap.set(node[id], { ...node, children: [] })
  }
  for (const [, node] of treeMap) {
    const pNode = treeMap.get(node[pid])
    if (pNode) {
      pNode['children'] ??= []
      pNode['children'].push(node)
    } else {
      tree.push(node)
    }
  }
  return tree
}

/* 获取url传参 */

function getQuery() {
  const url = new URL(location.href)
  const route = useRoute()
  return { ...Object.fromEntries(url.searchParams.entries()), ...route.query }
}
/**
 * cloneDeep 深拷贝
 * @param value
 * @param stack
 * @returns
 */
function cloneDeep<T>(value: T, stack = new Map()): T {
  let result: any

  // 原始类型直接返回
  if (!(value !== null && (typeof value === 'object' || typeof value === 'function'))) {
    return value
  }

  // 处理循环引用
  if (['array', 'map', 'object', 'set'].includes(getType(value))) {
    if (stack.has(value)) {
      return stack.get(value)
    }
    stack.set(value, result)
  }

  switch (getType(value)) {
    case 'boolean':
    case 'date':
    case 'number':
    case 'string':
      // @ts-ignore
      result = new value.constructor(value)
      break

    case 'regexp':
      // @ts-ignore
      result = new value.constructor(value.source, value.flags)
      // @ts-ignore
      result.lastIndex = value.lastIndex
      break

    case 'map':
      // @ts-ignore
      result = new value.constructor()
      // @ts-ignore
      ;(value as Map<any, any>).forEach((v, k) => {
        ;(result as Map<any, any>).set(k, cloneDeep(v, stack))
      })
      break

    case 'set':
      // @ts-ignore
      result = new value.constructor()
      // @ts-ignore
      ;(value as Set<any>).forEach((v) => {
        ;(result as Set<any>).add(cloneDeep(v, stack))
      })
      break

    case 'array':
      // @ts-ignore
      result = new value.constructor()
      // @ts-ignore
      for (let index = 0; index < value.length; index++) {
        // @ts-ignore
        result[index] = cloneDeep(value[index], stack)
      }
      break

    case 'object':
      // @ts-ignore
      result = new value.constructor()
      Object.keys(value).forEach((k) => {
        // @ts-ignore
        result[k] = cloneDeep(value[k], stack)
      })
      break

    default:
      result = value
      break
  }

  return result as T
}
/**
 * 根据某键值过滤树
 * @param trees  属性数组
 * @param field  过滤键值
 * @param value  过滤值
 * @returns
 */
function filterTreeBy<T>(trees: T[] = [], field: keyof T, value: any): T[] {
  const filteredNodes: T[] = []
  trees.forEach((item) => {
    if (item[field] === value) {
      // @ts-ignore
      const children = filterTreeBy(item.children, field, value)
      // @ts-ignore
      item.children = children
      filteredNodes.push(item)
    }
  })
  return filteredNodes
}
/**
 * 根据某键值取树
 * @param trees
 * @param field
 * @returns
 */
function getTreeValueBy<T, K extends keyof T>(trees: T[] = [], field: K): T[K][] {
  const values: T[K][] = []
  trees.forEach((item) => {
    if (item[field] !== null || item[field] !== undefined) {
      values.push(item[field])
    }
    // @ts-ignore
    if (item.children) {
      // @ts-ignore
      const subValues = getTreeValueBy(item.children, filed)
      values.push(...subValues)
    }
  })
  return [...new Set(values)]
}
/**
 * 根据路径检查对象是否存在该字段
 * @param obj
 * @param paths
 * @returns
 */
function checkPath(obj: Record<string, any>, paths: string[]) {
  if (paths.length === 0) return { check: false, value: undefined }
  let checkObj = obj
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i]
    if (getType(checkObj) !== 'object') return { check: false, value: undefined }

    const check = Object.hasOwn(checkObj, key)
    if (check) {
      if (i === paths.length - 1) {
        return { check: true, value: checkObj[key] }
      } else {
        checkObj = checkObj[key]
      }
    } else {
      return { check: false, value: undefined }
    }
  }
  return { check: false, value: undefined }
}
export const basicTools = {
  getImg,
  splitArr,
  isUrl,
  coverHexToImg,
  isNum,
  hasIntersection,
  getEncoded,
  getType,
  isEmpty,
  downloadFile,
  getLocalUrl,
  toParams,
  toTree,
  getQuery,
  cloneDeep,
  getTreeValueBy,
  filterTreeBy,
  checkPath
}
