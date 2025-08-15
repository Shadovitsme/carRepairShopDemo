<script setup>
const props = defineProps({
  dataArr: { type: Array, required: false },
})
const emit = defineEmits(['selectCategory'])
const selectCategory = (item) => {
  emit('selectCategory', item)
}
</script>
<template>
  <div>
    <div class="bg-white mt-2 grid grid-cols-2 rounded-[20px] p-7">
      <p @click="selectCategory(item)" v-for="item in props.dataArr">{{ item }}</p>
    </div>
  </div>
</template>
