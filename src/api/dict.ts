import { request } from '@/axios'
/* 关系映射 */
export const dictMap = { label: 'label', value: 'value' }
// 远端字典获取接口
export async function selectDict(type: string) {
  return request<RemoteDictItem[]>({
    url: `/dict`,
    params: { type },
    method: 'get'
  })
}
