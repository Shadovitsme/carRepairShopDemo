<script setup>
import { ref, watch } from 'vue'
import MobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import Header from '@/Components/multiComponents/HeaderComponent.vue'
import cusotomButton from '@/Components/customComponents/cusotomButton.vue'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import CheckboxButton from '@/Components/customComponents/checkboxButton.vue'
import ArrowButton from '@/Components/customComponents/arrowButton.vue'
import iconButton from '@/Components/customComponents/iconButton.vue'
import AboutCargo from '@/Components/customComponents/aboutCargo.vue'
import { getCookie } from '@/customFunctions/getCookie'
import { rounded } from '@/customFunctions/rounded'
import { useRoute } from 'vue-router'
import { useCatalogStore } from '@/store/catalog'
import { storeToRefs } from 'pinia'

const switchChecked = ref(true)
const bigImgNum = ref(1)
const art = ref(useRoute().params.art)

const { getCargo } = storeToRefs(useCatalogStore())

let price
let countImg
let counted = ref(0)
let toBusk = ref(false)
let discount = ref(true)
let discountPrice = ref(0)
let minQuantityForDiscount = ref(0)

function AddOneItem() {
  counted.value++
  document.cookie = art.value + '=' + counted.value + ';path=/;'
}

function RemoveOne() {
  counted.value--
  if (counted.value <= 0) {
    counted.value = 0
    toBusk.value = true
  }
  document.cookie = art.value + '=' + counted.value + ';path=/;'
}

function addToBusket() {
  toBusk.value = false
  counted.value = 1
  document.cookie = art.value + '=' + counted.value + ';path=/;'
}
const currentPrice = ref(0)
price = getCargo.value(art.value).price
currentPrice.value = getCargo.value(art.value).price
counted.value = getCookie(String(art.value))
toBusk.value = !(counted.value > 0)
minQuantityForDiscount.value = getCargo.value(art.value).min_discount_quantity
discountPrice.value = rounded((price / 100) * getCargo.value(art.value).discount_price)

const summ = ref(rounded(price * counted.value))
watch(counted, (newValue) => {
  if (newValue >= minQuantityForDiscount.value) {
    summ.value = rounded(discountPrice.value * counted.value)
    currentPrice.value = discountPrice.value
    discount.value = false
  } else {
    summ.value = rounded(price * counted.value)
    currentPrice.value = price
  }
})
</script>
<template>
  <div class="w-full max-w-[1630px] mx-auto">
    <Header :mainPage="false"></Header>

    <div class="w-full mt-10 px-[18px] desktop:px-[118px]">
      <!-- детально о товаре-->
      <!-- карточка товара -->
      <div class="desktop:h-[480px] mx-auto mb-8">
        <div class="tablet:flex h-full">
          <div
            v-if="countImg > 1"
            class="h-full laptop:visible laptop:block hidden desktop:w-[98px] laptop:w-[143px] overflow-auto"
          >
            <button
              @click="bigImgNum = n"
              v-for="n in countImg"
              :key="n"
              :id="n"
              class="h-[145px] w-full border flex rounded-xl mb-2 border-gray-200"
            >
              <img
                :id="n"
                class="my-auto w-full"
                src="https://www.zapcar.ru/upload/iblock/c25/kcx3rbgrf701zkufbuxgt9a3rff31cbr/1646407335_11_kartinkin_net_p_avtozapchasti_kartinki_13.png"
              />
            </button>
          </div>
          <!-- большая картинка -->
          <div
            class="rounded-[20px] h-full w-full laptop:w-[307px] desktop:w-[334px] relative border mr-0 tablet:mr-5 desktop:mr-12 laptop:ml-5 border-gray-200 flex"
          >
            <div v-if="countImg > 1" class="absolute w-full h-full flex justify-between p-1">
              <ArrowButton
                :left="true"
                v-if="countImg > 1"
                @click="bigImgNum > 1 ? bigImgNum-- : (bigImgNum = countImg)"
                class="my-auto"
              ></ArrowButton>
              <ArrowButton
                @click="bigImgNum < countImg ? bigImgNum++ : (bigImgNum = 1)"
                v-if="countImg > 1"
                class="my-auto"
              ></ArrowButton>
            </div>

            <img
              class="my-auto w-full"
              src="https://www.zapcar.ru/upload/iblock/c25/kcx3rbgrf701zkufbuxgt9a3rff31cbr/1646407335_11_kartinkin_net_p_avtozapchasti_kartinki_13.png"
            />
          </div>
          <div class="desktop:flex">
            <AboutCargo
              class="laptop:hidden"
              :manufacturer="getCargo(art).manufacturer"
              :name="getCargo(art).name"
              :characteristic="getCargo(art).characteristic"
              :colorArr="getCargo(art).color"
            ></AboutCargo>

            <!-- priceCard -->
            <div
              class="bg-white rounded-[20px] desktop:absolute right-[118px] w-full desktop:w-[448px] h-fit shadow-lg tablet:p-8 p-6 pb-[26px] tablet:hidden"
            >
              <div class="flex mb-3">
                <p class="H2 text-gray-800 mr-2">
                  {{ currentPrice + ' ₽' }}
                </p>
                <p
                  v-if="counted >= getCargo(art).min_discount_quantity"
                  class="H2 text-gray-300 line-through"
                >
                  {{ getCargo(art).price + ' ₽' }}
                </p>
                <p class="p2 text-gray-400 ml-2 mt-1 tablet:mt-3">за 1 шт.</p>
              </div>
              <div
                v-if="getCargo(art).discount && getCargo(art).min_discount_quantity > counted"
                class="w-fit flex justify-between mb-5"
              >
                <div class="p-3 bg-green-500 rounded-lg">
                  <p class="text-white break-keep H4 font-bold">
                    {{ (getCargo(art).discount_price, +' ₽') }}
                  </p>
                </div>
                <p class="my-auto ml-2 max-w-[163px] text-center break-words text-gray-400 p1">
                  {{ 'при покупке от ' + getCargo(art).min_discount_quantity + ' шт.' }}
                </p>
              </div>
              <cusotomButton
                v-if="toBusk"
                @click="addToBusket"
                color="blue"
                text="В корзину"
                class="w-full"
              />

              <div v-if="!toBusk" class="tablet:flex justify-between w-full">
                <RouterLink href="/busket">
                  <cusotomButton
                    color="blue"
                    text="Перейти в корзину"
                    class="tablet:mr-2 w-full mb-3 tablet:mb-0"
                  />
                </RouterLink>

                <div class="flex justify-between">
                  <iconButton
                    icon="-"
                    color="black"
                    @click="RemoveOne"
                    class="my-auto"
                  ></iconButton>
                  <div
                    class="bg-white h-10 py-2 tablet:py-3 flex border mx-1 border-gray-300 rounded-full w-full tablet:w-[86px]"
                  >
                    <p class="text-gray-500 input mx-auto">
                      {{ counted }}
                    </p>
                  </div>
                  <iconButton
                    icon="+"
                    color="black"
                    @click="AddOneItem"
                    class="my-auto"
                  ></iconButton>
                </div>
              </div>

              <div class="w-full flex">
                <p class="mt-2 p2 text-gray-800 mx-auto">Доставим сегодня</p>
              </div>
              <div v-if="counted > 0">
                <hr class="my-4" />
                <p class="p2 text-gray-800 mb-3">Общая стоимость</p>
                <div class="flex gap-5">
                  <p class="H2 text-gray-800">
                    {{ summ + ' ₽' }}
                  </p>
                  <p
                    v-if="counted >= getCargo(art).min_discount_quantity"
                    class="H2 text-gray-300 line-through"
                  >
                    {{ getCargo(art).price * counted + ' ₽' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- выбор цвета -->
            <AboutCargo
              class="hidden laptop:visible laptop:block"
              :manufacturer="getCargo(art).manufacturer"
              :name="getCargo(art).name"
              :characteristic="getCargo(art).characteristic"
              :colorArr="getCargo(art).color"
            >
            </AboutCargo>
          </div>
        </div>
        <!-- priceCard -->
        <div
          class="bg-white rounded-[20px] desktop:absolute top-[180px] right-[118px] w-full desktop:w-[500px] h-fit shadow-lg tablet:p-8 p-6 pb-[26px] tablet:visible tablet:block hidden laptop:visible"
        >
          <div class="flex mb-3">
            <p class="H2 text-gray-800 mr-2">
              {{ currentPrice + ' ₽' }}
            </p>
            <p
              v-if="counted >= getCargo(art).min_discount_quantity"
              class="H2 text-gray-300 line-through"
            >
              {{ price + ' ₽' }}
            </p>
            <p class="p2 text-gray-400 ml-2 mt-1 tablet:mt-3">за 1 шт.</p>
          </div>
          <div v-if="getCargo(art).discount" class="w-fit flex justify-between mb-5">
            <div class="p-3 bg-green-500 rounded-lg">
              <p class="text-white break-keep H4 font-bold">
                {{ getCargo(art).discount_price + ' ₽' }}
              </p>
            </div>
            <p class="my-auto ml-2 min-w-[163px] text-center break-words text-gray-400 p1">
              {{ 'при покупке от ' + getCargo(art).min_discount_quantity + ' шт.' }}
            </p>
          </div>
          <cusotomButton
            v-if="toBusk"
            @click="addToBusket"
            color="blue"
            text="В корзину"
            class="w-full"
          />

          <div v-if="!toBusk" class="tablet:flex justify-between w-full">
            <RouterLink href="/busket">
              <cusotomButton
                color="blue"
                text="Перейти в корзину"
                class="tablet:mr-2 w-full mb-3 tablet:mb-0"
              />
            </RouterLink>

            <div class="flex justify-between">
              <iconButton icon="-" color="black" @click="RemoveOne" class="my-auto"></iconButton>
              <div
                class="bg-white h-10 tablet:h-[46px] py-2 tablet:py-3 flex border mx-1 border-gray-300 rounded-full w-full tablet:w-[86px]"
              >
                <p class="text-gray-500 input mx-auto">
                  {{ counted }}
                </p>
              </div>
              <iconButton icon="+" color="black" @click="AddOneItem" class="my-auto"></iconButton>
            </div>
          </div>

          <div class="w-full flex">
            <p class="mt-3 p2 text-gray-800 mx-auto">Доставим сегодня</p>
          </div>
          <div v-if="counted > 0">
            <hr class="my-4" />
            <p class="p2 text-gray-800 mb-3">Общая стоимость</p>
            <div class="flex gap-5">
              <p class="H2 text-gray-800">
                {{ summ + ' ₽' }}
              </p>
              <p
                v-if="counted >= getCargo(art).min_discount_quantity"
                class="H2 text-gray-300 line-through"
              >
                {{ getCargo(art).price * counted + ' ₽' }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Описание и характеристика -->
      <div class="desktop:h-[244px] mb-6">
        <div class="flex mb-5">
          <CheckboxButton
            :hug="true"
            :checked="switchChecked"
            @click="switchChecked = !switchChecked"
            class="mr-2 w-fit"
            :dark="true"
            text="Характеристики"
            id="char"
          ></CheckboxButton>

          <CheckboxButton
            :hug="true"
            :checked="!switchChecked"
            @click="switchChecked = !switchChecked"
            :dark="true"
            class="w-fit"
            text="Описание"
            id="describtion"
          ></CheckboxButton>
        </div>
        <div v-if="switchChecked">
          <div class="flex">
            <p class="p1 text-gray-500">Артикул: &nbsp;</p>
            <p class="p1 text-gray-700">{{ getCargo(art).article }}</p>
          </div>
          <div class="flex">
            <p class="p1 text-gray-500">Характеристика: &nbsp;</p>
            <p class="p1 text-gray-700">{{ getCargo(art).characteristic }}</p>
          </div>
          <div class="flex">
            <p class="p1 text-gray-500">Размер: &nbsp;</p>
            <p class="p1 text-gray-700">{{ getCargo(art).size }}</p>
          </div>

          <div class="flex">
            <p class="p1 text-gray-500">Страна производства: &nbsp;</p>
            <p class="p1 text-gray-700">{{ getCargo(art).country }}</p>
          </div>
          <div class="flex">
            <p class="p1 text-gray-500">Цвет: &nbsp;</p>
            <p
              v-for="item in categoryNames"
              :key="item.article"
              class="p1 text-gray-700 inline-block"
            >
              {{ item.color }}
            </p>
          </div>
        </div>
        <div v-else>
          <p class="p1 text-gray-600">{{ getCargo(art).description }}</p>
        </div>
      </div>
    </div>
    <MobileNavbar></MobileNavbar>

    <Footer></Footer>
  </div>
</template>
