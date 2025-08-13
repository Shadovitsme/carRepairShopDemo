<script setup>
import Header from '@/Components/multiComponents/HeaderComponent.vue'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import SortPanel from '@/Components/customComponents/sortPanel.vue'
import CargoCard from '@/Components/customComponents/cargoCard.vue'
import MobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import { useCatalogStore } from '@/store/catalog.js'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import alfabetSortAsc from '@/customFunctions/alfabetSortAsc'
import alfabetSortDesc from '@/customFunctions/alfabetSortDesc'

const catalogStore = useCatalogStore()
const category = ref(
  catalogStore.with_description.indexOf(useRoute().params.category) !== -1
    ? useRoute().params.category
    : 'Прочее',
)
const sub = ref(useRoute().params.sub)
const categoryNames = storeToRefs(catalogStore).categories
let cargoList = ref(categoryNames.value[category.value].sub[sub.value].cargo)

function alfabetSortAscCargoListPage() {
  cargoList.value = alfabetSortAsc(categoryNames.value[category.value].sub[sub.value].cargo, 'name')
}

function alfabetSortDescCargoListPage() {
  cargoList.value = alfabetSortDesc(
    categoryNames.value[category.value].sub[sub.value].cargo,
    'name',
  )
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
<template>
  <div class="w-full max-w-[1630px] mx-auto">
    <Header :mainPage="false"></Header>

    <div
      class="w-full h-full mb-[100px] bg-white pt-[37px] px-[18px] tablet:px-8 desktop:px-[118px] mb-"
    >
      <div class="flex w-full h-[46px] mb-8 justify-between">
        <p class="H2 text-gray-800">{{ sub }}</p>
        <SortPanel
          @alfabetSortAsc="alfabetSortAscCargoListPage()"
          @alfabetSortDesc="alfabetSortDescCargoListPage()"
          @priceSortAsc="priceSortAsc()"
          @priceSortDesc="priceSortDesc()"
        ></SortPanel>
      </div>
      <div
        v-if="categoryNames[category]"
        class="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-5"
      >
        <CargoCard
          v-for="item in cargoList"
          :description="item.description"
          :key="item.article"
          :price="item.price + ' ₽'"
          :cargo-name="item.name"
          :article="item.article"
          :brand="item.brand"
          :graduation="item.graduation"
          :image="item.image + '/1.webp'"
          :href="'/cargo/' + category + '/' + sub + '/' + item.article"
        ></CargoCard>
      </div>
    </div>
    <MobileNavbar></MobileNavbar>
    <Footer></Footer>
  </div>
</template>
