import type { Plugin } from 'vue'
import VueTheMask, { mask } from 'vue-the-mask'

const maskPlugin = VueTheMask

export const MaskPlugin: Plugin = {
    install(app) {
        app.use(maskPlugin)
    },
}

export const MaskDirective: Plugin  = {
    install(app) {
        app.directive('mask', mask)
    },
}