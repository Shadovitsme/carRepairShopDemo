<script setup>
const props = defineProps({
  text: { type: String, required: false },
  color: { type: String, required: true },
  iconFirst: { type: String, required: false },
  iconSecond: { type: String, required: false },
  medium: { type: Boolean, required: false },
  large: { type: Boolean, required: false },
})

const colorArray = [
  'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-200 text-white',

  'bg-gray-400 hover:bg-gray-500 active:bg-gray-600 disable:bg-gray-300 text-white',

  'bg-gray-700 hover:bg-gray-800 active:bg-gray-700 disable:bg-gray-700 disable:text-gray-400 text-white',

  'bg-white text-main-black active:text-main-black hover:text-blue-600 disable:text-gray-400',

  'bg-pink-500 hover:bg-pink-600 active:bg-pink-700 disable:bg-pink-100 disable:text-gray-400 text-white',

  'bg-blue-100 text-gray-700',
]

let bgColor
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
  case 'sortColor':
    bgColor = colorArray[5]
    break
}

let size = ''

if (props.medium) {
  size = ' h-10  tablet:h-12 tablet:px-6 px-4'
} else if (props.large) {
  size = ' h-12 tablet:h-12 tablet:px-6 px-4'
} else {
  size = ' h-9 tablet:h-12 tablet:px-6 px-4'
}
// TODO сделать так чтобы иконки на кнопке тоже меняли цвет при наведении
let textStyle = ' pt-px break-keep w-full my-auto mx-auto '
let colorType = ' rounded-3xl button1 ' + bgColor + size

if (props.iconFirst) {
  textStyle += 'ml-2 '
}
if (props.iconSecond) {
  textStyle += 'mr-2 '
}
</script>

<template>
  <button :class="colorType">
    <div class="flex">
      <img v-if="props.iconFirst" class="my-auto" :src="props.iconFirst" />
      <p :class="textStyle">{{ text }}</p>
      <img v-if="props.iconSecond" class="my-auto" :src="props.iconSecond" />
    </div>
  </button>
</template>
