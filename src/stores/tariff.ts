import {defineStore} from 'pinia';
import {computed, ref, type Ref} from 'vue';
import type {TariffConfig, UserConfig} from '@/types/tariff.types.js'

class TariffStorage {
    private static readonly storageKey = 'tariffData';

    static getDefaultConfig(): TariffConfig {
        return {
            minutes: { values: [100, 200, 300, 600], price: 0 },
            sms: { values: [0, 50, 100, 150], price: 0 },
            internet: { values: [5, 10, 15, 25], price: 0 },
            wifiRouter: { price: 0 },
        };
    }

    static getFetchConfig(): TariffConfig {
        return {
            minutes: { values: [100, 200, 300, 600], price: 2 },
            sms: { values: [0, 50, 100, 150], price: 3 },
            internet: { values: [5, 10, 15, 25], price: 10 },
            wifiRouter: { price: 99 },
        };
    }

    static getDefaultUserConfig(): UserConfig {
        return {
            phone: '',
            tariff: {
                minutes: 300,
                sms: 100,
                internet: 15,
                wifiRouter: false,
                totalPrice: 0,
            },
        }
    }

    static save(userConfig: UserConfig): void {
        localStorage.setItem(this.storageKey, JSON.stringify(userConfig))
    }

    static load(): UserConfig {
        const storedData = localStorage.getItem(this.storageKey)
        return storedData ? JSON.parse(storedData) : this.getDefaultUserConfig()
    }
}

export const useTariffStore = defineStore<'tariff', {
    config: Ref<TariffConfig>
    userConfig: Ref<UserConfig>
    totalPrice: Ref<number>
    isPhoneValid: Ref<boolean>
    isSubmitted: Ref<boolean>
    fetchTariffConfig: () => void
    updateUserConfig: (newUserConfig: Partial<UserConfig>) => void
    updateUserPhone: (phone: string) => void
    saveUserConfig: () => void
    submitForm: () => void
}>('tariff', () => {
    const storedUserConfig = TariffStorage.load()

    const config: Ref<TariffConfig> = ref(TariffStorage.getDefaultConfig())

    const userConfig: Ref<UserConfig> = ref(storedUserConfig)

    const isSubmitted: Ref<boolean> = ref(false)

    const isValidValue = (value: number, values: number[]): boolean => {
        return values.includes(value)
    }

    const totalPrice = computed(() => {
        const { minutes, sms, internet, wifiRouter } = userConfig.value.tariff

        const isValidMinutes = isValidValue(minutes, config.value.minutes.values)
        const isValidSms = isValidValue(sms, config.value.sms.values)
        const isValidInternet = isValidValue(internet, config.value.internet.values)
        const isValidWifiRouter = wifiRouter || !wifiRouter

        if (isValidMinutes && isValidSms && isValidInternet && isValidWifiRouter) {
            let price =
                minutes * config.value.minutes.price +
                sms * config.value.sms.price +
                internet * config.value.internet.price

            if (wifiRouter) {
                price += config.value.wifiRouter.price
            }

            userConfig.value.tariff.totalPrice = price
            return price
        }

        return userConfig.value.tariff.totalPrice
    })


    const isPhoneValid: Ref<boolean> = computed(() => {
        const phoneWithoutSymbols = userConfig.value.phone.replace(/[^\d+]/g, '');
        if (!isSubmitted.value) {
            return true;
        }
        return /^(\+7)\d{10}$/.test(phoneWithoutSymbols);
    });


    const fetchTariffConfig = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            config.value = TariffStorage.getFetchConfig()
        } catch (error) {
            console.error('Ошибка при загрузке конфигурации тарифа:', error)
        }
    }

    const updateUserConfig = (newUserConfig: Partial<UserConfig>): void => {
        userConfig.value = { ...userConfig.value, ...newUserConfig }
    }

    const updateUserPhone = (phone: string): void => {
        userConfig.value.phone = phone
    }

    const saveUserConfig = () => {
        TariffStorage.save(userConfig.value)
    }

    const submitForm = () => {
        isSubmitted.value = true

        if (!isPhoneValid.value) {
            return
        }

        alert(JSON.stringify(userConfig.value, null, 2))
        saveUserConfig()
    }

    return {
        config,
        userConfig,
        totalPrice,
        isPhoneValid,
        isSubmitted,
        fetchTariffConfig,
        updateUserConfig,
        updateUserPhone,
        saveUserConfig,
        submitForm
    }

});
