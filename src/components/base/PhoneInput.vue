<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";

interface Props {
  isValid: boolean;
  isSubmitted: boolean;
}

const phone = defineModel<string | undefined>()

const props = defineProps<Props>()

const inputClass = computed(() =>
    !props.isValid && props.isSubmitted ? "border-custom-red error" : "border-custom-gray"
);
</script>

<template>
  <div class="flex flex-col w-1/4">
    <div class="text-[2rem]/[1] font-medium dark:text-white mb-[40px]">Телефон</div>
    <input
        id="phone"
        type="tel"
        class="py-3.75 pl-4 pr-12 text-[1.5rem]/[1] bg-white border rounded-md focus:outline-none mb-[10px]"
        :class="inputClass"
        placeholder="+7 (____) ___-__-__"
        v-model="phone"
        v-mask="['+7 (###) ###-##-##']"
    />
    <p v-if="!isValid && isSubmitted" class="text-xs text-custom-red">Некорректный номер</p>
    <p v-else class="text-xs text-custom-gray dark:text-white">Обязательное поле</p>
  </div>
</template>

<style scoped lang="scss">
input {
  background-position: right 10px center;
  background-repeat: no-repeat;
}

input.error {
  background-image: url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="%23EB5757"/%3E%3C/svg%3E');
}
</style>