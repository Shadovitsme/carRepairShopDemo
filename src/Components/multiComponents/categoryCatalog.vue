<script setup>
import categoryCard from '../customComponents/categoryCard.vue'
const props = defineProps(['categoryNames'])
</script>

<template>
  <div v-if="props.categoryNames" class="flex w-full z-0 flex-wrap gap-5">
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
