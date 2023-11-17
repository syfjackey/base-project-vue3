<script setup lang="ts"></script>
<template>
  <div class="democomponent__container">
    <h1>YDictLabel 字典名组件</h1>
    <p>根据字典值显示对应字典名</p>
    <h2>基础用法</h2>
    <div class="example">
      <YDictLabel type="sex" :value="0" class="barclass"></YDictLabel>
      <textarea class="code" disabled><YDictLabel type="sex" :value="0" class="barclass"></YDictLabel></textarea>
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
        <td>type</td>
        <td>字典类型</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>value</td>
        <td>字典值</td>
        <td>string|number</td>
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
