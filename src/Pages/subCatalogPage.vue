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
import alfabetSortAsc from '@/customFunctions/alfabetSortAsc'
import alfabetSortDesc from '@/customFunctions/alfabetSortDesc'

function updateWebListSow(subArray) {
  categoryNames.value[currentCategory] = {
    ...categoryNames.value[currentCategory],
    sub: subArray,
  }
}

function sub_category_alfabetSortAsk() {
  let subArray = alfabetSortAsc(categoryNames.value[currentCategory].sub)
  updateWebListSow(subArray)
}

function sub_category_alfabetSortDesk() {
  let subArray = alfabetSortDesc(categoryNames.value[currentCategory].su)
  updateWebListSow(subArray)

}

function ask(toSort) {
  let sort = priceSortAsc(toSort)
  updateWebListSow(sort)
}

function desk(toSort) {
  let sort = priceSortDesc(toSort)
  updateWebListSow(sort)
}

const catalogStore = useCatalogStore()

const category = ref(
  catalogStore.with_description.indexOf(useRoute().params.category) !== -1
    ? useRoute().params.category
    : 'Прочее',
)
const categoryNames = reactive(storeToRefs(catalogStore).categories)
const currentCategory = category.value

</script>

<template>
  <div class="w-full max-w-[1630px] mx-auto">
    <Header :mainPage="false"></Header>

    <!-- каталог категорий -->
    <div class="w-full h-full mb-[100px] bg-white pt-[37px] px-[18px] desktop:px-[118px] mb-">
      <div class="flex w-full h-[46px] mb-8 justify-between">
        <p class="H2 text-gray-800">{{ category }}</p>
        <SortPanel @alfabetSortAsc="sub_category_alfabetSortAsk()" @alfabetSortDesc="sub_category_alfabetSortDesk()"
          @priceSortAsc="ask(categoryNames[currentCategory].sub)"
          @priceSortDesc="desk(categoryNames[currentCategory].sub)">
        </SortPanel>
      </div>
      <template v-if="categoryNames[category]">
        <SubCategoryCard v-for="item in categoryNames[category].sub" :key="item.type"
          :href="'/cargoList/' + category + '/' + item.type"
          description="Lorem ipsum sumaru texvd, orem ipsum sumaru texsumaru texvd, lorem ipsum umaru tex"
          :name="item.type" :price="'от ' + item.price + ' ₽'"></SubCategoryCard>
      </template>
    </div>

    <MobileNavbar></MobileNavbar>
    <Footer></Footer>
  </div>
</template>
