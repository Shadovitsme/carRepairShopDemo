<script setup>
import CusotomButton from '@/Components/customComponents/cusotomButton.vue'
import MobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import Header from '@/Components/multiComponents/HeaderComponent.vue'
</script>
<template>
  <Header></Header>
  <div class="w-full px-4.5 mt-6 tablet:px-8 tablet:mt-7 desktop:px-29.25 laptop:flex">
    <div class="w-full desktop:my-auto">
      <p class="H1 mb-6">Возникла ошибка</p>
      <p class="p1 mb-6">Кажется, что‑то пошло не так! Но совсем скоро мы всё отремонтируем.</p>
      <RouterLink to="/">
        <CusotomButton class="w-full tablet:w-fit" color="blue" text="На главную"></CusotomButton
      ></RouterLink>
    </div>
  </div>
  <Footer class="hidden tablet:block"></Footer>
  <MobileNavbar></MobileNavbar>
</template>
