<script setup lang="ts">
import { getOAuthToken } from '@/api/oauth'
import { useLoginStore } from '@/stores/useLoginStore'

const query: { redirect?: string; [key: string]: any } = useRoute().query
const { callbackType, enable } = globalConfig.oAuthConfig || { enable: false }
const code = callbackType ? (query[callbackType] as string) : ''
const router = useRouter()
const { loginIn } = useLoginStore()
const isError = ref(false)
const toLogin = async () => {
  try {
    const { token } = await getOAuthToken(code)
    if (!token) {
      isError.value = true
    } else {
      loginIn(token, basicTools.getEncoded(query.redirect))
    }
  } catch (error) {
    isError.value = true
  }
}

if (!enable || !code) {
  router.replace('/login')
} else {
  toLogin()
}
const redirectLogin = () => {
  router.replace('/login')
}
</script>
<template>
  <div class="page__loader__container">
    <div class="page__loader__dom"></div>
    <div class="error__tip" v-if="isError" @click="redirectLogin">登录失败,尝试重新登录</div>
  </div>
</template>
<style lang="scss" scoped>
.error__tip {
  cursor: pointer;
  color: #fff;
  margin-top: 30px;
}
</style>
