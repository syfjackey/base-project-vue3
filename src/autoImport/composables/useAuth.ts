import { useLoginStore } from '@/stores/useLoginStore'
/**
 * useAuth 权限验证
 * @returns hasAuth 是否具备权限
 */
export function useAuth() {
  const { auths } = useLoginStore()
  const hasAuth = (auth?: string | string[]) => {
    if (!auth) return true
    const checks = Array.isArray(auth) ? auth : [auth]
    return basicTools.hasIntersection(auths, checks)
  }
  return { hasAuth }
}
