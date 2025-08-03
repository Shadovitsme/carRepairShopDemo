<script setup>
const props = defineProps({
  text: { type: String, required: true },
  checked: { type: Boolean },
  hug: { type: Boolean, required: true },
})
</script>
<template>
  <button
    type="button"
    :class="
      'flex tablet:px-6 h-8 tablet:h-12 border-2 items-center justify-center rounded-xl tablet:rounded-[16px] text-center button1  duration-300  ' +
      (props.checked
        ? 'bg-gray-700 hover:border-gray-700 hover:text-white  border-gray-700 text-white '
        : 'text-gray-700 bg-blue-100 border-blue-100 hover:border-blue-600  ') +
      (props.hug ? 'w-fit px-5' : 'w-full')
    "
  >
    {{ props.text }}
  </button>
</template>
