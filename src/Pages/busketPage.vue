<script setup>
import { ref } from 'vue'
import CusotomButton from '@/Components/customComponents/cusotomButton.vue'
import BusketItemCard from '@/Components/multiComponents/busketItemCard.vue'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import Header from '@/Components/multiComponents/HeaderComponent.vue'
import { getCookie } from '@/customFunctions/getCookie'
import mobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import BusketFinalPriceCard from '@/Components/customComponents/busketFinalPriceCard.vue'
import CategoryCatalog from '@/Components/multiComponents/categoryCatalog.vue'
import { getUniqCategories } from './ajaxes/getUniqCategories'
import { rounded } from '@/customFunctions/rounded'
import ModalWindowAddOrder from '@/Components/multiComponents/modalWindowAddOrder.vue'
import FinalOrder from '@/Components/multiComponents/finalOrder.vue'
import { getDb } from './ajaxes/db'

let modalVisible = ref(false)
function toggleModal() {
  modalVisible.value = !modalVisible.value
}
function checkCookieWithoutLetters() {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const cookieName = cookie.split('=')[0].trim()
    if (/^[^a-zA-Z]*$/.test(cookieName) && Number(getCookie(cookieName)) > 0) {
      return true
    }
  }
  return false
}

let selectAll = ref(true)

function selectAllItems() {
  selectAll.value = !selectAll.value
  cargoResult.value.forEach((element) => {
    document.getElementById(element.article).checked = selectAll.value
  })
}

function countSummWithoutDiscount() {
  allCount.value = 0
  summWithDiscount.value = 0
  summWithoutDiscount.value = 0
  currentSumm.value = 0
  let isAllChecked = true
  cargoResult.value.forEach((element) => {
    isAllChecked = isAllChecked && document.getElementById(element.article).checked
    let articleCount = Number(getCookie(element.article))
    if (articleCount > 0 && document.getElementById(element.article).checked) {
      allCount.value += articleCount
      summWithDiscount.value +=
        element.minQuantityForDiscount <= articleCount ? element.discountPrice * articleCount : 0
      summWithoutDiscount.value += element.price * articleCount
      currentSumm.value +=
        articleCount < element.minQuantityForDiscount
          ? articleCount * element.price
          : articleCount * element.discountPrice
    }
  })
  selectAll.value = isAllChecked
}
let Final = ref(false)
function openOrderResult() {
  toggleModal()
  hidden.value = 'hidden'
  Final.value = true
}

let hidden = ref('')

countSummWithoutDiscount()
</script>

<script>
let cargoResult = ref([])
let uniqCategories = getUniqCategories()
let allCount = ref(0)
let summWithDiscount = ref(0)
let summWithoutDiscount = ref(0)
let currentSumm = ref(0)

export default {
  mounted() {
    const cookies = document.cookie.split(';')
    const result = []
    for (let cookie of cookies) {
      const [cookieName] = cookie.split('=').map((c) => c.trim())
      if (/^[^a-zA-Z]*$/.test(cookieName)) {
        result.push(cookieName)
      }
    }
    const categoryNames = ref()

    result.forEach((element) => {
      let counted = Number(getCookie(String(element)))
      if (counted > 0) {
        categoryNames.value = getDb()
        let name = categoryNames.value[0].cargo[0].name
        let img = categoryNames.value[0].cargo[0].image + '/1.webp'
        let price = categoryNames.value[0].cargo[0].price
        let characteristic = categoryNames.value[0].cargo[0].graduation
        let manufacturer = categoryNames.value[0].cargo[0].brand

        let minQuantityForDiscount = categoryNames.value[0].cargo[0].min_discount_quantity
        let discountPrice = (price / 100) * categoryNames.value[0].cargo[0].discountPrice

        allCount.value = allCount.value + counted
        summWithDiscount.value +=
          counted >= minQuantityForDiscount ? price * counted - discountPrice * counted : 0
        summWithoutDiscount.value += price * counted
        currentSumm.value +=
          counted < minQuantityForDiscount ? counted * price : counted * discountPrice

        cargoResult.value.push({
          article: element,
          img: img,
          name: name,
          picture: img,
          price: price,
          discountPrice: discountPrice,
          characteristic: characteristic,
          manufacturer: manufacturer,
          count: counted,
          minQuantityForDiscount: minQuantityForDiscount,
        })
      }
    })
  },
}
</script>

<template>
  <Header :main-page="false"></Header>

  <div v-if="!Final">
    <!-- для пустой корзины -->
    <div
      v-if="!checkCookieWithoutLetters()"
      class="bg-blue-100 px-[42px] py-24 laptop:py-[152.5px] desktop:py-20 flex"
    >
      <div class="w-[276px] tablet:w-83.5 m-auto laptop:w-fit">
        <article>
          <p class="H3 text-center text-gray-800 laptop:font-bold">В корзине пока пусто</p>
          <p
            class="p1 text-center my-5 tablet:w-[276px] mx-auto text-gray-800 laptop:w-96 laptop:my-10"
          >
            Загляните в каталог, чтобы выбрать товары или найдите нужное в поиске
          </p>
        </article>
        <!-- TODO менять надпись на кнопке при изменении размера экрана -->
        <div class="w-full flex justify-center">
          <RouterLink to="/categoryCatalog">
            <CusotomButton
              class="w-full laptop:w-[137px]"
              color="blue"
              text="В каталог"
            ></CusotomButton>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="desktop:w-full desktop:flex desktop:px-[117px]">
      <div class="w-full">
        <div
          class="px-4.5 desktop:px-0 laptop:px-8 pb-36 desktop:pb-0"
          v-if="checkCookieWithoutLetters()"
        >
          <div class="flex my-4">
            <p class="H1 text-gray-800 mr-1">Корзина</p>
            <p class="align-top label2 text-gray-600">
              {{ allCount }}
            </p>
          </div>
          <div class="flex gap-1">
            <input type="checkbox" @click="selectAllItems()" :checked="selectAll" />
            <p class="p2 text-gray-900">Выбрать всё</p>
          </div>
          <div class="">
            <BusketItemCard
              @click="countSummWithoutDiscount()"
              v-for="item in cargoResult"
              :key="item.article"
              :checked="true"
              :article="item.article"
              :name="item.name"
              :characterisic="item.characteristic"
              :manufacturer="item.manufacturer"
              :price="item.price"
              :discountPrice="item.discountPrice"
              :minQuantityForDiscount="item.minQuantityForDiscount"
              :image="item.img"
            ></BusketItemCard>
          </div>
        </div>
      </div>
      <div
        v-if="checkCookieWithoutLetters()"
        class="laptop:px-8 laptop:w-full desktop:px-0 desktop:w-fit desktop:ml-20"
      >
        <!-- TODO скидка неверно считается исправить -->
        <BusketFinalPriceCard
          @openModal="toggleModal"
          :summ="rounded(currentSumm)"
          :discount="rounded(summWithDiscount)"
          :summWithoutDiscount="rounded(summWithoutDiscount)"
          :cargo-counted="allCount"
        ></BusketFinalPriceCard>
      </div>
    </div>
    <div
      class="py-4 px-4.5 laptop:px-8 desktop:px-29.25 laptop:py-10 desktop:py-20 tv:px-40"
      v-if="!checkCookieWithoutLetters()"
    >
      <p class="my-auto H4 text-gray-800 mb-4 font-bold desktop:mb-10">
        Возможно, для вас актуальны
      </p>
      <CategoryCatalog :categoryNames="uniqCategories"></CategoryCatalog>
    </div>
  </div>
  <mobileNavbar></mobileNavbar>

  <div
    v-if="modalVisible"
    class="fixed top-0 bottom-0 left-0 right-0 backdrop-brightness-[0.8] z-30 flex"
  >
    <ModalWindowAddOrder
      :cargoResult="cargoResult"
      @closeModal="toggleModal"
      @openOrderResult="openOrderResult"
    >
    </ModalWindowAddOrder>
  </div>
  <FinalOrder
    :cargo-array="cargoResult"
    :cargo-count="allCount"
    :discount="rounded(summWithDiscount)"
    :summWithoutDiscount="rounded(summWithoutDiscount)"
    :amount="rounded(currentSumm)"
    v-if="Final"
  ></FinalOrder>
  <Footer class="hidden laptop:block"></Footer>
</template>
