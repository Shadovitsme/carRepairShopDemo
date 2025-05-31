<script setup>
import Header from '@/Components/multiComponents/HeaderComponent.vue'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import SubCategoryCard from '@/Components/customComponents/subCategoryCard.vue'
import MobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import SortPanel from '@/Components/customComponents/sortPanel.vue'
import { ref } from 'vue'
import { useCatalogStore } from '@/store/catalog'
import { useRoute } from 'vue-router'
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

const category = ref(
  catalogStore.with_description.indexOf(useRoute().params.category) !== -1
    ? useRoute().params.category
    : 'Прочее',
)
const categoryNames = storeToRefs(catalogStore).categories
</script>

<template>
  <div class="w-full max-w-[1630px] mx-auto">
    <Header :mainPage="false"></Header>

    <!-- каталог категорий -->
    <div class="w-full h-full mb-[100px] bg-white pt-[37px] px-[18px] desktop:px-[118px] mb-">
      <div class="flex w-full h-[46px] mb-8 justify-between">
        <p class="H2 text-gray-800">{{ category }}</p>
        <SortPanel
          @alfabetSortAsc="alfabetSortAsc()"
          @alfabetSortDesc="alfabetSortDesc()"
          @priceSortAsc="priceSortAsc()"
          @priceSortDesc="priceSortDesc()"
        ></SortPanel>
      </div>
      <template v-if="categoryNames[category]">
        <SubCategoryCard
          v-for="item in categoryNames[category].sub"
          :key="item.type"
          :href="'/cargoList/' + category + '/' + item.type"
          description="Lorem ipsum sumaru texvd, orem ipsum sumaru texsumaru texvd, lorem ipsum umaru tex"
          :name="item.type"
          :price="'от ' + item.price + ' ₽'"
        ></SubCategoryCard>
      </template>
    </div>

    <MobileNavbar></MobileNavbar>
    <Footer></Footer>
  </div>
</template>
