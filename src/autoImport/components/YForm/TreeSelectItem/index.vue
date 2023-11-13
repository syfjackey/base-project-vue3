<script setup lang="ts">
import type { YFormDictType, YFormTreeSelectItemProps } from '../componet-type'
import { getValueBy, reflexDicts } from '../tools'

defineOptions({ inheritAttrs: false, name: 'YFormTreeSelectItem' })
interface ComponentProps extends YFormDictType {
  props?: YFormTreeSelectItemProps['props']
  event?: YFormTreeSelectItemProps['event']
}
const modelValue = defineModel<any>({ required: true })
const props = withDefaults(defineProps<ComponentProps>(), { bindDictValue: 'value', props: () => ({}), event: () => ({}) })
const { getDictByYFormDict } = useDict()
const dictList = ref<DictItem[]>([])
const initDicts = async () => {
  dictList.value = await getDictByYFormDict(props.dict)
}
watch(() => props.dict, initDicts, { immediate: true })
const field = computed({
  set(val: any) {
    const list = reflexDicts(dictList.value, val, 'value')
    modelValue.value = getValueBy(list, props.bindDictValue)
  },
  get() {
    const list = reflexDicts(dictList.value, modelValue.value, props.bindDictValue)
    return getValueBy(list, 'value')
  }
})
</script>
<template>
  <el-tree-select class="w-100%" v-model="field" :data="dictList" value-key="value" v-bind="props.props" v-on="props.event" />
</template>
<style lang="scss" scoped></style>
