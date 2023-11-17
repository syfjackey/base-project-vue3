<script setup lang="ts">
import YForm from '../YForm/index.vue'
import type { YSearchProps } from './component-type'
import { useExpand } from './tools'
defineOptions({ name: 'YSearch' })

const emit = defineEmits<{ search: [form: Record<string, any>]; reset: [] }>()
const props = withDefaults(defineProps<YSearchProps>(), {
  layout: () => ({ type: 'inline' }),
  isInitDict: true,
  foldGroup: () => [],
  immediate: true
})

const slots = computed(() => {
  return props.columns.filter((column) => column.type === 'slot')
})
type YFormType = InstanceType<typeof YForm>
const yFormRef = ref<YFormType>()

const search = async () => {
  await yFormRef.value!.validateForm()
  const form = yFormRef.value!.getForm()
  emit('search', form)
}
const reset = () => {
  yFormRef.value?.resetForm()
  emit('reset')
}

const { isExpandMode, expand, domRef, expandText, expandIcon } = useExpand(props.foldGroup)
onMounted(() => {
  props.immediate && search()
})
defineExpose({
  search,
  reset,
  expand
})
</script>
<template>
  <div class="ysearch__container" ref="domRef">
    <YForm
      :columns="props.columns"
      :isInitDict="isInitDict"
      ref="yFormRef"
      :labelWidth="labelWidth"
      :hideFoldGroup="true"
      :foldGroup="props.foldGroup"
      :layout="props.layout">
      <template #formGroup_0>
        <slot name="btns" :search="search" :reset="reset" :expand="expand">
          <div class="ysearch__container__btns">
            <YButton type="primary" @click="search()" icon="i-custom:search">查询</YButton>
            <YButton type="primary" @click="reset()" icon="i-custom:refresh">重置</YButton>
            <YButton type="primary" v-if="isExpandMode" @click="expand()" :icon="expandIcon">{{ expandText }}</YButton>
            <slot name="btnEnd"></slot>
          </div>
        </slot>
      </template>
      <template v-for="column in slots" :key="column.field" #[column.field]="{ data }">
        <slot :name="column.field" :data="data"></slot>
      </template>
    </YForm>
  </div>
</template>
<style lang="scss" scoped>
.ysearch__container {
  @apply w-100%  overflow-hidden box-border flex-none;
  /* 为了上下对称 */
  --yform-field-margin-bottom: 18px;
  border-radius: 4px;
  padding: var(--yform-field-margin-bottom) 0px 0;
  transition: height 0.5s;
  overflow: hidden;
  height: auto;
  &__btns {
    @apply box-fit flex overflow-hidden;
  }
}
</style>
