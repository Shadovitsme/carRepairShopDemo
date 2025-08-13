<script setup>
import Header from '@/Components/multiComponents/HeaderComponent.vue'
import Footer from '@/Components/multiComponents/FooterComponent.vue'
import SubCategoryCard from '@/Components/customComponents/subCategoryCard.vue'
import MobileNavbar from '@/Components/customComponents/mobileNavbar.vue'
import SortPanel from '@/Components/customComponents/sortPanel.vue'
import { reactive, ref } from 'vue'
import { useCatalogStore } from '@/store/catalog'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import priceSortDesc from '@/customFunctions/priceSortDesc'
import priceSortAsc from '@/customFunctions/priceSortAsk'

const catalogStore = useCatalogStore()
const category = ref(
  catalogStore.with_description.indexOf(useRoute().params.category) !== -1
    ? useRoute().params.category
    : 'Прочее',
)
const categoryNames = reactive(storeToRefs(catalogStore).categories)
const currentCategory = category.value

function make_subArray(data) {
  let subArray = Array.isArray(data) ? data : Object.values(data)
  return subArray
}

function updateWebListSow(subArray) {
  categoryNames.value[currentCategory] = {
    ...categoryNames.value[currentCategory],
    sub: subArray,
  }
}

function sub_category_alfabetSortAsk() {
  if (categoryNames.value[currentCategory] && categoryNames.value[currentCategory].sub) {
    let subArray = make_subArray(categoryNames.value[currentCategory].sub)

    subArray.sort((a, b) => {
      if (a.type > b.type) {
        return 1
      }
      if (a.type == b.type) {
        return 0
      }
      return -1
    })
    updateWebListSow(subArray)
  }
}

function sub_category_alfabetSortDesk() {
  if (categoryNames.value[currentCategory] && categoryNames.value[currentCategory].sub) {
    let subArray = make_subArray(categoryNames.value[currentCategory].sub)

    subArray.sort((a, b) => {
      if (a.type < b.type) {
        return 1
      }
      if (a.type === b.type) {
        return 0
      }
      return -1
    })

    updateWebListSow(subArray)
  }
}

function priceSortAscSubCatalog() {
  let subArray = priceSortAsc(categoryNames.value[currentCategory].sub)
  updateWebListSow(subArray)
}

function priceSortDescSubCatalog() {
  let subArray = priceSortDesc(categoryNames.value[currentCategory].sub)
  updateWebListSow(subArray)
}
</script>

<template>
  <div class="w-full max-w-[1630px] mx-auto">
    <Header :mainPage="false"></Header>

    <!-- каталог категорий -->
    <div class="w-full h-full mb-[100px] bg-white pt-[37px] px-[18px] desktop:px-[118px] mb-">
      <div class="flex w-full h-[46px] mb-8 justify-between">
        <p class="H2 text-gray-800">{{ category }}</p>
        <SortPanel
          @alfabetSortAsc="sub_category_alfabetSortAsk()"
          @alfabetSortDesc="sub_category_alfabetSortDesk()"
          @priceSortAsc="priceSortAscSubCatalog()"
          @priceSortDesc="priceSortDescSubCatalog()"
        >
        </SortPanel>
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
