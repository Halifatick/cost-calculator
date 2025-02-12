<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  label: string;
  totalPrice: number;
}>();

const emit = defineEmits<{
  (event: 'click'): void;
}>();
</script>

<template>
  <div class="flex items-center">
    <button type="button" role="button" @click="emit('click')"
            class="bg-custom-purple text-[1.5rem]/[1] text-white pl-7.5 pr-7.5 py-8.25 rounded-2xl hover:bg-gray-800 dark:hover:text-black dark:hover:bg-white active:bg-black dark:active:text-black dark:active:bg-gray-300">
      <span v-html="label"></span>
    </button>
  </div>
</template>

<style scoped lang="scss">

</style>