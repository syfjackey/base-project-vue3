<script setup lang="ts">
import { loginApp, type LoginForm_AParams } from '@/api/login'
import videoSrc from '@/assets/images/login/login_bg.mp4'
import { useLoginStore } from '@/stores/useLoginStore'
interface UrlParams {
  redirect?: string
  token?: string
  username?: string
  password?: string
}
const { redirect, token, username, password } = useRoute().query as UrlParams
const { formRef, validateForm } = useForm()
const { loginIn } = useLoginStore()
const form = ref<LoginForm_AParams>({ username: '', password: '' })
const loading = ref(false)
const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const autoLogin = () => {
  if (username && password) {
    ElMessage.success({
      message: '正在尝试登录,请稍后!'
    })
    loginFn({ username, password })
  } else if (token) {
    ElMessage.success({
      message: '正在尝试登录,请稍后!'
    })
    loginIn(token, redirect)
  }
}
autoLogin()
const loginFn = async (form: LoginForm_AParams) => {
  loading.value = true
  const { token } = await loginApp(form).finally(() => (loading.value = false))
  loginIn(token, basicTools.getEncoded(redirect))
}
const submit = async () => {
  await validateForm()
  loginFn(form.value)
}
</script>
<template>
  <div class="login__container">
    <video
      :src="videoSrc"
      class="login__container__bg"
      autoplay="true"
      muted="true"
      loop
      controlsList="nodownload"
      disablePictureInPicture></video>
    <div class="login__container__header"></div>
    <div class="login__container__main">
      <div class="login__container__form">
        <div class="login__container__form__title">欢迎登录</div>
        <div class="login__container__form__content">
          <el-form :model="form" :rules="rules" ref="formRef">
            <el-form-item prop="username">
              <div class="login__container__form__input username">
                <input v-model="form.username" placeholder="请输入账号/邮箱" />
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="login__container__form__input password">
                <input v-model="form.password" placeholder="请输入密码" type="password" @keyup.enter="submit()" />
              </div>
            </el-form-item>
          </el-form>
          <el-button type="primary" :loading="loading" class="w-100%" @click="submit()" @keyup.enter="submit()"> 登录 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login__container {
  @apply flex-h box-fit-hidden;
  background-position: center;
  &__bg {
    @apply absolute z-0 object-fill;
  }

  &__header {
    @apply bg-no-repeat bg-cover z-2;
    height: 7.1875rem;
    background-position: center top;
  }

  &__main {
    @apply relative box-fit-hidden;
  }

  &__form {
    width: 25rem;
    height: 29.75rem;
    background: url(@/assets/images/login/login_form.png);
    @apply bg-no-repeat bg-contain absolute right-12% top-18% box-border;
    padding: 1.875rem 2.8125rem;

    &__title {
      @apply text-center font-bold;
      font-size: 1.75rem;
      color: #fefeff;
      margin-top: 2.875rem;
      margin-bottom: 1.375rem;
    }

    &__input {
      @apply box-border flex flex-items-center w-100%;
      height: 3rem;
      padding-left: 2.5rem;
      margin-top: 1.5rem;

      input {
        @apply outline-none border-none w-100% box-border bg-transparent;
        padding: 1rem;
        color: #409eff;

        &::placeholder {
          color: #ccc;
        }
      }

      &.username {
        background: url(@/assets/images/login/login_password.png);
        @apply bg-cover bg-no-repeat;
      }

      &.password {
        background: url(@/assets/images/login/login_password.png);
        @apply bg-cover bg-no-repeat;
      }
    }
  }
}
</style>
