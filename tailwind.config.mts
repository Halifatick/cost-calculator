import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'
import preLinePlugin from 'preline/plugin'

const tailwindConfig: Config = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/preline/preline.ts'],
    darkMode: 'selector',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {},
    plugins: [preLinePlugin],
}

export default tailwindConfig
