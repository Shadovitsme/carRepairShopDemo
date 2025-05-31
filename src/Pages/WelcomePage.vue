<script setup>
import Header from '@/Components/multiComponents/HeaderComponent.vue'
import categoryCatalog from '@/Components/multiComponents/categoryCatalog.vue'
import CusotomButton from '@/Components/customComponents/cusotomButton.vue'
import arrowRight from '@/images/whiteRightArrow.svg'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import MobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import smallSearchField from '@/Components/customComponents/smallSearchField.vue'
import CarSection from '@/Components/multiComponents/carSection.vue'
import { useCatalogStore } from '@/store/catalog'

const store = useCatalogStore()

const categories = store.categories
</script>

<template>
  <div class="bg-blue-100">
    <div class="w-full max-w-[1920px] mx-auto">
      <Header :mainPage="true"></Header>

      <!-- приветствие -->
      <div class="w-full desktop:h-[686px]">
        <div class="w-full flex relative justify-end">
          <div
            class="desktop:top-[140px] top-[85px] tablet:top-[100px] desktop:w-fit tablet:w-[170px] w-[146px] absolute desktop:right-[134.22px] tablet:right-[30px] right-[18px] rotate-[8deg] desktop:rotate-[5deg] z-20 bg-white flex py-0.5 h-[54px] tablet:px-[23px] px-[3.5px] rounded-[20px]"
          >
            <p class="p1 text-center desktop:h-5 desktop:align-top my-auto">
              Бесплатно в течение дня
            </p>
          </div>
        </div>
        <div
          class="desktop:mx-[165px] mx-[18px] mt-[140px] tablet:mx-[32px] desktop:mt-[194px] tablet:mt-[150px] mb-[254.5px]"
        >
          <p class="H1 text-center desktop:mb-[52px] tablet:mb-6 mb-5">
            <span class="text-blue-400">Оперативно</span> доставляем товары для кузовного ремонта
            <span class="text-blue-400">по Москве</span>
          </p>
          <div class="flex justify-center">
            <smallSearchField :dataAr="store.data" :big="true"></smallSearchField>
          </div>
        </div>
      </div>

      <!-- каталог категорий -->
      <div
        class="w-full h-full bg-white pt-[37px] px-[18px] desktop:px-[118px] pb-10 desktop:pb-[100px]"
      >
        <div class="flex w-full h-[46px] mb-9 justify-between">
          <p class="my-auto H4 text-gray-800">Каталог</p>
          <RouterLink to="/categoryCatalog">
            <CusotomButton
              class="my-auto"
              color="black"
              text="Открыть каталог"
              :iconSecond="arrowRight"
            ></CusotomButton
          ></RouterLink>
        </div>
        <categoryCatalog :categoryNames="categories"></categoryCatalog>
      </div>

      <CarSection></CarSection>
      <MobileNavbar></MobileNavbar>

      <Footer></Footer>
    </div>
  </div>
</template>
