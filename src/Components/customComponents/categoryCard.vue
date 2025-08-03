<script setup>
import cusotomButton from './cusotomButton.vue'

const props = defineProps(['name', 'price', 'href'])
let description
switch (props.name) {
  case 'Абразив':
    description =
      'Материалы для обработки поверхностей — от грубой зачистки до финальной полировки.'
    break
  case 'Вклейка стекл':
    description =
      'Материалы для обработки поверхностей — от грубой зачистки до финальной полировки.'
    break
  case 'Герметики':
    description = 'Герметизирующие материалы для защиты от влаги, воздуха и химических воздействий.'
    break
  case 'Грунты':
    description = 'Основа качественной отделки: составы для подготовки поверхностей.'
    break
  case 'Комбенизоны':
    description = 'Одежда для работы в условиях загрязнённости, с химическими материалами.'
    break
  case 'Краски':
    description = 'Широкий выбор красок для любых задач, включая специализированные покрытия.'
    break
  case 'Лаки':
    description = 'Прозрачные покрытия для защиты и придания блеска поверхностям.'
    break
  case 'Маскировка':
    description = 'Материалы для защиты поверхностей при проведении ремонтных и покрасочных работ.'
    break
  case 'Обезжириватели':
    description = 'Средства для подготовки поверхностей перед окрашиванием и ремонтом.'
    break
  case 'Полировка':
    description = 'Продукты для придания поверхностям блеска и устранения мелких дефектов.'
    break
  case 'Разбавитель':
    description = 'Качественные составы для корректировки вязкости лакокрасочных материалов.'
    break
  case 'Растворители':
    description = 'Надёжные средства для удаления остатков красок, лаков и клеев.'
    break
  case 'Средства защиты кузова':
    description =
      'Материалы для предотвращения коррозии и защиты автомобиля от внешних воздействий.'
    break
  case 'Индивидуальная защита':
    description = 'Маски, перчатки и другие изделия для безопасной работы.'
    break
  case 'Тара':
    description = 'Маски, перчатки и другие изделия для безопасной работы.'
    break
  case 'Шпатлевка':
    description = 'Качественные составы для выравнивания поверхностей и устранения дефектов.'
    break
  case 'Прочее':
    description = 'Дополнительные материалы, необходимые для выполнения ремонтных работ.'
    break
  default:
    break
}
</script>
<template>
  <RouterLink :to="props.href">
    <div
      class="w-38 relative tablet:w-[17.375rem] desktop:w-[20.875rem] h-full overflow-hidden rounded-[10px] bg-blue-100"
    >
      <img
        class="w-full h-28.25 tablet:h-[12.375rem] object-cover"
        src="https://www.zapcar.ru/upload/iblock/c25/kcx3rbgrf701zkufbuxgt9a3rff31cbr/1646407335_11_kartinkin_net_p_avtozapchasti_kartinki_13.png"
      />
      <div class="w-full px-1.5 tablet:px-3 tablet:pt-5 desktop:px-3 pb-7 pt-3 desktop:pt-5">
        <p class="H8 font-bold text-main-textBlueDark mb-2">
          {{ props.name }}
        </p>
        <p class="p3 hidden tablet:block tablet:mb-12 text-main-textBlue">
          {{ description }}
        </p>
      </div>
      <div class="flex justify-between absolute bottom-2 px-1.5 tablet:px-3 w-full">
        <p class="my-auto p1 text-main-textBlueDark">
          {{ props.price }}
        </p>
        <cusotomButton
          class="hidden tablet:visible tablet:inline-block"
          color="blue"
          text="Перейти"
        ></cusotomButton>
      </div>
    </div>
  </RouterLink>
</template>
