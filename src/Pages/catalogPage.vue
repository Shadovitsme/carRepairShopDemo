<script setup>
import Header from '@/Components/multiComponents/HeaderComponent.vue'
import categoryCatalog from '@/Components/multiComponents/categoryCatalog.vue'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import MobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import SortPanel from '@/Components/customComponents/sortPanel.vue'
import { useCatalogStore } from '@/store/catalog'
import { storeToRefs } from 'pinia'
import makeSubArrayForSort from '@/customFunctions/makeSubArrayForSort'
import alfabetSortAsc from '@/customFunctions/alfabetSortAsc'
import { nextTick, ref } from 'vue'
import alfabetSortDesc from '@/customFunctions/alfabetSortDesc'
const catalogStore = useCatalogStore()
const categoryNames = storeToRefs(catalogStore).categories
let sort = ref(categoryNames.value)

function alfabetSortAscCatalogPage() {
  sort.value = alfabetSortAsc(categoryNames.value)
}

function alfabetSortDescCatalogPage() {
  sort.value = alfabetSortDesc(categoryNames.value)
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
<script></script>
<template>
  <div class="w-full max-w-[1630px] mx-auto">
    <Header :mainPage="false"></Header>

    <!-- каталог категорий -->
    <div class="w-full h-full mb-[100px] bg-white pt-[37px] px-4.5 laptop:px-8 desktop:px-29.25">
      <div class="flex w-full h-[46px] mb-8 justify-between">
        <p class="H2 text-gray-800">Каталог</p>
        <SortPanel
          @alfabetSortAsc="alfabetSortAscCatalogPage()"
          @alfabetSortDesc="alfabetSortDescCatalogPage()"
          @priceSortAsc="priceSortAsc()"
          @priceSortDesc="priceSortDesc()"
        ></SortPanel>
      </div>

      <categoryCatalog :categoryNames="sort"></categoryCatalog>
    </div>
    <MobileNavbar></MobileNavbar>

    <Footer></Footer>
  </div>
</template>
