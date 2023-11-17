<script setup lang="ts"></script>
<template>
  <div class="democomponent__container">
    <h1>YButton</h1>
    <p>基于elButton二次封装后的按钮组件,支持popover/confirm</p>
    <h2>基础用法</h2>
    <div class="example">
      <YButton class="barclass"> 按钮 </YButton>
      <textarea class="code" disabled>  <YButton class="barclass"> 按钮 </YButton></textarea>
    </div>
    <h2>图标按钮</h2>
    <div class="example">
      <YButton class="barclass" icon="i-custom:close"> 按钮 </YButton>
      <YButton class="barclass" icon="i-custom:close" :loading="true"> 按钮 </YButton>
      <textarea class="code" disabled>
 
        <YButton class="barclass"> 按钮 </YButton>
        <YButton class="barclass" icon="i-custom:close" :loading="true"> 按钮 </YButton>
      </textarea>
    </div>
    <h2>提示按钮</h2>
    <div class="example">
      <YButton class="barclass" icon="i-custom:close" tip="显示内容"> 滑过显示 </YButton>
      <YButton class="barclass" icon="i-custom:close">
        <template #content>提示内容</template>
        滑过显示
      </YButton>
      <textarea class="code" disabled>
 
      <YButton class="barclass" icon="i-custom:close" tip="显示内容"> 滑过显示 </YButton>
      <YButton class="barclass" icon="i-custom:close">
        <template #content>提示内容</template>
        滑过显示
      </YButton>
      </textarea>
    </div>
    <h2>确认按钮</h2>
    <div class="example">
      <YButton class="barclass" icon="i-custom:close" confirm="是否删除此内容"> 监听click </YButton>
      <textarea class="code" disabled>
 
      <YButton class="barclass" icon="i-custom:close" confirm="是否删除此内容"> 监听click </YButton>
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
        <td>icon</td>
        <td>图标</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>confirm</td>
        <td>确认框内容</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>tip</td>
        <td>提示内容</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>trigger</td>
        <td>触发方式</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>auth</td>
        <td>按钮权限(与v-auth同理)</td>
        <td>string</td>
        <td></td>
      </tr>
    </table>
    <h2>插槽</h2>
    <table class="table">
      <tr>
        <th>插槽名</th>
        <th>说明</th>
      </tr>
      <tr>
        <td>content</td>
        <td>popover显示内容</td>
      </tr>
      <tr>
        <td>default</td>
        <td>默认插槽</td>
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
        <td>click</td>
        <td>点击事件</td>
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
