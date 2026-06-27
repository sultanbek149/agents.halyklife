<script setup lang="ts">
import { Download } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { slipPeriods, payslipPersonal, payslipGroup } from '~/data/demo'
import { formatMoney } from '~/lib/format'

const period = ref(slipPeriods[0]!.id)
const chips = slipPeriods.map((p) => ({ value: p.id, label: p.label }))

const parse = (s: string) => Number(s.replace(/\s/g, '').replace(',', '.')) || 0
const sum = (rows: { sum: string }[]) => rows.reduce((acc, r) => acc + parse(r.sum), 0)

const personalTotal = computed(() => sum(payslipPersonal))
const groupTotal = computed(() => sum(payslipGroup))
const grandTotal = computed(() => personalTotal.value + groupTotal.value)

function download() {
  toast.success('Готовим расчётный лист…')
}
</script>

<template>
  <div>
    <PageHeader title="Расчётный лист" subtitle="Личные и групповые начисления за период">
      <template #actions>
        <UiButton class="gap-2 rounded-xl font-semibold" @click="download">
          <Download :size="17" /> Скачать
        </UiButton>
      </template>
    </PageHeader>

    <FilterChips v-model="period" :chips="chips" class="mb-5" />

    <div class="mb-5 grid gap-4 sm:grid-cols-3">
      <SectionCard>
        <p class="text-[12.5px] text-muted-foreground">Личные начисления</p>
        <p class="mt-1 text-2xl font-extrabold tabular-nums text-ink">{{ formatMoney(personalTotal) }}</p>
      </SectionCard>
      <SectionCard>
        <p class="text-[12.5px] text-muted-foreground">Групповые начисления</p>
        <p class="mt-1 text-2xl font-extrabold tabular-nums text-ink">{{ formatMoney(groupTotal) }}</p>
      </SectionCard>
      <SectionCard emphasis>
        <p class="text-[12.5px] text-primary-foreground/80">Итого к выплате</p>
        <p class="mt-1 text-2xl font-extrabold tabular-nums text-primary-foreground">{{ formatMoney(grandTotal) }}</p>
      </SectionCard>
    </div>

    <div class="grid gap-5 lg:grid-cols-2">
      <SectionCard title="Личные продажи" :no-pad="true">
        <div class="px-5 pb-3 pt-1">
          <div class="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line pb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground/70">
            <span>Источник</span><span class="text-right">База × Ставка</span><span class="text-right">Сумма</span>
          </div>
          <div v-for="r in payslipPersonal" :key="r.label" class="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line py-2.5 last:border-0">
            <span class="text-[13px] font-medium text-ink">{{ r.label }}</span>
            <span class="text-right text-[12.5px] tabular-nums text-muted-foreground">{{ r.base }} ₸ × {{ r.rate }}</span>
            <span class="text-right text-[13px] font-bold tabular-nums text-ink">{{ r.sum }} ₸</span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Групповые (структура)" :no-pad="true">
        <div class="px-5 pb-3 pt-1">
          <div class="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line pb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground/70">
            <span>Источник</span><span class="text-right">База × Ставка</span><span class="text-right">Сумма</span>
          </div>
          <div v-for="r in payslipGroup" :key="r.label" class="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line py-2.5 last:border-0">
            <span class="text-[13px] font-medium text-ink">{{ r.label }}</span>
            <span class="text-right text-[12.5px] tabular-nums text-muted-foreground">{{ r.base }} ₸ × {{ r.rate }}</span>
            <span class="text-right text-[13px] font-bold tabular-nums text-ink">{{ r.sum }} ₸</span>
          </div>
        </div>
      </SectionCard>
    </div>
  </div>
</template>
