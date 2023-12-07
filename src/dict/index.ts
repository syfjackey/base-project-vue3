/* 默认字典值 */

const dicts: Record<string, DictItem[]> = {
  sex: [
    {
      label: '男',
      value: 0
    },
    {
      label: '女',
      value: 1
    }
  ],
  cascader: [
    {
      label: '零级',
      value: '0',
      children: [
        {
          label: '零级-1',
          value: '0-1'
        }
      ]
    },
    {
      label: '一级',
      value: '1'
    },
    {
      label: '二级',
      value: '2'
    }
  ]
}
export default dicts
