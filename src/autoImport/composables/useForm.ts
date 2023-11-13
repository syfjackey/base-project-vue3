import type { FormInstance } from 'element-plus'
/**
 * useForm
 * @description 基于ElementPlus的表单验证
 *
 * @param { } success 验证通过回调
 * @param { } error 验证未通过回调
 *
 * @return  formRef 表单Ref
 * @return validateForm  验证函数
 */
export function useForm(error?: () => void, success?: () => void) {
  const formRef = ref<FormInstance>()
  const validateForm = async (): Promise<boolean> => {
    if (!formRef.value) return Promise.reject(false)
    const isValidate = await formRef.value?.validate().catch(() => false)
    if (isValidate) {
      success?.()
      return Promise.resolve(true)
    } else {
      error?.()
      return Promise.reject(false)
    }
  }
  return { formRef, validateForm }
}
