// types/tariff.types.ts

export interface TariffOption {
    values: number[]
    price: number
}

export interface BooleanTariffOption {
    price: number
}

export interface TariffConfig {
    minutes: TariffOption
    sms: TariffOption
    internet: TariffOption
    wifiRouter: BooleanTariffOption
}

export interface Tariff {
    minutes: number
    sms: number
    internet: number
    wifiRouter: boolean
    totalPrice: number
}

export interface UserConfig {
    phone: string
    tariff: Tariff
}
