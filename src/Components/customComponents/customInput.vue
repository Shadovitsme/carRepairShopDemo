<script setup>
const props = defineProps({
  placeholder: { type: String, required: false },
})
</script>
<template>
  <input
    :placeholder="$props.placeholder"
    maxlength="50"
    type="text"
    class="px-4 h-[46px] py-3 w-full rounded-full placeholder:text-gray-500 placeholder:input border-gray-300 border"
  />
</template>
