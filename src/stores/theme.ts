import { type Ref, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

interface ThemeState {
    currentTheme: Ref<Theme>
}

interface ThemeActions {
    toggleTheme: () => void
    applyThemeToDocument: (theme: Theme) => void
}

class ThemeStorage {
    private static readonly storageKey = 'theme'

    private static defaultTheme: Theme = Theme.Dark

    private static isValidTheme(theme: unknown): theme is Theme {
        return Object.values(Theme).includes(theme as Theme)
    }

    private static setDefaultTheme(): Theme {
        this.setTheme(this.defaultTheme)
        return this.defaultTheme
    }

    static getTheme(): Theme {
        const savedTheme = localStorage.getItem(this.storageKey) as Theme | null
        return this.isValidTheme(savedTheme) ? (savedTheme as Theme) : this.setDefaultTheme()
    }

    static setTheme(theme: Theme): void {
        localStorage.setItem(this.storageKey, theme)
    }
}

export const useThemeStore = defineStore<'theme', ThemeState & ThemeActions>('theme', () => {
    const currentTheme = ref<Theme>(ThemeStorage.getTheme())

    const applyThemeToDocument = (theme: Theme): void => {
        const rootElement = document.documentElement
        rootElement.classList.toggle(Theme.Dark, theme === Theme.Dark)
    }

    const toggleTheme = (): void => {
        currentTheme.value = currentTheme.value === Theme.Dark ? Theme.Light : Theme.Dark
        ThemeStorage.setTheme(currentTheme.value)
        applyThemeToDocument(currentTheme.value)
    }

    watch(currentTheme, (newTheme: Theme): void => {
        ThemeStorage.setTheme(newTheme)
    })

    return {
        currentTheme,
        toggleTheme,
        applyThemeToDocument,
    }
})
