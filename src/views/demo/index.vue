<script setup lang="ts">
const router = useRouter()
const go = (path: string) => router.push(path)
</script>
<template>
  <div class="demo__container">
    <div class="demo__container__left">
      <div>内置组件</div>
      <ul>
        <li @click="go('/demo/YBar')">YBar</li>
        <li @click="go('/demo/YButton')">YButton</li>
        <li @click="go('/demo/YButtonGroup')">YButtonGroup</li>
        <li @click="go('/demo/YContainer')">YContainer</li>
        <li @click="go('/demo/YContextmenu')">YContextmenu</li>
        <li @click="go('/demo/YDictLabel')">YDictLabel</li>
        <li @click="go('/demo/YForm')">YForm</li>
        <li @click="go('/demo/YHelp')">YHelp</li>
        <li @click="go('/demo/YIcon')">YIcon</li>
        <li @click="go('/demo/YPageTable')">YPageTable</li>
        <li @click="go('/demo/YRouteTab')">YRouteTab</li>
        <li @click="go('/demo/YSearch')">YSearch</li>
        <li @click="go('/demo/YTable')">YTable</li>
      </ul>
    </div>
    <div class="demo__container__right">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.demo__container {
  @apply w-100% h-100% overflow-hidden flex;
  &__left {
    @apply h-100% w-260px overflow-auto;
    border-right: solid 1px #eee;
    padding-right: 40px;
    div {
      font-weight: bold;
      padding: 0.35rem 1.5rem 0.35rem 2rem;
    }
    ul {
      margin: 0;
      padding: 0 0 0 1rem;
    }
    li {
      padding: 0.35rem 1.5rem 0.35rem 2rem;
      line-height: 1.4;
      font-size: 1rem;
      font-weight: 400;
      list-style: none;
      cursor: pointer;
      &:hover {
        text-decoration: none;
        color: #3eaf7c;
      }
    }
  }
  &__right {
    @apply flex-fit-w h-100% overflow-hidden;
    padding-left: 40px;
  }
}
</style>
