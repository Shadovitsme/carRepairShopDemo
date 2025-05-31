<script setup>
import HowToCall from '../customComponents/howToCall.vue'
import CusotomButton from '../customComponents/cusotomButton.vue'
import customInput from '../customComponents/customInput.vue'
import mask from '@/customFunctions/phoneMask'
const props = defineProps({
  cargoResult: { type: Array, required: true },
})
const emit = defineEmits(['openOrderResult'])
function submit(e) {
  e.preventDefault()
  let howToCall
  // find how to call
  for (let i = 7; i <= 9; i++) {
    if (e.target[i].name == 'true') {
      howToCall = e.target[i].id
      break
    }
  }

  let data = {
    userName: e.target[1].value,
    street: e.target[2].value,
    build: e.target[3].value,
    district: e.target[4].value,
    room: e.target[5].value,
    serviceName: e.target[6].value,
    howToCall: howToCall,
    phone: e.target[10].value,
    cargo: props.cargoResult,
  }
  localStorage.setItem('userName', data.userName)
  localStorage.setItem('street', data.street)
  localStorage.setItem('build', data.build)
  localStorage.setItem('district', data.district)
  localStorage.setItem('room', data.room)
  localStorage.setItem('phone', data.phone)
  emit('openOrderResult')
}
</script>

<template>
  <form
    @submit.prevent="submit"
    class="bg-main-white h-screen z-50 py-6 px-4.5 rounded-t-2.5xl tablet:w-[483px] tablet:rounded-b-2.5xl tablet:my-auto tablet:h-fit tablet:mx-auto laptop:my-3 laptop:w-[714px] laptop:px-12 relative laptop:py-9 desktop:w-[601px] desktop:my-[45px] desktop:p-[60px]"
  >
    <button
      @click="$emit('closeModal')"
      class="absolute closeIcon top-[27px] right-[27px] h-5 w-5"
    ></button>
    <p class="H4 text-gray-800 w-full text-center font-bold mb-2.5 laptop:mb-5">
      Оформление заказа
    </p>
    <p class="text-gray-800 tablet:hidden p1 w-full text-center mb-4">
      Пожалуйста, введите ваши данные
    </p>
    <p
      class="text-gray-800 p1 w-full hidden tablet:block text-center mb-4 laptop:mb-5 desktop:mb-4"
    >
      Пожалуйста, введите ваши данные, чтобы менеджер сформировал ваш заказ
    </p>
    <p class="label1 text-main-black h-4 align-center mb-2">Имя</p>
    <customInput
      id="name"
      class="mb-3 laptop:mb-5 desktop:mb-6"
      placeholder="Введите ваше имя"
    ></customInput>
    <p class="label1 text-main-black mb-2">Адрес</p>
    <customInput class="mb-2" placeholder="Введите улицу"></customInput>
    <div class="flex gap-1 mb-3 laptop:mb-5 desktop:mb-6">
      <customInput placeholder="№ дома"></customInput>
      <customInput placeholder="Корус"></customInput>
      <customInput placeholder="Кв/офис"></customInput>
    </div>
    <p class="label1 text-main-black mb-2">Название сервиса</p>
    <customInput
      class="mb-3.5 laptop:mb-5 desktop:mb-6"
      placeholder="Введите название вашей компании"
    ></customInput>
    <HowToCall></HowToCall>
    <p class="label1 text-main-black mb-2 mt-3 laptop:mt-5 desktop:mt-6">Телефон</p>
    <customInput
      v-model="phoneNumber"
      @input="mask"
      class="mb-4 laptop:mb-5 desktop:mb-8"
      placeholder="Введите ваш номер"
    ></customInput>
    <div class="w-full flex">
      <CusotomButton
        text="Отправить заявку"
        color="blue"
        class="w-full mb-2 h-[48px] tablet:w-[384px] tablet:mx-auto"
      ></CusotomButton>
    </div>

    <div class="flex w-full justify-center h-fit">
      <input type="checkbox" class="my-auto mr-[3px]" />
      <p class="text-gray-900 button2">
        Я согласен с
        <span class="underline">политикой конфиденциальности</span>
      </p>
    </div>
  </form>
</template>
