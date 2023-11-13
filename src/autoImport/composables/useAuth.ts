import { useLoginStore } from '@/stores/useLoginStore'
/**
 * useAuth 权限验证
 * @returns hasAuth 是否具备权限
 */
export function useAuth() {
  const { auths } = useLoginStore()
  const hasAuth = (auth?: string) => {
    return !auth || auths.includes(auth)
  }
  return { hasAuth }
}
