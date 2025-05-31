<script setup>

import CheckboxButton from "./checkboxButton.vue";

const props = defineProps({
    manufacturer: { type: String, required: false },
    name: { type: String, required: true },
    characteristic: { type: String, required: false },
    colorArr: { type: Array, required: false },
});


</script>
<template>
    <div class="laptop:flex laptop:w-[896px]">
        <div class="laptop:mr-6 laptop:w-[424px]">
            <p class="p1 text-gray-500 mb-4">
                {{ props.manufacturer }}
            </p>
            <h6 class="H3 font-bold text-gray-700 w-full mb-8 laptop:mb-10">
                {{ props.name }}
            </h6>
            <p class="p1 text-gray-500 mb-4">
                {{ props.characteristic }}
            </p>
            <div class="grid gap-2 grid-flow-col-dense grid-rows-2 w-[300px] laptop:w-[424px]">
                <CheckboxButton :hug="true" :text="props.characteristic" name="characteristic"></CheckboxButton>

            </div>
            <p class="p1 text-gray-500 mt-6 mb-4">Цвет</p>
            <div
                class="grid gap-2 grid-flow-col-dense grid-rows-2 auto-cols-max laptop:w-[424px]"
            >
                <CheckboxButton
                    v-for="item in props.colorArr"
                    :text="item.color"
                    name="color"
                ></CheckboxButton>
            </div>
        </div>
    </div>
</template>
