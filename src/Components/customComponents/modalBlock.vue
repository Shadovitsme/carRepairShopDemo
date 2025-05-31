<script setup>
import customInput from './customInput.vue'
import customButton from './cusotomButton.vue'
import HowToCall from './howToCall.vue'
import mask from '@/customFunctions/phoneMask'
import { ref } from 'vue'

const phoneNumber = ref('')
</script>

<template>
  <form>
    <p class="H4 w-full text-gray-800 mb-5">
      Оставьте заявку <br class="tablet:hidden" />и мы поможем
    </p>
    <p class="label1 text-main-black mb-3 tablet:mb-2">Имя</p>
    <customInput class="mb-5" placeholder="Введите ваше имя"></customInput>
    <HowToCall></HowToCall>
    <p class="label1 text-main-black mb-3 mt-6">Телефон</p>
    <customInput
      v-model="phoneNumber"
      :value="phoneNumber"
      @input="mask"
      id="phoneNumber"
      class="mb-5"
      placeholder="Введите ваш номер"
    ></customInput>
    <customButton class="w-full" text="Отправить заявку" color="blue" :large="true" />
    <div class="flex w-full justify-center mt-1 tablet:mt-2.5">
      <div class="flex">
        <input type="checkbox" />
        <p class="button2 w-full break-keep text-gray-900 ml-1">
          Я согласен с политикой конфиденциальности
        </p>
      </div>
    </div>
  </form>
</template>
