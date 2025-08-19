<script setup>
import searchIcon from '@/images/search-normal.svg'
import cusotomButton from './cusotomButton.vue'
import dropDownArrow from '@/images/downWhiteArrow.svg'
import DropdownField from './dropdownField.vue'
import { ref, watch } from 'vue'
import IconButton from './iconButton.vue'
import { useCatalogStore } from '@/store/catalog.js'

const props = defineProps({
  big: { type: Boolean, required: false },
  dataAr: { type: Array, required: false },
})

let width = ref(160)
const model = defineModel()
let dropdowwnShow = ref(false)
let divStyle = 'relative w-full tablet:w-[18.125rem] laptop:h-[52px] '
let inputStyle = ref(
  'w-full h-full rounded-full bg-gray-100 focus:border-gray-200 caret-blue-600 border-gray-200 input text-gray-800 placeholder:text-gray-400 ',
)
if (props.big) {
  divStyle = 'relative h-9 tablet:h-12 tablet:w-[31.5rem]'
  inputStyle.value +=
    'tablet:pr-[8.125rem] pr-11.25 desktop:pr-[8.4375rem] py-1 desktop:py-0.5 text-sm tablet:text-xl '
} else {
  inputStyle.value += ' items-center '
  width.value = 20
}

let selectedCategory = ref('Категории')
const catalogStore = useCatalogStore()
let searchArrayForShow = ref([])

function startsWithIgnoreCase(str, searchString) {
  return str.toLowerCase().startsWith(searchString.toLowerCase())
}

function fillSearchArray(dataToSeartch, searchFieldValue, counter) {
  let countItemsToShow = 5
  if (counter < countItemsToShow && !searchFieldValue) {
    return dataToSeartch
  } else if (
    counter < countItemsToShow &&
    startsWithIgnoreCase(dataToSeartch.name, searchFieldValue)
  ) {
    return dataToSeartch
  }
  return false
}

function getAllCargoPositions() {
  let ar = catalogStore.with_description
  let sorted = []
  // TODO требует рефакторинга
  if (selectedCategory.value != 'Категории') {
    Object.keys(catalogStore.categories[selectedCategory.value].sub).forEach((key) => {
      Object.keys(catalogStore.categories[selectedCategory.value].sub[key].cargo).forEach(
        (shortKey) => {
          let short = catalogStore.categories[selectedCategory.value].sub[key].cargo[shortKey]
          let beside = fillSearchArray(short, model.value, sorted.length)
          if (beside) {
            sorted.push(beside)
          }
          if (sorted.length < 5) {
            return sorted
          }
        },
      )
    })
  } else {
    ar.forEach((element) => {
      if (catalogStore.categories[element]) {
        Object.keys(catalogStore.categories[element].sub).forEach((key) => {
          Object.keys(catalogStore.categories[element].sub[key].cargo).forEach((key2) => {
            let short = catalogStore.categories[element].sub[key].cargo[key2]
            let beside = fillSearchArray(short, model.value, sorted.length)
            if (beside) {
              sorted.push(beside)
            }
            if (sorted.length < 5) {
              return sorted
            }
          })
        })
      }
    })
  }
  searchArrayForShow.value = sorted
}

function setShortText() {
  if (selectedCategory.value.length > 9) {
    return selectedCategory.value.slice(0, 7) + '...'
  } else return selectedCategory.value
}
// watch works directly on a ref
watch(model, () => {
  getAllCargoPositions()
})
</script>

<template>
  <div :class="divStyle">
    <input
      @change="getAllCargoPositions()"
      v-model="model"
      placeholder="Поиск по товарам"
      :style="{
        'padding-left': width + 'px',
      }"
      :class="inputStyle"
    />

    <cusotomButton
      id="custom"
      @click="
        () => {
          dropdowwnShow = !dropdowwnShow
        }
      "
      v-if="props.big"
      class="absolute left-0 w-[150px]"
      color="blue"
      :text="setShortText()"
      :iconSecond="dropDownArrow"
    >
    </cusotomButton>
    <RouterLink :to="href">
      <cusotomButton
        v-if="props.big"
        class="absolute tablet:visible tablet:inline-block hidden right-0 top-0 bottom-0"
        :iconSecond="searchIcon"
        color="black"
        @click="test()"
        text="Найти"
      ></cusotomButton>
      <IconButton
        v-if="props.big"
        class="absolute tablet:hidden visible inline-block right-0"
        icon="arrowRight"
        @click="test()"
        color="black"
      ></IconButton>
    </RouterLink>

    <DropdownField
      ref="myElement"
      @selectCategory="
        (item) => {
          selectedCategory = item
          getAllCargoPositions()
          dropdowwnShow = false
        }
      "
      :dataArr="props.dataAr"
      v-if="dropdowwnShow"
    ></DropdownField>
    <button v-if="!props.big" class="absolute right-5 top-0 bottom-0 w-fit flex">
      <RouterLink class="my-auto" :to="href"> <img :src="searchIcon" /></RouterLink>
    </button>
    <div v-if="model" class="bg-gray-100 mt-2 py-4 z-10 relative px-5 rounded-[1.25rem]">
      <p v-for="item in searchArrayForShow" v-bind:key="item.article" class="mb-4">
        <RouterLink
          :to="'/cargo?data=' + item.article"
          class="hover:underline button2 text-gray-700"
        >
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
