<script setup lang="ts">
import {defineEmits, defineProps, type Ref, watch} from 'vue'

interface Props {
  label: string;
  subLabel: string;
  options: Number[];
}

const props = defineProps<Props>()
const model = defineModel<number>({ required: true }) as Ref<number>
const emit = defineEmits(['update:modelValue']);

const roundToClosest = (value: number, values: number[]): number => {
  let closest = values[0];
  for (let i = 1; i < values.length; i++) {
    if (Math.abs(values[i] - value) < Math.abs(closest - value)) {
      closest = values[i];
    }
  }
  return closest;
}

function getPercentage(value: number, values: number[]): number {
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  return ((value - minValue) / (maxValue - minValue)) * 100;
}

const onInput = (event: Event) => {
  let newValue = (event.target as HTMLInputElement).valueAsNumber;
  newValue = Math.max(Math.min(newValue, Math.max(...props.options)), Math.min(...props.options));
  model.value = newValue;
}

const onChange = async () => {
  const roundedValue = roundToClosest(model.value, props.options)
  emit('update:modelValue', roundedValue)
}
</script>

<template>
  <div class="flex flex-col">
    <div class="text-[2rem]/[1] font-medium dark:text-white mb-[40px]">{{ label }}</div>
    <div class="slider-container mb-[30px]">
      <input
          type="range"
          :id="label"
          :min="Math.min(...props.options)"
          :max="Math.max(...props.options)"
          v-model="model"
          @input="onInput"
          @change="onChange"
          :step="1"
          class="slider mt-[25px]"
          :style="{'--progress': `${getPercentage(model, options)}%` }" />
    </div>

    <div class="flex justify-between text-[1.5rem]/[1] font-medium h-[1.5rem] dark:text-white me-2 relative">
      <span
          v-for="(value, index) in options"
          :key="index"
          :style="{
          left: `calc(${getPercentage(value, options)}%)`,
          position: 'absolute',
          transform: `translateX(calc(-${getPercentage(value, options)}%)`,
        }"
          class="flex gap-1 text-nowrap ml-2"
          :class="{'text-black dark:text-white': value !== roundToClosest(model, options) }"
      >
         {{`${value} ${value === roundToClosest(model, options) ? subLabel : ''}`}}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider-container {
  height: 60px;
}

.slider {
  appearance: none;
  width: 100%;
  height: 10px;
  background: linear-gradient(to right, black 0%, black var(--progress), #B8C6CF var(--progress), #B8C6CF 100%);
  border-radius: 3px;
  outline: none;
  transition: background 0.3s ease-in-out;
}

.slider:focus,
.slider:hover,
.slider:active {
  background: linear-gradient(to right, #7A5CFA 0%, #7A5CFA var(--progress), #B8C6CF var(--progress), #B8C6CF 100%);
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 60px;
  height: 60px;
  background-color: black;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease-in-out;

  background-image:
      url("data:image/svg+xml,%3Csvg width='10' height='18' viewBox='0 0 10 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.707106 9.70711L8.29289 17.2929C8.92286 17.9229 10 17.4767 10 16.5858V1.41421C10 0.523309 8.92286 0.0771408 8.29289 0.707106L0.707107 8.29289C0.316583 8.68342 0.316582 9.31658 0.707106 9.70711Z' fill='white'/%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg width='10' height='20' viewBox='0 0 10 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.29289 9.70711L1.70711 17.2929C1.07714 17.9229 0 17.4767 0 16.5858V1.41421C0 0.523309 1.07714 0.0771408 1.70711 0.707106L9.29289 8.29289C9.68342 8.68342 9.68342 9.31658 9.29289 9.70711Z' fill='white'/%3E%3C/svg%3E");
  background-repeat: no-repeat, no-repeat;
  background-position: 15px center, 35px center;
}

.slider:focus::-webkit-slider-thumb,
.slider:hover::-webkit-slider-thumb,
.slider:active::-webkit-slider-thumb {
  background-color: #7A5CFA;
}

.slider::-moz-range-thumb {
  width: 60px;
  height: 60px;
  background: black;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease-in-out;

  background-image:
      url("data:image/svg+xml,%3Csvg width='10' height='18' viewBox='0 0 10 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.707106 9.70711L8.29289 17.2929C8.92286 17.9229 10 17.4767 10 16.5858V1.41421C10 0.523309 8.92286 0.0771408 8.29289 0.707106L0.707107 8.29289C0.316583 8.68342 0.316582 9.31658 0.707106 9.70711Z' fill='white'/%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg width='10' height='20' viewBox='0 0 10 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.29289 9.70711L1.70711 17.2929C1.07714 17.9229 0 17.4767 0 16.5858V1.41421C0 0.523309 1.07714 0.0771408 1.70711 0.707106L9.29289 8.29289C9.68342 8.68342 9.68342 9.31658 9.29289 9.70711Z' fill='white'/%3E%3C/svg%3E");
  background-repeat: no-repeat, no-repeat;
  background-position: 15px center, 35px center;
}

.slider:focus::-moz-range-thumb,
.slider:hover::-moz-range-thumb,
.slider:active::-moz-range-thumb {
  background-color: #7A5CFA;
}

</style>