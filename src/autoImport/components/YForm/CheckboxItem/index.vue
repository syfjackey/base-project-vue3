<script setup lang="ts">
import type { ConvertProps, YFormCheckboxItemProps, YFormDictType } from '../componet-type'
import { getValueBy, reflexDicts } from '../tools'

defineOptions({ inheritAttrs: false, name: 'YFormCheckboxItem' })
interface ComponentProps extends YFormDictType {
  props?: ConvertProps<YFormCheckboxItemProps['props']>
  event?: YFormCheckboxItemProps['event']
}
const modelValue = defineModel<DictValue[] | DictItem[]>({ required: true, default: [] })
const props = withDefaults(defineProps<ComponentProps>(), {
  bindDictValue: 'value',
  props: () => ({}),
  event: () => ({})
})

const { getDictByYFormDict } = useDict()
const dictList = getDictByYFormDict<DictItem[]>(toRef(props.dict))

const field = computed({
  set(val: string[] | number[]) {
    const list = reflexDicts(dictList.value, val, 'value')
    modelValue.value = getValueBy(list, props.bindDictValue)
  },
  get() {
    if (!Array.isArray(modelValue.value)) return []
    const list = reflexDicts(dictList.value, modelValue.value, props.bindDictValue) || []
    return getValueBy(list, 'value') as string[] | number[]
  }
})
</script>
<template>
  <el-checkbox-group class="w-100%" v-model="field" v-bind="props.props" v-on="props.event">
    <el-checkbox v-for="(item, i) in dictList" :key="i" :label="item.value">{{ item.label }}</el-checkbox>
  </el-checkbox-group>
</template>
<style lang="scss" scoped></style>
