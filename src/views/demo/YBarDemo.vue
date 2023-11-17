<script setup lang="ts"></script>
<template>
  <div class="democomponent__container">
    <h1>YBar 工具条组件</h1>
    <p>支持上下/左右/上中下/左中右布局的flex类型的工具条</p>
    <h2>基础用法</h2>
    <div class="example">
      <YBar class="barclass"> 普通内容 </YBar>
      <textarea class="code" disabled><YBar> 普通内容 </YBar></textarea>
    </div>
    <h2>左右结构</h2>
    <div class="example">
      <YBar class="barclass">
        <template #left><div class="left">左侧内容</div></template>
        <template #right><div class="right">右侧内容</div></template>
      </YBar>
      <textarea class="code" disabled>
      <YBar class="barclass">
        <template #left><div class="left">左侧内容</div></template>
        <template #right><div class="right">右侧内容</div></template>
      </YBar>
      </textarea>
    </div>
    <h2>左中右结构</h2>
    <div class="example">
      <YBar class="barclass">
        <template #left><div class="left">左侧内容</div></template>
        <div class="center">我是中间内容</div>
        <template #right><div class="right">右侧内容</div></template>
      </YBar>
      <textarea class="code" disabled>
      <YBar class="barclass">
        <template #left><div class="left">左侧内容</div></template>
        <div class="center">我是中间内容</div>
        <template #right><div class="right">右侧内容</div></template>
      </YBar>
      </textarea>
    </div>
    <h2>上下结构</h2>
    <div class="example">
      <YBar class="barclass" dir="column">
        <template #top><div class="left">上层内容</div></template>
        <template #bottom><div class="right">下层内容</div></template>
      </YBar>
      <textarea class="code" disabled>
      <YBar class="barclass" dir="column">
        <template #top><div class="left">上层内容</div></template>
        <template #bottom><div class="right">下层内容</div></template>
      </YBar>
      </textarea>
    </div>
    <h2>上中下结构</h2>
    <div class="example">
      <YBar class="barclass" dir="column">
        <template #top><div class="left">左侧内容</div></template>
        <div class="center">我是中间内容</div>
        <template #bottom><div class="right">右侧内容</div></template>
      </YBar>
      <textarea class="code" disabled>
      <YBar class="barclass" dir="column">
        <template #top><div class="left">左侧内容</div></template>
        <div class="center">我是中间内容</div>
        <template #bottom><div class="right">右侧内容</div></template>
      </YBar>
      </textarea>
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
        <td>0</td>
      </tr>
      <tr>
        <td>dir</td>
        <td>方向</td>
        <td>'row' | 'column'</td>
        <td>'row'</td>
      </tr>
    </table>
    <h2>插槽</h2>
    <table class="table">
      <tr>
        <th>插槽名</th>
        <th>说明</th>
      </tr>
      <tr>
        <td>left</td>
        <td>左侧插槽</td>
      </tr>
      <tr>
        <td>right</td>
        <td>右侧插槽</td>
      </tr>
      <tr>
        <td>top</td>
        <td>上层插槽</td>
      </tr>
      <tr>
        <td>bottom</td>
        <td>下层插槽</td>
      </tr>
      <tr>
        <td>default</td>
        <td>默认插槽</td>
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
