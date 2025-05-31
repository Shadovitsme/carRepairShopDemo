<script setup>
const props = defineProps({
    img: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    article: { type: String, required: true },
    characteristic: { type: String, required: true },
    cargoCounted: { type: String, required: true },
    price: { type: String, required: true },
    discountPrice: { type: String, required: true },
    summ: { type: String, required: true },
});
</script>
<template>
    <div class="p-2 rounded-xl shadow-md">
        <img :src="props.img" class="cover mb-4" />
        <p class="H8 text-main-textBlueDark mb-2 font-bold">{{ props.summ +' ₽' }}</p>
        <div class="flex gap-2">
            <p class="label2 text-main-textBlueDark">{{ props.discountPrice +' ₽' }}</p>
            <p class="inline text-gray-300 label2">{{ props.price +' ₽' }}</p>
        </div>
        <p class="text-main-textBlue label2 mb-1.5">{{ props.article }}</p>
        <p class="H7 text-main-textBlueDark mb-1">{{ props.name }}</p>
        <div class="label2 text-main-textBlue gap-y-1.5">   <p>{{ props.manufacturer }}</p>
        <p>{{ props.characteristic }}</p>
        <p>{{'Количество: ' + props.cargoCounted }}</p></div>

    </div>
</template>
