import type { Router } from 'vue-router'
import type { IStaticMethods } from 'preline'

declare global {
    interface Window {
        HSStaticMethods: IStaticMethods
    }
}

export default (router: Router): void => {
    router.afterEach((_to, _from, failure) => {
        if (!failure) {
            setTimeout(() => {
                window.HSStaticMethods.autoInit()
            }, 100)
        }
    })
}
