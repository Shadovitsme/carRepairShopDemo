<script setup>
import iconButton from "./iconButton.vue";
import { AddOneItem } from "@/customFunctions/addOne";
import { getCookie } from "@/customFunctions/getCookie";
import { RemoveOne } from "@/customFunctions/removeOne";
import { ref } from "vue";
const props = defineProps({
    article: { type: String, required: false },
});

let count = ref(getCookie(String(props.article)))

</script>

<template>
    <div class="flex justify-between ">
        <iconButton
            @click="count = RemoveOne(count, props.article)"
            icon="-"
            color="blue"
            class="my-auto"
        ></iconButton>
        <div
            class="bg-white my-auto h-10 tablet:h-12 tablet:py-3 py-2 flex border mx-1 border-gray-300 rounded-full w-full tablet:px-2"
        >
            <p class="text-gray-500 w-full text-center input mx-auto">
                {{ count }}
            </p>
        </div>
        <iconButton
        class="my-auto"

            @click="count = AddOneItem(count, props.article)"
            icon="+"
            color="blue"
        ></iconButton>
    </div>
</template>
