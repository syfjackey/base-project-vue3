<script setup lang="ts">
import type { YButtonProps } from './component-type'
defineOptions({ inheritAttrs: false, name: 'YButton' })
const props = defineProps<YButtonProps>()
const attrs = useAttrs()
const slots = useSlots()
const { hasAuth } = useAuth()
const onClick = attrs.onClick as () => void
const btnProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, confirm, tip, auth, ...bProps } = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onClick, ...oProps } = attrs
  return { ...bProps, ...oProps }
})
const disabled = computed(() => {
  return !(props.tip || props.confirm || slots.content)
})
const trigger = computed(() => {
  if (props.trigger) return props.trigger
  if (props.confirm) return 'click'
  return 'hover'
})
const visible = ref(false)
const popClick = () => {
  visible.value = false
  onClick?.()
}
const btnClick = () => {
  if (props.confirm) return
  onClick?.()
}
</script>
<template>
  <el-popover v-model:visible="visible" placement="top" width="auto" :disabled="disabled" :trigger="trigger" v-if="hasAuth(props.auth)">
    <slot name="content">
      <div v-if="props.tip">{{ props.tip }}</div>
      <div v-else-if="props.confirm">
        <span class="mr-16px">{{ props.confirm }} </span><el-button size="small" type="primary" @click="popClick()">确定</el-button>
      </div>
    </slot>
    <template #reference>
      <el-button v-bind="btnProps" @click="btnClick()">
        <template #icon v-if="props.icon"> <YIcon :icon="props.icon"></YIcon> </template>
        <slot></slot>
      </el-button>
    </template>
  </el-popover>
</template>
