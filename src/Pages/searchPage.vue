<script setup>
import { ref } from 'vue'
import { useCatalogStore } from '@/store/catalog'
import { useRoute } from 'vue-router'
import Header from '@/Components/multiComponents/HeaderComponent.vue'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import cargoCard from '@/Components/customComponents/cargoCard.vue'
import MobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import SortPanel from '@/Components/customComponents/sortPanel.vue'
import alfabetSortAsc from '@/customFunctions/alfabetSortAsc'
import alfabetSortDesc from '@/customFunctions/alfabetSortDesc'
import priceSortDesc from '@/customFunctions/priceSortDesc'
import priceSortAsc from '@/customFunctions/priceSortAsk'

// variables
const catalogStore = useCatalogStore()
const sub = ref(useRoute().params)
let searchArrayForShow = ref([])
getAllCargoPositions()

function startsWithIgnoreCase(str, searchString) {
  return str.toLowerCase().startsWith(searchString.toLowerCase())
}

function fillSearchArray(dataToSeartch, searchFieldValue) {
  if (!searchFieldValue) {
    return dataToSeartch
  } else if (startsWithIgnoreCase(dataToSeartch.name, searchFieldValue)) {
    return dataToSeartch
  }
  return false
}

// TODO придумать как избавиться от этих функций и вызывать готовые сразу на уровне темплейта

function getAllCargoPositions() {
  let ar = catalogStore.with_description
  let sorted = []
  let selectCategory = sub.value.category
  // TODO требует рефакторинга
  if (selectCategory != 'Категории') {
    Object.keys(catalogStore.categories[selectCategory].sub).forEach((key) => {
      Object.keys(catalogStore.categories[selectCategory].sub[key].cargo).forEach((shortKey) => {
        let short = catalogStore.categories[selectCategory].sub[key].cargo[shortKey]
        let beside = fillSearchArray(short, sub.value.searchName)
        if (beside) {
          sorted.push(beside)
        }
      })
    })
  } else {
    ar.forEach((element) => {
      if (catalogStore.categories[element]) {
        Object.keys(catalogStore.categories[element].sub).forEach((key) => {
          Object.keys(catalogStore.categories[element].sub[key].cargo).forEach((key2) => {
            let short = catalogStore.categories[element].sub[key].cargo[key2]
            let beside = fillSearchArray(short, sub.value.searchName)
            if (beside) {
              sorted.push(beside)
            }
          })
        })
      }
    })
  }
  searchArrayForShow.value = sorted
}

function alfabetSortAscSearchPage() {
  searchArrayForShow.value = alfabetSortAsc(searchArrayForShow.value, 'name')
}

function alfabetSortDescSearchPage() {
  searchArrayForShow.value = alfabetSortDesc(searchArrayForShow.value, 'name')
}

function priceSortDescSearchPage() {
  searchArrayForShow.value = priceSortDesc(searchArrayForShow.value)
}

function priceSortAscSearchPage() {
  searchArrayForShow.value = priceSortAsc(searchArrayForShow.value)
}
</script>

<template>
  <div class="w-full max-w-[1630px] mx-auto">
    <Header :mainPage="false"></Header>
    <div class="w-full h-full mb-[100px] bg-white pt-[37px] px-[118px] mb-">
      <div class="flex w-full h-[46px] mb-8 justify-between">
        <p class="H2 text-gray-800">Результаты поиска</p>
        <SortPanel
          @alfabetSortAsc="alfabetSortAscSearchPage()"
          @alfabetSortDesc="alfabetSortDescSearchPage()"
          @priceSortAsc="priceSortAscSearchPage()"
          @priceSortDesc="priceSortDescSearchPage()"
        ></SortPanel>
      </div>
      <div v-if="searchArrayForShow" class="grid grid-cols-4 gap-x-5 gap-y-5">
        <cargoCard
          v-for="item in searchArrayForShow"
          :key="item.article"
          :href="'/cargo/' + item.type + '/' + item.sub_type + '/' + item.article"
          :description="item.description"
          :price="item.price + ' ₽'"
          :cargo-name="item.name"
          :article="item.article"
          :brand="item.brand"
          :image="item.image + '/1.webp'"
        >
        </cargoCard>
      </div>
    </div>
    <MobileNavbar></MobileNavbar>

    <Footer></Footer>
  </div>
</template>
