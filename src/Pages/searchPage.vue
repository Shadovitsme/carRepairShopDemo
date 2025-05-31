<script setup>
import Header from '@/Components/multiComponents/HeaderComponent.vue'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import { ref } from 'vue'
import cargoCard from '@/Components/customComponents/cargoCard.vue'
import MobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import SortPanel from '@/Components/customComponents/sortPanel.vue'
import { getDb } from './ajaxes/db'
function alfabetSortAsc() {
  categoryNames.value = categoryNames.value.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    }
    if (a.name == b.name) {
      return 0
    }
    return -1
  })
}

function alfabetSortDesc() {
  categoryNames.value = categoryNames.value.sort((a, b) => {
    if (a.name < b.name) {
      return 1
    }
    if (a.name === b.name) {
      return 0
    }

    return -1
  })
}

function priceSortDesc() {
  categoryNames.value = categoryNames.value.sort((a, b) => {
    return Math.sign(a.price - b.price)
  })
}

function priceSortAsc() {
  categoryNames.value = categoryNames.value.sort((a, b) => {
    return -Math.sign(a.price - b.price)
  })
}
</script>

<script>
const categoryNames = ref()
export default {
  mounted() {
    categoryNames.value = getDb()
  },
}
</script>
<template>
  <div class="w-full max-w-[1630px] mx-auto">
    <Header :mainPage="false"></Header>
    <div class="w-full h-full mb-[100px] bg-white pt-[37px] px-[118px] mb-">
      <div class="flex w-full h-[46px] mb-8 justify-between">
        <p class="H2 text-gray-800">Результаты поиска</p>
        <SortPanel
          @alfabetSortAsc="alfabetSortAsc()"
          @alfabetSortDesc="alfabetSortDesc()"
          @priceSortAsc="priceSortAsc()"
          @priceSortDesc="priceSortDesc()"
        ></SortPanel>
      </div>
      <div v-if="categoryNames" class="grid grid-cols-4 gap-x-5 gap-y-5">
        <cargoCard
          v-for="item in categoryNames"
          :key="item.article"
          :description="item.description"
          :price="item.price + ' ₽'"
          :cargo-name="item.name"
          :article="item.article"
          :brand="item.brand"
          :image="item.image + '/1.webp'"
        ></cargoCard>
      </div>
    </div>
    <MobileNavbar></MobileNavbar>

    <Footer></Footer>
  </div>
</template>
