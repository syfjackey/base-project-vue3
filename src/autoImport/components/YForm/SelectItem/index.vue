<script setup lang="ts">
import type { YFormDictType, YFormSelectItemProps } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormSelectItem' })
interface ComponentProps extends YFormDictType {
  props?: YFormSelectItemProps['props']
  event?: YFormSelectItemProps['event']
}
const modelValue = defineModel<any>({ required: true })
const props = withDefaults(defineProps<ComponentProps>(), { bindDictValue: 'value', props: () => ({}), event: () => ({}) })
const { getDictByYFormDict } = useDict()
const dictList = ref<DictItem[]>([])
const initDicts = async () => {
  dictList.value = await getDictByYFormDict(props.dict)
}
watch(() => props.dict, initDicts, { immediate: true })
const getValue = (item: DictItem) => {
  return props.bindDictValue === 'item' ? item : item[props.bindDictValue]
}
</script>
<template>
  <el-select
    class="w-100%"
    v-model="modelValue"
    placeholder="请选择..."
    clearable
    filterable
    value-key="value"
    v-bind="props.props"
    v-on="props.event">
    <el-option v-for="(item, i) in dictList" :key="i" :label="item.label" :value="getValue(item)" />
  </el-select>
</template>
<style lang="scss" scoped></style>
