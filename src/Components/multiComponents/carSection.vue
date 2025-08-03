<script setup>
import ModalBlock from '../customComponents/modalBlock.vue'
</script>

<template>
  <div
    class="px-4.5 tablet:px-8 desktop:pl-29.25 desktop:pr-0 tv:pl-[160px] overflow-hidden desktop:my-0 mt-[30px] laptop:flex laptop:mt-[60px] justify-between laptop:mb-20"
  >
    <div class="my-auto desktop:w-ful tv:w-[520px]">
      <ModalBlock></ModalBlock>
    </div>
    <img class="w-full laptop:w-[469px] desktop:hidden" src="../../images/car.png" />
    <img class="hidden w-[1024px] desktop:block" src="../../images/bigCar.png" />
  </div>
</template>
