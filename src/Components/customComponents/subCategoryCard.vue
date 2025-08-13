<script setup>
import cusotomButton from './cusotomButton.vue'
import IconButton from './iconButton.vue'
const props = defineProps({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  href: { type: String, required: true },
})
</script>
<template>
  <div
    class="w-full h-21.5 bg-blue-100 rounded-[1.25rem] desktop:rounded-full flex justify-between pl-5 tablet:pl-7 desktop:pl-10 py-5.25 mb-5"
  >
    <p
      class="my-auto H8 w-33 tablet:w-[15.625rem] desktop:w-[25.75rem] desktop:mb-2 text-main-textBlueDark"
    >
      {{ props.name }}
    </p>
    <p class="H8 my-auto text-main-textBlueDark">{{ props.price }}</p>
    <RouterLink :to="props.href">
      <cusotomButton
        class="hidden tablet:visible tablet:inline-block"
        color="blue"
        text="Перейти"
      />
      <IconButton class="tablet:hidden mt-1" icon="arrowRight" color="blue"></IconButton>
    </RouterLink>
  </div>
</template>
