<script setup lang="ts">
import type { CascaderOption } from 'element-plus'
import { getValueBy, reflexDicts } from '../tools'
import type { YFormCascaderItemProps, YFormDictType } from '../componet-type'

defineOptions({ inheritAttrs: false, name: 'YFormCascaderItem' })
interface ComponentProps extends YFormDictType {
  props?: YFormCascaderItemProps['props']
  event?: YFormCascaderItemProps['event']
}
const modelValue = defineModel<any>({ required: true, default: '' })
const props = withDefaults(defineProps<ComponentProps>(), { bindDictValue: 'value', props: () => ({}), event: () => ({}) })
const { getDictByYFormDict } = useDict()
const dictList = ref<CascaderOption[]>([])
const initDicts = async () => {
  dictList.value = (await getDictByYFormDict(props.dict)) as CascaderOption[]
}
const cascaderProps = computed(() => {
  return { emitPath: false, ...props.props?.props }
})

watch(() => props.dict, initDicts, { immediate: true })

const field = computed<any>({
  set(val) {
    const list = reflexDicts(dictList.value as DictItem[], val, 'value')
    modelValue.value = getValueBy(list, props.bindDictValue)
  },
  get() {
    const list = reflexDicts(dictList.value as DictItem[], modelValue.value, props.bindDictValue) || []
    return getValueBy(list, 'value')
  }
})
</script>
<template>
  <el-cascader
    class="w-100%"
    v-model="field"
    placeholder="请选择..."
    :options="dictList"
    clearable
    :show-all-levels="false"
    filterable
    v-bind="props.props"
    v-on="props.event"
    :props="cascaderProps">
  </el-cascader>
</template>
<style lang="scss" scoped></style>
