<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useThemeStore } from '@/stores/theme.ts'
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.ts'

const route = useRoute()
const themeStore = useThemeStore()

onMounted(() => {
    themeStore.applyThemeToDocument(themeStore.currentTheme)
})

useLifecycleLogger({ name: 'AppLayout' })
</script>

<template>
    <component :is="route.meta.layoutComponent || 'div'">
        <slot />
    </component>
</template>

<style scoped lang="scss"></style>
