<script setup>
import logo from '@/images/Logo.svg'
import cusotomButton from '../customComponents/cusotomButton.vue'
import call from '@/images/call.svg'
</script>

<template>
  <!-- TODO использовать vh чтоб подвал не упидорашивало наверх -->
  <div
    class="static border-t border-gray-200 bottom-0 w-full max-w-[1920px] mx-auto bg-white h-61 pt-12 px-4.5 pb-16 tablet:px-8 desktop:px-[7.3125rem]"
  >
    <div class="desktop:h-[6.25rem] tablet:h-[20.5rem] h-121 desktop:flex justify-between w-full">
      <RouterLink to="/"><img class="h-6 mb-9" :src="logo" alt="" /></RouterLink>
      <div class="tablet:flex justify-between tablet:gap-x-[10.0625rem] desktop:gap-x-[14.6875rem]">
        <div class="desktop:flex justify-between mb-9 tablet:mb-0 desktop:gap-x-[14.6875rem]">
          <div class="">
            <RouterLink to="/categoryCatalog" class="button2 mb-6 text-main-black"
              >Каталог</RouterLink
            >
          </div>
          <div class="">
            <RouterLink to="/404" class="button2 mb-6 text-main-black">Проверить 404</RouterLink>
          </div>
          <!-- TODO сделать видимым когда появится собственно эти разделы -->
          <div class="hidden">
            <p class="button2 mb-6 text-main-black">Политика конфиденциальности</p>
            <p class="button2 mb-6 text-main-black">Договор оферты</p>
          </div>
        </div>

        <div class="w-fit">
          <p class="p2 desktop:mb-3 mb-4 tablet:ml-[1.40625rem] text-gray-500">Служба поддержки</p>
          <p class="tablet:ml-[0.8125rem] desktop:mb-3 mb-5 flex p2 text-gray-500">
            Пн-Пт с 10:00 до 17:00
          </p>
          <a href="tel:+79876543210">
            <cusotomButton
              class="tablet:ml-2 desktop:ml-0"
              :iconFirst="call"
              color="blue"
              text="+7 987 654-32-10"
          /></a>
        </div>
      </div>
      <div
        class="desktop:hidden visible block tablet:flex h-8 mt-9 desktop:h-15 tablet:h-3 desktop:mb-0 mb-12 justify-between"
      >
        <p class="p2 my-auto text-gray-500">© 2025 | Все права защищены</p>
        <a href="https://github.com/shadovitsme" class="p2 my-auto text-gray-500"
          >Вёрстка от Ukki</a
        >
      </div>
    </div>
    <div
      class="desktop:visible desktop:flex hidden h-8 mt-9 desktop:h-15 tablet:h-3 desktop:mb-0 mb-12 justify-between"
    >
      <p class="p2 my-auto text-gray-500">© 2025 | Все права защищены</p>
      <a href="https://github.com/shadovitsme" class="p2 my-auto text-gray-500">Вёрстка от Ukki</a>
    </div>
  </div>
</template>
