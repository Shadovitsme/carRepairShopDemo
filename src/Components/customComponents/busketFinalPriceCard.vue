<script setup>
import CusotomButton from "./cusotomButton.vue";
const props = defineProps({
    summ: { type: Number, required: true },
    discount: { type: Number, required: true },
    summWithoutDiscount: { type: Number, required: true },
    cargoCounted: { type: Number, required: true },
});
</script>
<!-- TODO написать кастомную тень -->

<template>
    <div
        class="flex laptop:flex-col bg-white w-full fixed bottom-14 tablet:bottom-16 px-4.5 pt-4 pb-2 justify-between laptop:static shadow-lg laptop:mb-10 laptop:py-8 laptop:px-16 laptop:rounded-2.5xl desktop:w-96 desktop:px-8"
    >
        <!-- price -->
        <div class="laptop:hidden">
            <p class="H2 text-gray-800 pb-2.5 tablet:pb-2">
                {{ props.summ + " ₽" }}
            </p>
            <div class="flex">
                <p class="text-pink-700 button1 mr-2">
                    {{ "- " + props.discount + " ₽" }}
                </p>
                <p class="button1 text-gray-300 line-through">
                    {{ props.summWithoutDiscount + " ₽" }}
                </p>
            </div>
        </div>

        <div class="hidden laptop:visible laptop:block">
            <div class="w-full flex justify-between mb-5">
                <p class="p1 text-gray-800">
                    {{ "Товары (" + props.cargoCounted + ")" }}
                </p>
                <p class="text-gray-800 H8 font-bold">
                    {{ props.summWithoutDiscount + " ₽" }}
                </p>
            </div>
            <div class="w-full flex justify-between">
                <p class="p1 text-gray-800">Скидка</p>
                <p class="text-pink-700 H8 font-bold">
                    {{ props.discount + " ₽" }}
                </p>
            </div>
            <hr class="hidden laptop:block h-px bg-gray-200 w-full my-5" />

            <div class="w-full flex justify-between mb-8">
                <p class="p1 text-gray-800 my-auto">Общая стоимость</p>
                <p class="H4 text-gray-800 font-bold">
                    {{ props.summ + " ₽" }}
                </p>
            </div>
        </div>

        <!-- price end --> 
        <CusotomButton
         @click="$emit('openModal')"
            :disabled="props.summ <= 0"
            class="tablet:w-83.5 laptop:w-full"
            color="blue"
            text="Заказать"
        ></CusotomButton>
        <p class="w-full text-center text-gray-800 p2 mt-3 hidden laptop:block">
            Доставим сегодня
        </p>
    </div>
</template>
