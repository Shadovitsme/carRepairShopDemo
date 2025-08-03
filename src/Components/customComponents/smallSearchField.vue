<script setup>
import searchIcon from '@/images/search-normal.svg'
import cusotomButton from './cusotomButton.vue'
import dropDownArrow from '@/images/downWhiteArrow.svg'
import DropdownField from './dropdownField.vue'
import { ref } from 'vue'
import IconButton from './iconButton.vue'
let width = ref(140)

const props = defineProps({
  big: { type: Boolean, required: false },
  dataAr: { type: Array, required: false },
})
let dropdowwnShow = ref(false)
let divStyle = 'relative w-full tablet:w-[18.125rem] laptop:h-[52px] '
let inputStyle = ref(
  'w-full h-full rounded-full bg-gray-100 focus:border-gray-200 caret-blue-600 border-gray-200 input text-gray-800 placeholder:text-gray-400 ',
)
if (props.big) {
  divStyle = 'relative tablet:w-[31.5rem] h-11 tablet:h-16 laptop:h-[52px] desktop:h-[64px]'
  inputStyle.value += 'tablet:pr-[8.125rem] pr-11.25 desktop:pr-[8.4375rem] py-1 desktop:py-0.5'
} else {
  inputStyle.value += 'pl-4 pr-0.5 py-6 '
}
</script>

<template>
  <div :class="divStyle">
    <input @input="upCaseWord" placeholder="Поиск по товарам" :style="{
      'padding-left': width + 'px',
    }" :class="inputStyle" />

    <cusotomButton id="custom" @click="dropdowwnShow = !dropdowwnShow" v-if="props.big"
      class="absolute my-1 tablet:my-2 tablet:left-2 left-1" color="blue" text="find" :iconSecond="dropDownArrow">
    </cusotomButton>
    <RouterLink :to="href">
      <cusotomButton v-if="props.big" class="absolute my-2 tablet:visible tablet:inline-block hidden right-2"
        :iconSecond="searchIcon" color="black" text="Найти"></cusotomButton>
      <IconButton v-if="props.big" class="absolute tablet:hidden visible inline-block my-1 right-1" icon="phone"
        color="black"></IconButton>
    </RouterLink>

    <DropdownField ref="myElement" @click="getEl" :dataArr="props.dataAr" v-if="dropdowwnShow"></DropdownField>
    <button v-if="!props.big" class="absolute right-5 mt-3.5">
      <RouterLink :to="href"> <img :src="searchIcon" /></RouterLink>
    </button>
    <div v-if="show" class="bg-gray-100 mt-2 py-4 px-5 rounded-[1.25rem]">
      <p v-for="item in categoryNames" v-bind:key="item.article" class="mb-4">
        <RouterLink :to="'/cargo?data=' + item.article" class="hover:underline button2 text-gray-700">
          {{ item.name }}
        </RouterLink>
      </p>
      <hr class="h-0.25 bg-gray-200" />
      <p class="mt-4">
        <RouterLink class="text-gray-700 button2" :to="href"> Показать все </RouterLink>
      </p>
    </div>
  </div>
</template>
<style></style>
