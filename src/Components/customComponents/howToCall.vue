<script setup>
import { ref } from 'vue'
import CheckboxButton from './checkboxButton.vue'
let checkedItem = ref('phone')

function selectItem(e) {
  checkedItem.value = e.target.id
}
</script>
<template>
  <p class="label1 text-main-black mb-2">Как с вами связаться?</p>
  <div class="flex gap-x-1 w-full">
    <CheckboxButton
      :name="checkedItem == 'phone'"
      @click="selectItem"
      id="phone"
      :checked="checkedItem == 'phone'"
      :hug="false"
      text="По телефону"
    ></CheckboxButton>
    <CheckboxButton
      :name="checkedItem == 'telegram'"
      @click="selectItem"
      id="telegram"
      :checked="checkedItem == 'telegram'"
      :hug="false"
      text="Telegram"
    ></CheckboxButton>

    <CheckboxButton
      :name="checkedItem == 'watsapp'"
      @click="selectItem"
      id="watsapp"
      :checked="checkedItem == 'watsapp'"
      :hug="false"
      text="What’s App"
    ></CheckboxButton>
  </div>
</template>
