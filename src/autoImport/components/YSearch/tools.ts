// @unocss-include
export function useExpand(list: any[]) {
  const isExpandMode = list.length > 0
  const isExpand = ref(false)
  const domRef = ref<HTMLDivElement>()
  const expandText = computed(() => {
    return isExpand.value ? '折叠' : '展开'
  })
  const expandIcon = computed(() => {
    return isExpand.value ? 'i-custom:arrow-up' : 'i-custom:arrow-down'
  })
  let isSetHeight = false
  const expand = () => {
    isExpand.value = !isExpand.value
    const groupDoms: NodeListOf<HTMLDivElement> = domRef.value!.querySelectorAll('.yform__container__group')
    groupDoms.forEach((dom, i) => {
      if (i !== 0) {
        const height = dom.dataset.height || `${dom.scrollHeight}px` || 'auto'
        dom.style.height = isExpand.value ? height : '0px'
      }
    })
    setGroupHeight(groupDoms)
  }
  const setGroupHeight = (groupDoms: NodeListOf<HTMLDivElement>) => {
    if (isSetHeight || !isExpand.value) return
    groupDoms.forEach((dom, i) => {
      if (i !== 0) {
        dom.dataset.height = dom.style.height
      }
    })
    isSetHeight = true
  }
  return { isExpandMode, expandText, isExpand, expandIcon, expand, domRef }
}
