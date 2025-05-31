<script setup>
import CheckboxButton from "./checkboxButton.vue";
import CusotomButton from "./cusotomButton.vue";
import CustomInput from "./customInput.vue";
import close from "@/images/Plus.svg";
import { ref } from "vue";
let phoneCheck = ref(true);
let telegramCheck = ref(false);
let whatCheck = ref(false);
</script>

<script>
export default {
    props: {
        callback: Function,
    },
    methods: {
        onClick() {
            this.callback();
        },
    },
};
</script>

<template>
    <div
        class="fixed top-0 bottom-0 left-0 right-0 backdrop-brightness-[0.8] z-50 flex"
    >
        <div
            class="w-[611px] relative h-[563px] rounded-[26px] p-[60px] mx-auto mt-[177.5px] bg-main-white"
        >
            <img
            @click="onClick"
                class="rotate-45 absolute right-[31.5px] top-[31.5px]"
                :src="close"
            />
            <p class="H4 w-full text-center text-gray-800 mb-[36px]">
                Оставьте заявку <br />
                и мы поможем
            </p>
            <p class="label1 text-main-black mb-2">Имя</p>
            <CustomInput placeholder="Введите ваше имя"></CustomInput>
            <p class="label1 text-main-black mt-4 mb-2">
                Как с вами связаться?
            </p>
            <div class="flex justify-between">
                <CheckboxButton
                    @click="
                        (phoneCheck = true),
                            (whatCheck = false),
                            (telegramCheck = false)
                    "
                    :id="'phone'"
                    :checked="phoneCheck"
                    :dark="true"
                    text="По телефону"
                />
                <CheckboxButton
                    @click="
                        (phoneCheck = false),
                            (whatCheck = false),
                            (telegramCheck = true)
                    "
                    :id="'telegram'"
                    :checked="telegramCheck"
                    :dark="true"
                    text="Telegram"
                />
                <CheckboxButton
                    @click="
                        (phoneCheck = false),
                            (whatCheck = true),
                            (telegramCheck = false)
                    "
                    :id="'what'"
                    :checked="whatCheck"
                    :dark="true"
                    text="What’s App"
                />
            </div>
            <p class="label1 text-main-black mb-2 mt-4">Телефон</p>
            <CustomInput
                class="mb-9"
                placeholder="Введите ваш номер"
            ></CustomInput>
            <CusotomButton text="Отправить заявку" color="blue" :large="true" />
            <div class="flex w-full pl-[60.5px] mt-2">
                <input type="checkbox" />
                <p class="button2 text-gray-900 ml-2">
                    Я согласен с политикой конфиденциальности
                </p>
            </div>
        </div>
    </div>
</template>
