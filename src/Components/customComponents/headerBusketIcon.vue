<script setup>
import { ref } from 'vue'
import iconButton from './iconButton.vue'
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
  <RouterLink class="relative" to="/busket">
    <div v-if="cargoCount > 0" class="rounded-full flex bg-pink-600 absolute left-7 p-1 bottom-9">
      <p class="label2 m-auto text-main-white">{{ cargoCount }}</p>
    </div>
    <iconButton
      icon="busket"
      color="blue"
      class="my-auto hidden desktop:visible desktop:block"
    ></iconButton>
  </RouterLink>
</template>
