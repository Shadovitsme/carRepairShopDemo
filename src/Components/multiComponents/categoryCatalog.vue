<script setup>
import categoryCard from '../customComponents/categoryCard.vue'
const props = defineProps(['categoryNames'])
</script>

<template>
  <div
    v-if="props.categoryNames"
    class="grid desktop:grid-cols-4 laptop:grid-cols-3 grid-cols-2 gap-5"
  >
    <categoryCard
      class="mx-auto"
      v-for="item in props.categoryNames"
      :key="item.type"
      :name="item.type"
      :price="'от ' + item.price + ' ₽'"
      :href="'/subCatalog/' + item.type"
    ></categoryCard>
  </div>
</template>
