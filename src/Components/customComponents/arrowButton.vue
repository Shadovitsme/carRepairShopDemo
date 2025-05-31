<script setup>
import arrowRight from "@/images/arrow-right.svg";
import arrowLeft from "@/images/arrow-left.svg";
const props = defineProps({
    left: { type: Boolean, required: false },
});
let arrow = arrowRight;
if (props.left) {
    arrow = arrowLeft;
}
</script>
<template>
    <button class="bg-white h-[46px] shadow-lg w-[46px] rounded-full">
        <img class="m-auto" :src="arrow" />
    </button>
</template>
