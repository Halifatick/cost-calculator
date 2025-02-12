<script setup lang="ts">
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.ts'
import ThemeSwitcher from "@/components/base/ThemeSwitcher.vue";

useLifecycleLogger({ name: 'AppLayoutDefault' })
</script>

<template>
    <main class="flex flex-auto">
        <div class="container mx-auto">
            <slot />
        </div>
        <ThemeSwitcher class="absolute top-4 right-4"/>
    </main>
</template>

<style scoped lang="scss">

</style>
