import cloneDeepLodash from 'lodash.clonedeep'

export const setAsyncTimer = async ({ time }: { time: number }): Promise<void> => {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, Math.max(0, time))
    })
}

export const cloneDeep = <T>(payload: T): T => {
    return cloneDeepLodash(payload)
}
