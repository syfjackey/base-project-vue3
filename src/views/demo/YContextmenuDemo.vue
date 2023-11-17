<script setup lang="ts">
import type { YContextmenuNode } from '@/autoImport/components/YContextmenu/component-type'
import { useContextMenu } from '@/autoImport/components/YContextmenu/tools'
const { visible, position, openContextMenu, clickItem } = useContextMenu<string>()

// clickItem 传入的数据
const contextmenus: YContextmenuNode[] = [
  {
    type: 'item',
    label: '一级右键菜单',
    eventType: '事件类型',
    icon: 'i-custom:close',
    shortcut: 'CTRL + C', // 需要自己实现
    onClick() {}
  },
  {
    type: 'item',
    label: '禁用',
    eventType: '事件类型',
    disabled: true,
    onClick() {}
  },
  {
    type: 'sperator',
    icon: 'i-custom:help'
  },
  {
    type: 'item',
    label: '主菜单',
    children: [
      {
        type: 'item',
        label: '二级菜单'
      }
    ]
  }
]
</script>
<template>
  <div class="democomponent__container">
    <h1>YContextmenu 右键菜单</h1>
    <p>右键菜单</p>
    <h2>基础用法</h2>
    <div class="example">
      <div @contextmenu="openContextMenu($event, '要传入的数据')">右键点我</div>
      <YContextmenu v-model="visible" v-model:position="position" :items="contextmenus"></YContextmenu>
      <textarea class="code" disabled>
 
        <YContextmenu v-model="visible" v-model:position="position" :items="contextmenus"></YContextmenu>
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
        <td>菜单项/分割符数组</td>
        <td>(YContextmenuSperator|YContextmenuItem)[]</td>
        <td>[]</td>
      </tr>
    </table>
    <h2>YContextmenuSperator 分隔符</h2>
    <table class="table">
      <tr>
        <th>属性名</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>type</td>
        <td>类型定义</td>
        <td>'sperator'</td>
        <td>'sperator'</td>
      </tr>
    </table>
    <h2>YContextmenuItem 菜单项</h2>
    <table class="table">
      <tr>
        <th>属性名</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>type</td>
        <td>类型定义</td>
        <td>'item'</td>
        <td>'item'</td>
      </tr>
      <tr>
        <td>label</td>
        <td>类型定义</td>
        <td>'item'</td>
        <td>'item'</td>
      </tr>
      <tr>
        <td>eventType</td>
        <td>emit类型</td>
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
        <td>shortcut</td>
        <td>快捷键</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>禁用</td>
        <td>boolean</td>
        <td></td>
      </tr>
      <tr>
        <td>onClick</td>
        <td>自定义点击事件</td>
        <td>()=>void</td>
        <td></td>
      </tr>
      <tr>
        <td>children</td>
        <td>类型定义</td>
        <td>(YContextmenuSperator|YContextmenuItem)[]</td>
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
        <td>(type:YContextmenuItem['eventType'])=>any</td>
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
