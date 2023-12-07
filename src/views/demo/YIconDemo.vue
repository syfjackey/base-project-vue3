<script setup lang="ts"></script>
<template>
  <div class="democomponent__container">
    <h1>YIcon</h1>
    <p>图标组件,支持url 和 uno方式</p>
    <h2>基础用法</h2>
    <div class="example">
      <YIcon icon="i-custom:close"></YIcon>
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
        <td>icon</td>
        <td>图标</td>
        <td>string</td>
        <td>i-custom:help</td>
      </tr>
      <tr>
        <td>size</td>
        <td>大小</td>
        <td>string</td>
        <td>16px</td>
      </tr>
      <tr>
        <td>color</td>
        <td>颜色</td>
        <td>string</td>
        <td>#999</td>
      </tr>
      <tr>
        <td>hoverColor</td>
        <td>滑过颜色</td>
        <td>string</td>
        <td>#999</td>
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
