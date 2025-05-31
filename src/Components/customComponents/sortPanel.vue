<script setup>
import { ref } from "vue";
import cusotomButton from "./cusotomButton.vue";
import dropDownArrow from "@/images/Vector.svg";

let showSort = ref(false);
let color = ref("white");
function changeVisible() {
    showSort.value = !showSort.value;
}
</script>
<template>
    <div class="relative">
        <cusotomButton
            @click="changeVisible()"
            color="sortColor"
            class="tablet:w-[176px]"
            text="Сортировать"
            :iconSecond="dropDownArrow"
        ></cusotomButton>
        <div
            v-if="showSort"
            @click="showSort = !showSort"
            class="bg-blue-100 z-50 w-full text-left absolute right-0 rounded-[20px] top-14 p-4 tablet:py-4 tablet:px-5"
        >
            <button
                class="text-gray-700 button2 mb-4 hover:text-blue-800"
                @click="$emit('alfabetSortAsc')"
            >
                От А до Я
            </button>
            <button
                class="text-gray-700 button2 mb-4 hover:text-blue-800"
                @click="$emit('alfabetSortDesc')"
            >
                От Я до А
            </button>
            <button
                class="text-gray-700 button2 mb-4 hover:text-blue-800"
                @click="$emit('priceSortAsc')"
            >
                Самые дорогие
            </button>
            <button
                class="text-gray-700 button2 hover:text-blue-800"
                @click="$emit('priceSortDesc')"
            >
                Самые дешёвые
            </button>
        </div>
    </div>
</template>
