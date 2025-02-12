<script setup lang="ts">
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.ts'
import { onMounted } from 'vue'
import { useTariffStore } from '@/stores/tariff.js'
import FormComponent from '@/components/base/FormComponent.vue'
import RangeComponent from '@/components/base/RangeComponent.vue'
import CheckboxComponent from '@/components/base/CheckboxComponent.vue'
import SubmitButton from '@/components/base/SubmitButton.vue'
import PhoneInput from '@/components/base/PhoneInput.vue'

const store = useTariffStore()

onMounted(() => {
  store.fetchTariffConfig()
})

useLifecycleLogger({ name: 'HomePage' })
</script>

<template>
  <div class="flex flex-col gap-[90px] pt-[120px]">
    <h2 class="text-[4rem]/[1] font-bold dark:text-white">Настройте тариф</h2>
    <FormComponent>

      <PhoneInput
          v-model="store.userConfig.phone"
          :isValid="store.isPhoneValid"
          :isSubmitted="store.isSubmitted"
      />
      <RangeComponent
          label="Минуты"
          subLabel="мин."
          v-model="store.userConfig.tariff.minutes"
          :options="store.config.minutes.values"
      />
      <RangeComponent
          label="СМС"
          subLabel="смс"
          v-model="store.userConfig.tariff.sms"
          :options="store.config.sms.values"
      />
      <RangeComponent
          label="Интернет"
          subLabel="ГБ"
          v-model="store.userConfig.tariff.internet"
          :options="store.config.internet.values"
      />
      <CheckboxComponent
          label="Wi-Fi роутер"
          :subLabel="`Аренда <b>${store.config.wifiRouter.price}</b> ₽/мес.`"
          v-model="store.userConfig.tariff.wifiRouter"
      />

      <SubmitButton
          :label="`<b>${store.totalPrice} ₽</b> в месяц`"
          :totalPrice="store.totalPrice"
          @click="store.submitForm"
      />

    </FormComponent>
  </div>
</template>

<style scoped lang="scss"></style>
