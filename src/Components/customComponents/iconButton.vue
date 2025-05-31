<script setup>
const props = defineProps({
  color: { type: String, required: false },
  icon: { type: String, required: false },
})

const colorArray = [
  'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-200 text-white',

  'bg-gray-400 hover:bg-gray-500 active:bg-gray-600 disable:bg-gray-300 text-white',

  'bg-gray-700 hover:bg-gray-800 active:bg-gray-700 disable:bg-gray-700 disable:text-gray-400 text-white',

  'bg-white text-main-black active:text-main-black hover:text-blue-600 disable:text-gray-400',

  'bg-pink-500 hover:bg-pink-600 active:bg-pink-700 disable:bg-pink-100 disable:text-gray-400 text-white',
]

let bgColor
let ico

switch (props.color) {
  case 'blue':
    bgColor = colorArray[0]
    break
  case 'gray':
    bgColor = colorArray[1]
    break
  case 'black':
    bgColor = colorArray[2]
    break
  case 'white':
    bgColor = colorArray[3]
    break
  case 'pink':
    bgColor = colorArray[4]
    break
}

switch (props.icon) {
  case 'busket':
    ico = 'busketIcon'
    break
  case 'arrowLeft':
    ico = 'arrowLeftIcon'
    break
  case 'arrowRight':
    ico = 'arrowRightIcon'
    break
  case 'arrowDown':
    ico = 'arrowDownIcon'
    break
  case 'arrowUp':
    ico = 'arrowUpIcon'
    break
  case '+':
    ico = 'plusIcon'
    break
  case '-':
    ico = 'minusIcon'
    break
  case 'phone':
    ico = 'phoneIcon'
    break
}

ico = 'shrink-0 ablet:h-[2.875rem] tablet:w-[2.875rem] h-9 w-9 ' + ico

let style = 'shrink-0 tablet:h-[2.875rem] tablet:w-[2.875rem] h-9 w-9 rounded-full ' + bgColor
</script>
<template>
  <button :class="style">
    <div :class="ico"></div>
  </button>
</template>
