<script setup>
import NavBarIcon from './navBarIcon.vue'
import { ref } from 'vue'
import { getCookie } from '@/customFunctions/getCookie'
let cargoCount = ref(0)
function checkCookieWithoutLetters() {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const cookieName = cookie.split('=')[0].trim()
    if (/^[^a-zA-Z]*$/.test(cookieName) && Number(getCookie(cookieName)) > 0) {
      cargoCount.value = cargoCount.value + Number(getCookie(cookieName))
    }
  }
}
checkCookieWithoutLetters()
</script>
<template>
  <div
    class="flex justify-between px-7 pt-1.5 pb-1 bg-white fixed bottom-0 w-full tablet:px-24 tablet:pt-3.5 tablet:pb-3 laptop:hidden"
  >
    <NavBarIcon icon="home" text="Главная"></NavBarIcon>
    <NavBarIcon icon="catalog" text="Каталог"></NavBarIcon>
    <NavBarIcon icon="search" text="Поиск"></NavBarIcon>
    <div class="relative">
      <div
        v-if="cargoCount > 0"
        class="rounded-full flex bg-green-500 absolute left-9 p-1 bottom-10"
      >
        <p class="label2 m-auto text-main-white">{{ cargoCount }}</p>
      </div>
      <NavBarIcon icon="busket" text="Корзина"></NavBarIcon>
    </div>
  </div>
</template>
