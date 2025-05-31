<script setup>
import Header from '@/Components/multiComponents/HeaderComponent.vue'
import categoryCatalog from '@/Components/multiComponents/categoryCatalog.vue'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import MobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import SortPanel from '@/Components/customComponents/sortPanel.vue'
import { useCatalogStore } from '@/store/catalog'
import { storeToRefs } from 'pinia'

function alfabetSortAsc() {
  categoryNames.value = categoryNames.value.sort((a, b) => {
    if (a.type > b.type) {
      return 1
    }
    if (a.type == b.type) {
      return 0
    }
    return -1
  })
}

function alfabetSortDesc() {
  categoryNames.value = categoryNames.value.sort((a, b) => {
    if (a.type < b.type) {
      return 1
    }
    if (a.type === b.type) {
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

const catalogStore = useCatalogStore()
const categoryNames = storeToRefs(catalogStore).categories
</script>
<template>
  <div class="w-full max-w-[1630px] mx-auto">
    <Header :mainPage="false"></Header>

    <!-- каталог категорий -->
    <div class="w-full h-full mb-[100px] bg-white pt-[37px] px-4.5 laptop:px-8 desktop:px-29.25">
      <div class="flex w-full h-[46px] mb-8 justify-between">
        <p class="H2 text-gray-800">Каталог</p>
        <SortPanel
          @alfabetSortAsc="alfabetSortAsc()"
          @alfabetSortDesc="alfabetSortDesc()"
          @priceSortAsc="priceSortAsc()"
          @priceSortDesc="priceSortDesc()"
        ></SortPanel>
      </div>

      <categoryCatalog :categoryNames="categoryNames"></categoryCatalog>
    </div>
    <MobileNavbar></MobileNavbar>

    <Footer></Footer>
  </div>
</template>
