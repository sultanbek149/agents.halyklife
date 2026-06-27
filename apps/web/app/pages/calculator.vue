<script setup lang="ts">
import { ref } from 'vue'
import { calcProducts, calcYears } from '~/data/demo'
import { formatMoney, formatUnits } from '~/lib/format'

const product = ref(calcProducts[0]?.id ?? '')
const premium = ref<number>(180000)
const term = ref<number>(3)
const year = ref(calcYears[1]?.id ?? '')

const baseRate = 4900 // базовая ставка уровня 5 (ВНД-19-04)
const result = ref<{ units: number; commission: number; k: number } | null>(null)

function runCalc() {
  const k = calcYears.find((y) => y.id === year.value)?.k ?? 1
  const units = Math.round((Number(premium.value) / 1000) * Number(term.value) * k * 100) / 100
  const commission = Math.round(units * baseRate)
  result.value = { units, commission, k }
}
</script>

<template>
  <div>
    <PageHeader title="Калькулятор вознаграждения" subtitle="Расчёт по формуле ВНД-19-04 (демо)" />

    <div class="grid gap-5 lg:grid-cols-2">
      <!-- Параметры -->
      <SectionCard title="Параметры расчёта">
        <div class="space-y-5">
          <div>
            <UiLabel class="mb-2 block text-[12px] font-semibold text-muted-foreground">Продукт</UiLabel>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="p in calcProducts"
                :key="p.id"
                type="button"
                class="rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition"
                :class="product === p.id ? 'border-transparent bg-brand text-white' : 'border-line bg-card text-muted-foreground hover:bg-soft'"
                @click="product = p.id"
              >
                {{ p.name }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <UiLabel class="mb-2 block text-[12px] font-semibold text-muted-foreground">Премия, ₸</UiLabel>
              <UiInput v-model="premium" type="number" />
            </div>
            <div>
              <UiLabel class="mb-2 block text-[12px] font-semibold text-muted-foreground">Срок, лет</UiLabel>
              <UiInput v-model="term" type="number" />
            </div>
          </div>

          <div>
            <UiLabel class="mb-2 block text-[12px] font-semibold text-muted-foreground">Год страхования</UiLabel>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="y in calcYears"
                :key="y.id"
                type="button"
                class="rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition"
                :class="year === y.id ? 'border-transparent bg-brand text-white' : 'border-line bg-card text-muted-foreground hover:bg-soft'"
                @click="year = y.id"
              >
                {{ y.label }} · K={{ y.k }}
              </button>
            </div>
          </div>

          <UiButton class="w-full rounded-xl font-semibold" @click="runCalc">Рассчитать</UiButton>
        </div>
      </SectionCard>

      <!-- Результат -->
      <SectionCard title="Результат">
        <div v-if="result" class="space-y-4 animate-hl-fade">
          <StatTile label="Единиц начислено" :value="formatUnits(result.units)" tone="brand" />
          <div class="rounded-2xl bg-brand p-5 text-white">
            <p class="text-[12.5px] opacity-90">Вознаграждение (K={{ result.k }})</p>
            <p class="mt-1 text-3xl font-extrabold tabular-nums">{{ formatMoney(result.commission) }}</p>
          </div>
          <p class="text-[12px] text-muted-foreground">
            Демонстрационный расчёт. Итог зависит от уровня агента и спец-коэффициента.
          </p>
        </div>
        <EmptyState
          v-else
          icon="calculator"
          title="Заполните параметры"
          body="Укажите продукт, премию и срок, затем нажмите «Рассчитать»."
        />
      </SectionCard>
    </div>
  </div>
</template>
