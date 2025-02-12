<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  label: string;
  subLabel: string;
  modelValue: boolean;
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
  <div class="mb-4 flex flex-col">
    <div class="text-[2rem]/[1] font-medium dark:text-white mb-[40px]">{{ label }}</div>
    <div class="flex ">
      <input type="checkbox"
             class="custom-checkbox"
             :id="label"
             :checked="modelValue"
             @change="emit('update:modelValue', $event.target.checked)"
      />
      <label class="text-[1.5rem]/[1] dark:text-white" :for="label">
        <span v-html="subLabel">
        </span>
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.custom-checkbox+label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.custom-checkbox+label::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #B8C6CF;
  border-radius: 0.375rem;
  margin-right: 1rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.custom-checkbox:checked+label::before {
  border-color: #7A5CFA;
  background-color: #7A5CFA;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
/* стили при наведении курсора на checkbox */
.custom-checkbox:not(:disabled):not(:checked)+label:hover::before {
  border-color: #a998ef;
}
/* стили для активного состояния чекбокса (при нажатии на него) */
.custom-checkbox:not(:disabled):active+label::before {
  background-color: #B8C6CF;
  border-color: #B8C6CF;
}
/* стили для чекбокса, находящегося в фокусе */
.custom-checkbox:focus+label::before {
  box-shadow: 0 0 0 0.2rem rgba(122, 92, 250, 0.25);
}
/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox:focus:not(:checked)+label::before {
  border-color: #a998ef;
}
/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox:disabled+label::before {
  background-color: #e9ecef;
}
</style>
