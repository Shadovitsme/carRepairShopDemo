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


function alfabetSortAsc() {
  const currentCategory = category.value
  if (categoryNames.value[currentCategory] && categoryNames.value[currentCategory].sub) {
    // Always convert sub to array
    let subArray = Array.isArray(categoryNames.value[currentCategory].sub)
      ? categoryNames.value[currentCategory].sub
      : Object.values(categoryNames.value[currentCategory].sub);

    // Sort ascending
    subArray.sort((a, b) => {
      if (a.type > b.type) {
        return 1
      }
      if (a.type == b.type) {
        return 0
      }
      return -1
    })
    categoryNames.value[currentCategory] = {
      ...categoryNames.value[currentCategory],
      sub: subArray
    }
    // Assign sorted array back

  }
}

function alfabetSortDesc() {
  const currentCategory = category.value
  if (categoryNames.value[currentCategory] && categoryNames.value[currentCategory].sub) {
    // Always convert sub to array
    let subArray = Array.isArray(categoryNames.value[currentCategory].sub)
      ? categoryNames.value[currentCategory].sub
      : Object.values(categoryNames.value[currentCategory].sub);

    // Sort descending
    subArray.sort((a, b) => {
      if (a.type < b.type) {
        return 1
      }
      if (a.type === b.type) {
        return 0
      }
      return -1
    })

    // Assign sorted array back
    // Force Vue to detect the change by replacing the whole object
    categoryNames.value[currentCategory] = {
      ...categoryNames.value[currentCategory],
      sub: subArray
    }

  }
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
const categoryNames = reactive(storeToRefs(catalogStore).categories)

</script>

<template>
  <div class="w-full max-w-[1630px] mx-auto">
    <Header :mainPage="false"></Header>

    <!-- каталог категорий -->
    <div class="w-full h-full mb-[100px] bg-white pt-[37px] px-[18px] desktop:px-[118px] mb-">
      <div class="flex w-full h-[46px] mb-8 justify-between">
        <p class="H2 text-gray-800">{{ category }}</p>
        <SortPanel @alfabetSortAsc="alfabetSortAsc()" @alfabetSortDesc="alfabetSortDesc()"
          @priceSortAsc="priceSortAsc()" @priceSortDesc="priceSortDesc()"></SortPanel>
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
