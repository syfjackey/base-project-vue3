<script setup lang="ts">
import type { YButtonGroupItem } from '@/autoImport/components/YButtonGroup/component-type'

const items: YButtonGroupItem[] = [
  {
    type: 'refresh',
    icon: 'i-custom:refresh'
  },
  {
    type: 'close',
    label: '关闭'
  },
  {
    type: 'help',
    label: '帮助',
    help: '帮助信息'
  },
  {
    type: 'tip',
    label: '划过显示',
    tip: '滑过显示'
  },
  {
    type: 'toggle',
    label: '图标切换',
    icon: 'i-custom:refresh',
    icons: ['i-custom:refresh', 'i-custom:help']
  }
]
</script>
<template>
  <div class="democomponent__container">
    <h1>YButtonGroup</h1>
    <p>服务于YTable工具条的按钮组</p>
    <h2>基础用法</h2>
    <div class="example">
      <YButtonGroup class="barclass" :items="items"> 按钮 </YButtonGroup>
      <textarea class="code" disabled>
  <YButtonGroup class="barclass" :items="items"> 按钮 </YButtonGroup>
      
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
        <td>items</td>
        <td>按钮组配置</td>
        <td>YButtonGroupItem[]</td>
        <td>[]</td>
      </tr>
    </table>
    <h2>YButtonGroupItem</h2>
    <table class="table">
      <tr>
        <th>属性名</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>type</td>
        <td>事件类型供emit使用</td>
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
        <td>label</td>
        <td>名称</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>icon</td>
        <td>图标</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>help</td>
        <td>帮助提示</td>
        <td>string|string[]</td>
        <td></td>
      </tr>
      <tr>
        <td>auth</td>
        <td>按钮权限(与v-auth同理)</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>onClick</td>
        <td>自定义的点击事件</td>
        <td>()=>void</td>
        <td></td>
      </tr>
      <tr>
        <td>icons</td>
        <td>切换图标组,可与icon配合使用</td>
        <td>[string,string]</td>
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
        <td>click</td>
        <td>点击事件</td>
        <td>(type:YButtonGroupItem['type'])=>any</td>
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
