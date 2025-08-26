<script setup lang="ts">
import counter from '../customComponents/counter.vue'
import { ref } from 'vue'
import { getCookie } from '@/customFunctions/getCookie'
import { rounded } from '@/customFunctions/rounded'
const props = defineProps({
  article: { type: String, required: false },
  name: { type: String, required: false },
  manufacturer: { type: String, required: false },
  characterisic: { type: String, required: false },
  price: { type: Number },
  minQuantityForDiscount: { type: Number },
  discountPrice: { type: Number },
  image: { type: String },
  checked: { type: Boolean },
})
let currentPrice = ref(0)
let count = ref(Number(getCookie(String(props.article))))
count.value >= props.minQuantityForDiscount
  ? (currentPrice.value = props.discountPrice)
  : (currentPrice.value = props.price)

function removeItem() {
  count.value = 0
  document.cookie = props.article + '=' + count.value + ';path=/;'
}
</script>

<template>
  <div
    v-if="Number(getCookie(props.article)) > 0"
    class="shadow-lg laptop:shadow-none laptop:relative laptop:flex rounded-xl mb-5 laptop:bg-transparent bg-white h-fit p-2"
  >
    <div class="flex w-full justify-between tablet:justify-normal desktop:w-1/2">
      <input type="checkbox" :id="props.article" class="my-auto" :checked="props.checked" />
      <!-- TODO вот ширину картинки исправить надо -->
      <div
        class="px-3 py-5 h-full flex tablet:w-[120px] tablet:h-[132px] desktop:w-[254px] desktop:h-[254px] overflow-hidden"
      >
        <RouterLink class="desktop:w-full" :to="'cargo?data=' + props.article">
          <img
            class="w-[90px] shrink-0 bg-cover desctop:h-full desktop:w-full"
            src="https://www.zapcar.ru/upload/iblock/c25/kcx3rbgrf701zkufbuxgt9a3rff31cbr/1646407335_11_kartinkin_net_p_avtozapchasti_kartinki_13.png"
          />
        </RouterLink>
      </div>

      <article class="ml-4 relative tablet:w-full">
        <p class="label2 w-full text-main-textBlue">
          {{ props.article }}
        </p>
        <p class="p1 w-full text-main-textBlueDark">
          {{ props.name }}
        </p>
        <p class="label2 w-full text-main-textBlue">
          {{ props.manufacturer }}
        </p>
        <p class="label2 w-full text-main-textBlue mb-7">
          {{ props.characterisic }}
        </p>
        <div
          @click="removeItem()"
          class="deleteBusket bottom-0 right-0 absolute desktop:static"
        ></div>
      </article>
    </div>
    <hr class="h-px desktop:hidden my-2 w-full bg-gray-200" />
    <div
      class="flex w-full gap-4 justify-between laptop:w-[332px] laptop:absolute laptop:right-0 laptop:top-0 laptop:py-[18px]"
    >
      <div class="w-1/2 laptop:w-[196px] tablet:w-1/3 my-auto">
        <counter
          @click="count = parseInt(getCookie(String(props.article)))"
          :article="props.article"
        ></counter>
      </div>
      <div class="tablet:w-fit p-1 desktop:py-4 desktop:px-2">
        <p class="w-full text-main-textBlueDark text-center H8 font-bold">
          {{ rounded(Number(currentPrice * count)) + '₽' }}
        </p>
        <div
          class="flex pb-1 mt-1.5 text-main-textBlueDark w-full justify-center tablet:justify-end gap-2"
        >
          <p class="p1 tablet:text-right">
            {{ rounded(Number(currentPrice)) + '₽' }}
          </p>
          <p
            v-if="count >= props.minQuantityForDiscount"
            class="p1 tablet:text-right text-gray-500 line-through"
          >
            {{ rounded(Number(props.price)) + '₽' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.deleteBusket {
  height: 28px;
  width: 28px;
  background: no-repeat center
    url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgNkMwIDIuNjg2MjkgMi42ODYyOSAwIDYgMEgyMkMyNS4zMTM3IDAgMjggMi42ODYyOSAyOCA2VjIyQzI4IDI1LjMxMzcgMjUuMzEzNyAyOCAyMiAyOEg2QzIuNjg2MjkgMjggMCAyNS4zMTM3IDAgMjJWNloiIGZpbGw9IiNGMEY0RkEiLz4KPHBhdGggZD0iTTIxLjUgOC45ODM1NkMxOC43MjUgOC43MDg1NiAxNS45MzMzIDguNTY2ODkgMTMuMTUgOC41NjY4OUMxMS41IDguNTY2ODkgOS44NSA4LjY1MDIzIDguMiA4LjgxNjg5TDYuNSA4Ljk4MzU2IiBzdHJva2U9IiMyMjkxRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTExLjA4MzUgOC4xNDE1TDExLjI2NjggNy4wNDk4NEMxMS40MDAyIDYuMjU4MTcgMTEuNTAwMiA1LjY2NjUgMTIuOTA4NSA1LjY2NjVIMTUuMDkxOEMxNi41MDAyIDUuNjY2NSAxNi42MDg1IDYuMjkxNSAxNi43MzM1IDcuMDU4MTdMMTYuOTE2OCA4LjE0MTUiIHN0cm9rZT0iIzIyOTFGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTkuNzA4MiAxMS42MTY3TDE5LjE2NjUgMjAuMDA4NEMxOS4wNzQ4IDIxLjMxNjcgMTguOTk5OCAyMi4zMzM0IDE2LjY3NDggMjIuMzMzNEgxMS4zMjQ4QzguOTk5ODQgMjIuMzMzNCA4LjkyNDg0IDIxLjMxNjcgOC44MzMxNyAyMC4wMDg0TDguMjkxNSAxMS42MTY3IiBzdHJva2U9IiMyMjkxRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEyLjYwODQgMTcuNzVIMTUuMzgzNCIgc3Ryb2tlPSIjMjI5MUZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMS45MTY1IDE0LjQxNjVIMTYuMDgzMiIgc3Ryb2tlPSIjMjI5MUZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==');
}
</style>
