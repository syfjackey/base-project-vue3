<script setup lang="ts">
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
const columns: YTableFieldProps[] = [
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
const indexConfig = {
  label: '序号',
  width: '80px'
}
</script>
<template>
  <div class="democomponent__container">
    <h1>YTable</h1>
    <p>配置型分页表格组件,继承elTable</p>
    <h2>基础用法</h2>
    <div class="example">
      <YTable :columns="columns" :data="datas">
        <template #key3="{ row }">
          {{ row.key3 }}
        </template>

        <template #key4Header> diy表头 </template>
      </YTable>
    </div>
    <h2>序号 复选框</h2>
    <div class="example">
      <YTable :columns="columns" :data="datas" selection :indexConfig="indexConfig">
        <template #key3="{ row }">
          {{ row.key3 }}
        </template>

        <template #key4Header> diy表头 </template>
      </YTable>
    </div>
    <h2>接口用法</h2>
    <div class="example">
      <YTable :columns="columns" :data="api">
        <template #key3="{ row }">
          {{ row.key3 }}
        </template>

        <template #key4Header> diy表头 </template>
      </YTable>
    </div>
    <h2>分页用法</h2>
    <div class="example">
      <YTable :columns="columns" :data="pageApi" :params="{ id: 1 }">
        <template #key3="{ row }">
          {{ row.key3 }}
        </template>

        <template #key4Header> diy表头 </template>
      </YTable>
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
        <td>pagesize</td>
        <td>一页多少条-双向绑定</td>
        <td>number</td>
        <td>10</td>
      </tr>
      <tr>
        <td>pageNum</td>
        <td>当前页-双向绑定</td>
        <td>number</td>
        <td>1</td>
      </tr>
      <tr>
        <td>columns</td>
        <td>表格项</td>
        <td>YTableColumn[]</td>
        <td></td>
      </tr>
      <tr>
        <td>isInitDict</td>
        <td>初始化字典项</td>
        <td>boolean</td>
        <td>true</td>
      </tr>
      <tr>
        <td>pageSizes</td>
        <td>分页条数配置</td>
        <td>number[]</td>
        <td></td>
      </tr>
      <tr>
        <td>pageLayout</td>
        <td>分页显示项</td>
        <td>FormLayout</td>
        <td></td>
      </tr>
      <tr>
        <td>tools</td>
        <td>工具条配置</td>
        <td>YButtonGroupItem</td>
        <td></td>
      </tr>
      <tr>
        <td>gap</td>
        <td>工具条与表格间隔</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>data</td>
        <td>数据/请求函数</td>
        <td>YTableItem[] | YTableDataType</td>
        <td></td>
      </tr>
      <tr>
        <td>params</td>
        <td>请求函数附加传参</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>isPage</td>
        <td>是否显示分页组件</td>
        <td>boolean</td>
        <td></td>
      </tr>
      <tr>
        <td>selection</td>
        <td>是否显示复选框</td>
        <td>boolean</td>
        <td></td>
      </tr>
      <tr>
        <td>rowKey</td>
        <td>主键</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>immediate</td>
        <td>是否立即渲染</td>
        <td>boolean</td>
        <td></td>
      </tr>
      <tr>
        <td>indexConfig</td>
        <td>序号配置</td>
        <td></td>
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
