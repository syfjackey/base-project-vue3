<script setup lang="ts">
import type { YFormColumn } from '@/autoImport/components/YForm/componet-type'
import type { YTableFieldProps, YTablePageResponse } from '@/autoImport/components/YTable/component-type'
const datas: Record<string, any>[] = [
  {
    key1: '测试',
    key2: 0,
    key3: '自定义',
    key4: '自定义表头',
    key5: 'formatter内容',
    key6: '固定左侧'
  }
]
const tableColumns: YTableFieldProps[] = [
  {
    field: 'key1',
    label: '普通字段'
  },
  {
    field: 'key2',
    label: '字典类型',
    dict: 'sex'
  },
  {
    field: 'key3',
    label: '自定义插槽',
    type: 'slot'
  },
  {
    field: 'key4',
    label: '字典类型',
    type: 'slot'
  },
  {
    field: 'key5',
    label: 'formatter字段',
    formatter(row) {
      return row.key5
    }
  },
  {
    field: 'key6',
    label: '固定位置',
    props: {
      fixed: 'left'
    }
  }
]
const api = () => datas

const pageApi: (params: any) => YTablePageResponse<Record<string, any>> = (params) => {
  console.log(params)

  return {
    total: 100,
    list: [
      {
        key1: '测试',
        key2: 0,
        key3: '自定义',
        key4: '自定义表头',
        key5: 'formatter内容',
        key6: '固定左侧'
      }
    ]
  }
}
const formColumns: YFormColumn[] = [
  {
    field: 'input',
    label: '输入框',
    type: 'input',
    props: {
      placeholder: '传参参照对应的elementPlus表单组件'
    }
  },
  {
    field: 'select',
    label: '下拉框',
    type: 'select',
    dict: 'sex'
  }
]
</script>
<template>
  <div class="democomponent__container">
    <h1>YPageTable</h1>
    <p>整合YSearch与YTable,并自带相关工具条的综合组件</p>
    <h2>基础用法</h2>
    <div class="example">
      <YPageTable :data-api="pageApi" :table-columns="tableColumns" :form-columns="formColumns"> </YPageTable>
    </div>

    <h2>属性</h2>
    <table class="table">
      <tr>
        <th>属性名</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>gap</td>
        <td>间隔</td>
        <td>string</td>
        <td>12px</td>
      </tr>
      <tr>
        <td>tableColumns</td>
        <td>表格配置项</td>
        <td>YTableColumn</td>
        <td></td>
      </tr>
      <tr>
        <td>tableConfig</td>
        <td>表格其他配置</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>formColumns</td>
        <td>表单配置项</td>
        <td>YFormColumn</td>
        <td></td>
      </tr>
      <tr>
        <td>formConfig</td>
        <td>表单其他配置项</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>pageSize</td>
        <td>分页条数</td>
        <td>number</td>
        <td></td>
      </tr>
      <tr>
        <td>dataApi</td>
        <td>请求接口</td>
        <td>YTableDataType</td>
        <td></td>
      </tr>
    </table>
    <h2>事件</h2>
    <table class="table">
      <tr>
        <th>事件</th>
        <th>说明</th>
        <th>参数</th>
      </tr>
    </table>
    <h2>暴露函数</h2>
    <table class="table">
      <tr>
        <th>属性名</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>getList</td>
        <td>获取数据</td>
        <td>(pageNum:number) => Promise</td>
        <td></td>
      </tr>
      <tr>
        <td>getTableInstance</td>
        <td>elTable表格实例</td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <h2>插槽</h2>
    <table class="table">
      <tr>
        <th>插槽名</th>
        <th>说明</th>
        <th>传参</th>
      </tr>
      <tr>
        <td>tool</td>
        <td>工具条左侧区域</td>
        <td></td>
      </tr>
      <tr>
        <td>toolBefore</td>
        <td>工具条左</td>
        <td></td>
      </tr>
      <tr>
        <td>toolEnd</td>
        <td>工具条右</td>
        <td></td>
      </tr>
      <tr>
        <td>btns</td>
        <td>表单按钮组覆盖插槽</td>
        <td></td>
      </tr>
      <tr>
        <td>btnEnd</td>
        <td>表单按钮组插槽</td>
        <td></td>
      </tr>
      <tr>
        <td>${field}Header</td>
        <td>表格表头插槽</td>
        <td>{list,column,index}</td>
      </tr>
      <tr>
        <td>${field}</td>
        <td>表格插槽</td>
        <td>{list,column,index,row}</td>
      </tr>
    </table>
  </div>
</template>
<style lang="scss" scoped>
.democomponent__container {
  @apply w-100% h-100%  bg-white box-border p-20px overflow-auto;
  .example {
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    padding: 32px 24px;
  }
  .left,
  .right {
    background: #d3dce6;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .center {
    background: #99a9bf;
  }
  .barclass {
    @apply lh-30px bg-#E5E9F2;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  .table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    line-height: 40px;
    tr {
      border-bottom: solid 1px #dcdfe6;
    }
  }
  .code {
    background: #1e1e1e;
    color: #fff;
    font-weight: bold;
    line-height: 30px;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 10px;
    resize: none;
    width: 100%;
  }
  textarea.code {
    height: 200px;
  }
}
</style>
