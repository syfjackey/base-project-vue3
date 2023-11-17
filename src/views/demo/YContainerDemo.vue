<script setup lang="ts"></script>
<template>
  <div class="democomponent__container">
    <h1>YContainer</h1>
    <p>页面布局容器,支持通过globalConfig配置,url传参配置</p>
    <h2>基础用法</h2>
    <div class="example">
      <YContainer class="comclass">
        <template #top>
          <div class="h-100px bg-blue">顶部</div>
        </template>
        <template #left>
          <div class="bg-green w-200px h-100px">左侧</div>
        </template>
        <div class="bg-yellow h-100px">中间</div>
        <template #right><div class="bg-green w-200px h-100px">右侧</div></template>
        <template #bottom>
          <div class="bg-blue h-100px">底部</div>
        </template>
      </YContainer>
      <textarea class="code" disabled>
        <YContainer class="comclass">
        <template #top>
          <div class="h-100px bg-blue">顶部</div>
        </template>
        <template #left>
          <div class="bg-green w-200px h-100px">左侧</div>
        </template>
        <div class="bg-yellow h-100px">中间</div>
        <template #right><div class="bg-green w-200px h-100px">右侧</div></template>
        <template #bottom>
          <div class="bg-blue h-100px">底部</div>
        </template>
      </YContainer>      
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
        <td>8px</td>
      </tr>
      <tr>
        <td>hideTop</td>
        <td>隐藏Top位置</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>hideBottom</td>
        <td>隐藏Bottom位置</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>hideLeft</td>
        <td>隐藏Left位置</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>hideRight</td>
        <td>隐藏Right位置</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
    </table>

    <h2>插槽</h2>
    <table class="table">
      <tr>
        <th>插槽名</th>
        <th>说明</th>
      </tr>
      <tr>
        <td>top</td>
        <td>顶部插槽</td>
      </tr>
      <tr>
        <td>bottom</td>
        <td>底部插槽</td>
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
  .comclass {
    width: 200px;
    height: 200px;
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
    margin-top: 10px;
  }
  textarea.code {
    height: 200px;
  }
}
</style>
