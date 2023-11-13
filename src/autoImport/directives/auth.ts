import { useLoginStore } from '@/stores/useLoginStore'
import type { Directive, DirectiveBinding } from 'vue'

const Auth: Directive<Element> = {
  mounted(el: Element, binding: DirectiveBinding<string[] | string>) {
    const { value } = binding
    if (!value) return
    const checkAuths = Array.isArray(value) ? value : [value]
    if (checkAuths.length === 0) return
    const { auths } = useLoginStore()
    const ownAuths: string[] = auths
    if (ownAuths.length === 0) return
    const hasAuth = basicTools.hasIntersection(ownAuths, checkAuths)
    if (!hasAuth) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
export default Auth
