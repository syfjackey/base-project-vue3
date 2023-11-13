<script setup lang="ts">
import type { YFormDictType, YFormRadioItemProps } from '../componet-type'
import { getValueBy, reflexDicts } from '../tools'

defineOptions({ inheritAttrs: false, name: 'YFormRadioItem' })
interface ComponentProps extends YFormDictType {
  props?: YFormRadioItemProps['props']
  event?: YFormRadioItemProps['event']
}
const modelValue = defineModel<DictValue | DictItem | undefined>({ required: true })
const props = withDefaults(defineProps<ComponentProps>(), { bindDictValue: 'value', props: () => ({}), event: () => ({}) })
const { getDictByYFormDict } = useDict()
const dictList = ref<DictItem[]>([])
const initDicts = async () => {
  dictList.value = await getDictByYFormDict(props.dict)
}
watch(() => props.dict, initDicts, { immediate: true })

const field = computed({
  set(val: string | number) {
    const dict = reflexDicts(dictList.value, val, 'value')
    modelValue.value = getValueBy(dict, props.bindDictValue)
  },
  get() {
    const dict = reflexDicts(dictList.value, modelValue.value, props.bindDictValue)
    return getValueBy(dict, 'value') as string | number
  }
})
</script>
<template>
  <el-radio-group class="w-100%" v-model="field" v-bind="props.props" v-on="props.event">
    <el-radio v-for="(item, i) in dictList" :key="i" :label="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>
<style lang="scss" scoped></style>
