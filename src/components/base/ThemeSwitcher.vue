<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'

import { useThemeStore } from '@/stores/theme.ts'

const themeStore = useThemeStore()

const toggleTheme = (): void => {
    themeStore.toggleTheme()
}
</script>

<template>
    <a href="#" aria-label="Theme Switcher" @click.prevent="toggleTheme">
        <MoonIcon
            v-if="themeStore.currentTheme === 'light'"
            class="text-ternary-dark dark:text-ternary-light dark:hover:text-liBorder-primary-light size-10 hover:text-gray-400"
        />
        <SunIcon v-else class="size-10 text-gray-200 hover:text-gray-50" />
    </a>
</template>

<style scoped lang="scss"></style>
