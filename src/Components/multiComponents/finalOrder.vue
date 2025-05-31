<script setup>
import FinalOrderAmountCard from '../customComponents/finalOrderAmountCard.vue'
import OrderedCargoCard from '../customComponents/orderedCargoCard.vue'
import { getCookie } from '@/customFunctions/getCookie'
import { rounded } from '@/customFunctions/rounded'

const props = defineProps({
  cargoCount: { type: String, required: true },
  discount: { type: String, required: true },
  amount: { type: String, required: true },
  summWithoutDiscount: { type: String, required: true },
  cargoArray: { type: Array, required: true },
})

const phone = localStorage.getItem('phone')
const street = localStorage.getItem('street')
const build = localStorage.getItem('build')
const district = localStorage.getItem('district')
const room = localStorage.getItem('room')

function checkDiscount(article, discountQuantity, discountPrice, price) {
  let count = Number(getCookie(String(article)))
  if (count >= discountQuantity) {
    return rounded((price - (price / 100) * discountPrice) * count)
  }
  return rounded(price * count)
}
</script>
<template>
  <div class="px-4.5 mt-9 mb-20">
    <p class="H3 text-gray-800 mb-7">Ваш заказ создан</p>
    <p class="mb-7 text-gray-800 p1">Наш менеджер свяжется с вами в ближайшее время.</p>
    <div class="flex gap-2 mb-4.5">
      <div class="arrowLeftIcon h-5 w-5"></div>
      <p class="p1 text-gray-800">Ваш телефон:</p>
      <p class="p1 text-gray-800 font-bold">{{ phone }}</p>
    </div>
    <div class="flex gap-2 mb-7">
      <div class="arrowLeftIcon h-5 w-5"></div>
      <p class="p1 text-gray-800">Адрес доставки:</p>
      <p class="p1 text-gray-800 font-bold">
        {{ street + ' ' + build + ' ' + district + ' ' + room }}
      </p>
    </div>
    <FinalOrderAmountCard
      :cargo-counted="props.cargoCount"
      :summ-without-discount="props.summWithoutDiscount"
      :summ="amount"
      :discount="discount"
    ></FinalOrderAmountCard>
    <p class="H4 text-gray-800 my-7">
      Состав заказа
      <span class="align-top text-gray-600 p1">{{ props.cargoCount }}</span>
    </p>
    <div class="grid grid-cols-2 gap-5">
      <OrderedCargoCard
        v-for="item in props.cargoArray"
        :key="item.article"
        :img="item.img"
        :article="item.article"
        :manufacturer="item.manufacturer"
        :characteristic="item.characteristic"
        :name="item.name"
        :cargo-counted="Number(getCookie(String(item.article)))"
        :price="rounded(Number(item.price))"
        :discount-price="rounded(Number(item.discountPrice))"
        :summ="
          checkDiscount(item.article, item.minQuantityForDiscount, item.discountPrice, item.price)
        "
      >
      </OrderedCargoCard>
    </div>
  </div>
</template>
