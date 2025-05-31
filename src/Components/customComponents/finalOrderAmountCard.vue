<script setup>
const props = defineProps({
    cargoCounted: { type: String, required: true },
    summWithoutDiscount: { type: String, required: true },
    discount: { type: String, required: true },
    summ: { type: String, required: true },
});
</script>
<template>
    <div class="shadow-lg rounded-2.5xl p-6 ">
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
                {{'-'+ props.discount + " ₽" }}
            </p>
        </div>
        <hr class="bg-gray-200 h-px my-5">
        <div class="w-full flex justify-between">
            <p class="p1 text-gray-800 my-auto">Общая стоимость</p>
            <p class="H4 text-gray-800 font-bold">
                {{ props.summ + " ₽" }}
            </p>
        </div>
    </div>
</template>
