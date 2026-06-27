<script setup lang="ts">
import { Phone } from '@lucide/vue'
import { funnel, risks, funnelBars, type RiskRow } from '~/data/demo'
import { formatMoney } from '~/lib/format'

const selected = ref('all')
function pick(key: string) {
  selected.value = selected.value === key ? 'all' : key
}
const filtered = computed<RiskRow[]>(() => {
  if (selected.value === 'risk' || selected.value === 'overdue') return risks.filter((r) => r.riskLevel === 'red')
  return risks
})

const borderColor: Record<RiskRow['riskLevel'], string> = { red: '#D43A3A', yellow: '#E0A21B', green: '#2aa65c' }
const badgeTone: Record<RiskRow['riskLevel'], 'red' | 'amber' | 'green'> = { red: 'red', yellow: 'amber', green: 'green' }
const probColor = (p: number) => (p >= 70 ? 'text-danger' : p >= 40 ? 'text-amber' : 'text-brand')

const open = ref(false)
const current = ref<RiskRow | null>(null)
function openClient(r: RiskRow) {
  current.value = r
  open.value = true
}
const schedule = [
  { date: '01.05.2026', amount: 20000, label: 'Оплачено', tone: 'bg-brand' },
  { date: '01.06.2026', amount: 20000, label: 'Просрочено', tone: 'bg-danger' },
  { date: '01.07.2026', amount: 20000, label: 'Предстоит', tone: 'bg-[#C7D2CC]' },
]
</script>

<template>
  <div>
    <PageHeader title="Клиенты и договоры" subtitle="Только клиенты вашей ветки — данные из INSIS" />

    <!-- Воронка KPI -->
    <div class="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      <StatTile
        v-for="f in funnel"
        :key="f.key"
        :label="f.label"
        :value="f.count"
        :tone="f.tone"
        clickable
        :active="selected === f.key"
        @click="pick(f.key)"
      />
    </div>

    <div class="grid gap-5 lg:grid-cols-3">
      <!-- Риск-светофор -->
      <SectionCard title="Риск-светофор просрочек" subtitle="Вероятность невыполнения обязательств" class="lg:col-span-2" :no-pad="true">
        <ul>
          <li
            v-for="(r, i) in filtered"
            :key="r.policyNo"
            class="flex cursor-pointer items-center gap-4 border-l-[3px] px-5 py-3.5 transition hover:bg-soft/40"
            :class="i < filtered.length - 1 ? 'border-b border-b-line' : ''"
            :style="{ borderLeftColor: borderColor[r.riskLevel] }"
            @click="openClient(r)"
          >
            <div class="min-w-0 flex-1">
              <p class="truncate text-[13.5px] font-bold text-ink">{{ r.clientName }}</p>
              <p class="truncate font-mono text-[11.5px] text-muted-foreground">{{ r.policyNo }} · {{ r.product }}</p>
            </div>
            <div class="hidden text-right sm:block">
              <p class="text-[13px] font-bold tabular-nums text-ink">{{ formatMoney(r.premium) }}</p>
              <p class="text-[11.5px] text-muted-foreground">до {{ r.nextPay }}</p>
            </div>
            <div :class="['flex w-16 items-center justify-end gap-1 text-[13px] font-extrabold tabular-nums', probColor(r.prob)]"><AppIcon name="gauge" :size="13" />{{ r.prob }}%</div>
            <StatusBadge :label="r.stateName ?? ''" :tone="badgeTone[r.riskLevel]" />
          </li>
        </ul>
      </SectionCard>

      <!-- Воронка договоров -->
      <SectionCard title="Воронка договоров" class="lg:col-span-1">
        <div class="space-y-4">
          <ProgressBar v-for="b in funnelBars" :key="b.label" :pct="b.pct" :label="b.label" :right="String(b.value)" />
        </div>
        <p class="mt-4 rounded-lg bg-brand-12 px-3 py-2 text-[12px] font-medium text-brand-ink">
          Конверсия заявка → оплата: 41%
        </p>
      </SectionCard>
    </div>

    <!-- Карточка клиента -->
    <UiDialog v-model:open="open">
      <UiDialogContent class="sm:max-w-[480px]">
        <UiDialogHeader>
          <UiDialogTitle>Карточка клиента</UiDialogTitle>
        </UiDialogHeader>
        <div v-if="current" class="space-y-4">
          <div class="flex items-center gap-3">
            <InitialsAvatar :name="current.clientName" :size="46" solid />
            <div>
              <p class="text-[15px] font-bold text-ink">{{ current.clientName }}</p>
              <p class="font-mono text-[12px] text-muted-foreground">{{ current.policyNo }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <StatTile label="Продукт" :value="current.product" tone="neutral" />
            <StatTile label="Премия" :value="formatMoney(current.premium)" tone="brand" />
          </div>
          <div>
            <p class="mb-1.5 text-[12px] font-semibold text-muted-foreground">Вероятность просрочки</p>
            <ProgressBar :pct="current.prob" :right="`${current.prob}%`" :color="current.prob >= 70 ? '#D43A3A' : current.prob >= 40 ? '#E0A21B' : '#2aa65c'" />
          </div>
          <div>
            <p class="mb-2 text-[12px] font-semibold text-muted-foreground">График оплат</p>
            <ul class="space-y-2">
              <li v-for="s in schedule" :key="s.date" class="flex items-center gap-3 text-[13px]">
                <span :class="['size-2.5 rounded-full', s.tone]" />
                <span class="tabular-nums text-muted-foreground">{{ s.date }}</span>
                <span class="font-semibold tabular-nums text-ink">{{ formatMoney(s.amount) }}</span>
                <span class="ml-auto text-[12px] text-muted-foreground">{{ s.label }}</span>
              </li>
            </ul>
          </div>
        </div>
        <UiDialogFooter>
          <UiButton class="gap-2 font-semibold text-white" style="background:#25D366" @click="open = false"><AppIcon name="message" :size="15" /> WhatsApp</UiButton>
          <UiButton variant="outline" class="gap-2 font-semibold" @click="open = false"><Phone :size="15" /> Позвонить</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
