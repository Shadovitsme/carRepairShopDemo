<script setup>
import { ref } from 'vue'

let selected = ref('Каталог')
const props = defineProps({
  dataArr: { type: Array, required: false },
})
const emit = defineEmits(['data-sent'])
const sendDataToParent = (item) => {
  if (item.length > 9) {
    item = item.slice(0, 7) + '...'
  }
  emit('data-sent', item)
}
</script>
<template>
  <div id="lol">
    <div :id="selected" class="bg-white mt-2 grid grid-cols-2 rounded-[20px] p-7">
      <p @click="sendDataToParent(item)" v-for="item in props.dataArr">{{ item }}</p>
    </div>
  </div>
</template>
