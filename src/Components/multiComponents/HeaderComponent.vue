<script setup>
import customButton from '@/Components/customComponents/cusotomButton.vue'
import call from '@/images/call.svg'
import logo from '@/images/Logo.svg'
import iconButton from '@/Components/customComponents/iconButton.vue'
import smallSearchField from '@/Components/customComponents/smallSearchField.vue'
import { ref } from 'vue'
import close from '@/images/Plus.svg'
import ModalBlock from '../customComponents/modalBlock.vue'
import HeaderBusketIcon from '../customComponents/headerBusketIcon.vue'

let modalVisible = ref(false)
const props = defineProps({
  mainPage: { type: Boolean, required: false, default: false },
})
let numberStyle = 'button2 my-auto hidden desktop:visible desktop:block'
let bgSytle =
  'w-full desktop:h-[5.375rem] tablet:h-18 h-15 desktop:px-[7.3125rem] tablet:px-4.5 px-4.5 desktop:py-[1.125rem] py-3 '
if (props.mainPage) {
  numberStyle += ' mr-4 '
} else {
  numberStyle += ' mr-3 '
  bgSytle += ' bg-white'
}
</script>

<template>
  <div :class="bgSytle">
    <div class="w-full flex justify-between h-full">
      <div class="flex desktop:h-[2.875rem] min-w-fit">
        <RouterLink to="/"> <img class="tablet:mr-5 mr-3 my-2.75" :src="logo" alt="" /></RouterLink>
      </div>
      <div
        :class="
          'my-auto hidden laptop:flex   align-bottom  ' +
          (props.mainPage
            ? 'laptop:justify-end laptop:gap-6 laptop:w-full laptop:px-11'
            : 'laptop:justify-start laptop:gap-[66px] laptop:pl-[52px]')
        "
      >
        <RouterLink to="/categoryCatalog" class="button2">Каталог</RouterLink>
        <!-- <a class="button2">Контакты</RouterLink> -->
      </div>
      <div class="w-full flex" v-if="!props.mainPage">
        <smallSearchField
          class="hidden desktop:visible desktop:block mx-auto min-w-[290px]"
        ></smallSearchField>
      </div>

      <div class="flex min-w-fit">
        <a href="tel:+79876543210" :class="numberStyle">+7 987 654-32-10</a>
        <customButton
          @click="modalVisible = true"
          class="tablet:mr-3 hidden tablet:visible tablet:block"
          :iconFirst="call"
          color="blue"
          text="Заказать звонок"
        ></customButton>
        <!-- mobile phoneButton -->
        <iconButton
          @click="modalVisible = true"
          class="visible my-auto tablet:hidden block"
          icon="phone"
          color="blue"
        ></iconButton>
        <HeaderBusketIcon></HeaderBusketIcon>
      </div>
    </div>
  </div>

  <div
    v-if="modalVisible"
    class="fixed top-0 bottom-0 left-0 right-0 backdrop-brightness-[0.8] z-50 flex"
  >
    <div
      class="desktop:w-[38.1875rem] tablet:w-[484px] laptop:w-[563px] h-fit w-full tablet:relative absolute bottom-0 desktop:h-[35.1875rem] rounded-t-[1.625rem] tablet:rounded-[1.625rem] laptop:p-9 px-[18px] py-8 laptop:py-9 mx-auto mt-[11.09375rem] bg-main-white"
    >
      <img
        @click="modalVisible = !modalVisible"
        class="rotate-45 absolute right-[1.96875rem] top-[1.96875rem]"
        :src="close"
      />
      <ModalBlock></ModalBlock>
    </div>
  </div>
</template>
