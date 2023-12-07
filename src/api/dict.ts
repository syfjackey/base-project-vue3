import { request } from '@/axios'
/* 关系映射 */
export const dictMap = { label: 'label', value: 'value' }
/**
 * 远端字典获取接口
 * @desc 支持通用映射  也可用返回成 {options:DictOptionMap,dicts:RemoteDictItem[]} 数据格式 来单接口自定义转换
 * @param type
 * @returns
 */
export async function selectDict(type: string) {
  return request<RemoteDictItem[]>({
    url: `/dict`,
    params: { type },
    method: 'get'
  })
}
