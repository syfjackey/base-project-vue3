<script setup lang="ts">
import type { YFormColumn } from '@/autoImport/components/YForm/componet-type'

const columns: YFormColumn[] = [
  {
    field: 'input',
    label: '输入框',
    type: 'input',
    props: {
      placeholder: '传参参照对应的elementPlus表单组件'
    },
    rules: {
      type: 'string',
      required: true,
      message: '必填'
    }
  },
  {
    field: 'textarea',
    label: '输入框',
    type: 'textarea',
    help: '带字段解释'
  },
  {
    field: 'cascader',
    label: '级联选择器',
    type: 'cascader',
    dict: 'cascader',
    event: {
      change() {
        console.log('监听改变')
      }
    }
  },
  {
    field: 'checkbox',
    label: '复选框',
    type: 'checkbox',
    dict: 'sex'
  },
  {
    field: 'date',
    label: '日期',
    type: 'date',
    width: 300
  },
  {
    field: 'dateRange',
    label: '日期范围',
    type: 'dateRange'
  },
  {
    field: 'dateRangeWithFieldMap',
    label: '日期范围(带映射)',
    type: 'dateRange',
    fieldMap: ['dateRangeStart', 'dateRangeEnd']
  },
  {
    field: 'dateRangeWithConvert',
    label: '日期范围(带转换)',
    type: 'dateRange',
    convertValue: ','
  },
  {
    field: 'dates',
    label: '日期多选',
    type: 'dates'
  },
  {
    field: 'datesWithConvert',
    label: '日期多选',
    type: 'dates',
    convertValue: ','
  },
  {
    field: 'datetime',
    label: '日期时分秒',
    type: 'datetime'
  },
  {
    field: 'datetimeRange',
    label: '日期时分秒范围',
    type: 'datetimeRange'
  },
  {
    field: 'datetimeRange',
    label: '日期时分秒范围',
    type: 'datetimeRange'
  },
  {
    field: 'month',
    label: '月份',
    type: 'month'
  },
  {
    field: 'monthRange',
    label: '月范围',
    type: 'monthRange'
  },
  {
    field: 'number',
    label: '数字',
    type: 'number',
    props: {
      min: 0,
      max: 100
    }
  },
  {
    field: 'numberRange',
    label: '数字范围',
    type: 'numberRange'
  },
  {
    field: 'password',
    label: '密码框',
    type: 'password'
  },
  {
    field: 'radio',
    label: '单选',
    type: 'radio',
    dict: 'sex'
  },
  {
    field: 'select',
    label: '下拉框',
    type: 'select',
    dict: 'sex'
  },
  {
    field: 'slider',
    label: '滑块',
    type: 'slider'
  },
  {
    field: 'switch',
    label: '切换',
    type: 'switch'
  },
  {
    field: 'time',
    label: '时分秒',
    type: 'time'
  },
  {
    field: 'timeRange',
    label: '时分秒范围',
    type: 'timeRange'
  },
  {
    field: 'treeSelect',
    label: '时分秒范围',
    type: 'treeSelect',
    dict: 'cascader'
  },
  {
    field: 'week',
    label: '周',
    type: 'week'
  },
  {
    field: 'year',
    label: '年',
    type: 'year'
  },
  {
    field: 'diySlot',
    label: '插槽',
    type: 'slot'
  }
]
const form = ref()
const foldGroup: string[][] = [['input', 'textarea']]
</script>
<template>
  <div class="democomponent__container">
    <h1>YForm 表单</h1>
    <p>通过配置项 显示表单 继承elForm 相关属性</p>
    <p>建议不要使用v-model绑定表单,此示例仅为展示</p>
    <h2>基础用法</h2>
    <div class="example">
      {{ form }}
      <YForm v-model="form" label-width="120px" :columns="columns">
        <template #diySlot="{ data }">
          <el-input v-model="data.modelValue"></el-input>
        </template>
      </YForm>
      <textarea class="code" disabled></textarea>
    </div>
    <h2>行内布局,需自行定义表单宽度</h2>
    <div class="example">
      <YForm :columns="columns" :layout="{ type: 'inline' }">
        <template #diySlot="{ data }">
          <el-input v-model="data.modelValue"></el-input>
        </template>
      </YForm>
    </div>
    <h2>grid布局</h2>
    <div class="example">
      <YForm :columns="columns" :layout="{ type: 'grid', cols: 4 }">
        <template #diySlot="{ data }">
          <el-input v-model="data.modelValue"></el-input>
        </template>
      </YForm>
    </div>
    <h2>表单分组</h2>
    <div class="example">
      <YForm :columns="columns" :layout="{ type: 'grid', cols: 4 }" :fold-group="foldGroup">
        <template #diySlot="{ data }">
          <el-input v-model="data.modelValue"></el-input>
        </template>
      </YForm>
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
        <td>[]</td>
      </tr>
      <tr>
        <td>isInitDict</td>
        <td>是否初始化字典项</td>
        <td>boolean</td>
        <td>true</td>
      </tr>
      <tr>
        <td>foldGroup</td>
        <td>表单分区</td>
        <td>string[][]</td>
        <td></td>
      </tr>
      <tr>
        <td>hideFoldGroup</td>
        <td>隐藏非第一分组的其他表单分组</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>layout</td>
        <td>布局</td>
        <td>FormLayout</td>
        <td></td>
      </tr>
      <tr>
        <td>form</td>
        <td>赋值表单,根据转换之后形成的对象赋值</td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <h2>YFormColumn 表单类型</h2>
    <table class="table">
      <tr>
        <th>属性名</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>field</td>
        <td>绑定字段</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>label</td>
        <td>显示名称</td>
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
        <td>show</td>
        <td>显示隐藏</td>
        <td>boolean | ((form?: any) => boolean)</td>
        <td></td>
      </tr>
      <tr>
        <td>span</td>
        <td>当布局为grid时,占据几列</td>
        <td>number</td>
        <td>1</td>
      </tr>
      <tr>
        <td>rules</td>
        <td>验证规则</td>
        <td>参考elForm规则</td>
        <td></td>
      </tr>
      <tr>
        <td>event</td>
        <td>绑定事件</td>
        <td>根据不同表单项绑定不同事件,最后一个值为表单对象</td>
        <td>最后一个参数为表单数据</td>
      </tr>
      <tr>
        <td>width</td>
        <td>表单宽度</td>
        <td>string|width</td>
        <td></td>
      </tr>
      <tr>
        <td>type</td>
        <td>表单类型</td>
        <td>见ts提示</td>
        <td></td>
      </tr>
      <tr>
        <td>defaultValue</td>
        <td>默认值</td>
        <td>any</td>
        <td></td>
      </tr>
      <tr>
        <td>props</td>
        <td>表单项传参</td>
        <td>根据不同表单项传不同参数</td>
        <td>disabled 支持ref类型</td>
      </tr>

      <tr>
        <td>dict</td>
        <td>字典类型(仅部分表单类型可用)</td>
        <td>string | DictItem[] | Ref&#60;string&#62;</td>
        <td>当为Ref类型时,自动监听变化</td>
      </tr>

      <tr>
        <td>bindDictValue</td>
        <td>绑定值类型(对象,名称,值)</td>
        <td>'item' | 'label' | 'value'</td>
        <td></td>
      </tr>
      <tr>
        <td>fieldMap</td>
        <td>字段映射 .比如范围型表单</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>convertValue</td>
        <td>值数组转换为字符串 .比如范围型表单</td>
        <td>boolean|string</td>
        <td>','</td>
      </tr>
    </table>
    <h2>FormLayout 布局类型</h2>
    <table class="table">
      <tr>
        <th>属性名</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>type</td>
        <td>布局样式</td>
        <td>'inline' | 'grid'</td>
        <td>'grid'</td>
      </tr>
      <tr>
        <td>gap</td>
        <td>间隔</td>
        <td>number | string</td>
        <td>0</td>
      </tr>
      <tr>
        <td>cols</td>
        <td>几列 仅grid生效</td>
        <td>number</td>
        <td>1</td>
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
        <td>validateForm</td>
        <td>验证表单</td>
        <td>() => Promise</td>
        <td></td>
      </tr>
      <tr>
        <td>updateForm</td>
        <td>更新表单,键值对更新,或者 对象部分更新</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>updateFormByRelation</td>
        <td>根据转换后的真实表单进行赋值</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>resetForm</td>
        <td>重置表单</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>getForm</td>
        <td>获取表单( 映射之后的表单)</td>
        <td></td>
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
        <td>formStart</td>
        <td>表单头部插槽</td>
      </tr>
      <tr>
        <td>formEnd</td>
        <td>表单尾部插槽</td>
      </tr>
      <tr>
        <td>formGroup_${i}</td>
        <td>分组插槽</td>
      </tr>
      <tr>
        <td>formSeparator_${i}</td>
        <td>分组间隔插槽</td>
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
