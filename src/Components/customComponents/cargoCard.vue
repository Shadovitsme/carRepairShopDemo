<script setup>
import cusotomButton from './cusotomButton.vue'
import iconButton from './iconButton.vue'
import { ref } from 'vue'

const props = defineProps({
  cargoName: { type: String, required: true },
  article: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  brand: { type: String, required: true },
  image: { type: String, required: true },
  graduation: { type: String, required: true },
  href: {},
})

let counted = ref(getCookie(props.article))

let toBusk = ref(!(counted.value > 0))

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
// TODO вынести в отдельные функции в отдельную папку
function AddOneItem() {
  counted.value++
  document.cookie = props.article + '=' + counted.value + ';path=/;'
}

function RemoveOne() {
  counted.value--
  if (counted.value <= 0) {
    counted.value = 0
    toBusk.value = true
  }
  document.cookie = props.article + '=' + counted.value + ';path=/;'
}

function addToBusket() {
  toBusk.value = false
  counted.value = 1
  document.cookie = props.article + '=' + counted.value + ';path=/;'
}
</script>

<template>
  <div class="overflow-hidden desktop:w-[334px] tablet:w-[179px] w-[152px]">
    <RouterLink :to="props.href">
      <img
        class="w-full desktop:h-[334px] tablet:h-[180px] h-[152px] desktop:mb-4 mb-2 rounded-[20px] object-cover"
        :src="props.image"
      />
      <p class="p3 text-main-textBlue desktop:mb-3 mb-[10px]">{{ props.article }}</p>
      <p class="desktop:mb-3 mb-[10px] H7 text-main-textBlueDark">{{ props.price }}</p>

      <p class="H8 desktop:h-12 tablet:h-20 h-[60px] text-main-textBlueDark mb-1">
        {{ props.cargoName }}
      </p>
      <div class="flex mb-3">
        <p class="p3 text-main-textBlue">
          {{ props.brand }}
        </p>
      </div>
      <div class="flex mb-3">
        <p class="p3 text-main-textBlue">Характеристика:</p>
        <p class="p3 text-main-textBlue">
          {{ props.graduation }}
        </p>
      </div>
    </RouterLink>

    <cusotomButton
      v-if="toBusk"
      class="w-full"
      @click="addToBusket"
      color="blue"
      text="В корзину"
      :medium="false"
    />
    <div v-if="!toBusk" class="flex justify-between w-full">
      <iconButton @click="RemoveOne" icon="-" color="blue"></iconButton>
      <div
        class="bg-white desktop:py-3 flex border my-auto w-full desktop:h-full h-9 desktop:mx-5 mx-1 border-gray-300 rounded-full"
      >
        <p class="text-gray-500 input my-auto mx-auto">
          {{ counted }}
        </p>
      </div>
      <iconButton @click="AddOneItem" icon="+" color="blue"></iconButton>
    </div>
  </div>
</template>
