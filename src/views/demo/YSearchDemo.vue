<script setup lang="ts">
import type { YFormColumn } from '@/autoImport/components/YForm/componet-type'

const columns: YFormColumn[] = [
  {
    field: 'input',
    label: '输入框',
    type: 'input'
  },
  {
    field: 'select',
    label: '下拉框',
    type: 'select',
    dict: 'sex'
  },
  {
    field: 'select1',
    label: '其他表单',
    type: 'select',
    dict: 'sex'
  }
]
const foldGroup: string[][] = [['input']]
</script>
<template>
  <div class="democomponent__container">
    <h1>YSearch</h1>
    <p>基于YForm封装而成的行内表单</p>
    <h2>基础用法</h2>
    <div class="example">
      <YSearch :columns="columns"></YSearch>
    </div>
    <h2>折叠展示</h2>
    <div class="example">
      <YSearch :columns="columns" :fold-group="foldGroup"></YSearch>
    </div>
    <h2>覆盖原按钮组</h2>
    <div class="example">
      <YSearch :columns="columns">
        <template #btns="{ search }">
          <el-button @click="search">新查询</el-button>
        </template>
      </YSearch>
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
        <td>columns</td>
        <td>表单项</td>
        <td>YFormColumn[]</td>
        <td></td>
      </tr>
      <tr>
        <td>isInitDict</td>
        <td>初始化字典项</td>
        <td>boolean</td>
        <td>true</td>
      </tr>
      <tr>
        <td>foldGroup</td>
        <td>表单项分组</td>
        <td>string[][]</td>
        <td></td>
      </tr>
      <tr>
        <td>layout</td>
        <td>布局</td>
        <td>FormLayout</td>
        <td></td>
      </tr>
      <tr>
        <td>labelWidth</td>
        <td>表单名宽度</td>
        <td>FormLayout</td>
        <td></td>
      </tr>
      <tr>
        <td>immediate</td>
        <td>是否立即触发一次search事件</td>
        <td>boolean</td>
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
      <tr>
        <td>search</td>
        <td>搜索事件</td>
        <td>(form)=>void</td>
      </tr>
      <tr>
        <td>reset</td>
        <td>重置事件</td>
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
        <td>btns</td>
        <td>覆盖原按钮组,传递对应事件</td>
        <td>{search,reset,expand}</td>
      </tr>
      <tr>
        <td>btnEnd</td>
        <td>按钮组插槽</td>
        <td></td>
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
