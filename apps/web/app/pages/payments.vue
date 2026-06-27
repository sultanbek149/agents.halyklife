<script setup lang="ts">
import { toast } from 'vue-sonner'
import { unrecPayments, recPayments } from '~/data/demo'

const tab = ref('unrec')
const segments = computed(() => [
  { value: 'unrec', label: 'Нераспознанные', count: unrecPayments.length },
  { value: 'rec', label: 'Распознанные' },
])
function delegate(id: string) {
  toast.success('Платёж делегирован')
}
</script>

<template>
  <div>
    <PageHeader title="Оплаты" subtitle="Распознанные и нераспознанные платежи вашей ветки" />

    <SegmentedTabs v-model="tab" :segments="segments" class="mb-4" />

    <!-- Нераспознанные -->
    <div v-if="tab === 'unrec'" class="space-y-4">
      <HintBanner tone="warm" icon="alert">
        Платежи без списка требуют распознавания — назначьте обработку агенту вашей ветки.
      </HintBanner>

      <SectionCard :no-pad="true">
        <div class="overflow-x-auto">
          <div class="grid grid-cols-[1.4fr_120px_120px_140px_150px_150px] items-center gap-3 border-b border-line bg-soft/60 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            <span>ID платежа</span><span>Сумма</span><span>Дата</span><span>Источник</span><span>Статус</span><span></span>
          </div>
          <div
            v-for="p in unrecPayments"
            :key="p.statement"
            class="grid grid-cols-[1.4fr_120px_120px_140px_150px_150px] items-center gap-3 border-b border-line px-5 py-3 transition last:border-0 hover:bg-soft/40"
          >
            <span class="truncate font-mono text-[12.5px] text-ink">{{ p.statement }}</span>
            <span class="text-[13.5px] font-bold tabular-nums text-ink">{{ p.amount }} ₸</span>
            <span class="text-[13px] tabular-nums text-muted-foreground">{{ p.date }}</span>
            <span class="text-[13px] text-muted-foreground">{{ p.source }}</span>
            <StatusBadge :label="p.status" :tone="p.tone" />
            <UiButton size="sm" variant="outline" class="font-semibold" @click="delegate(p.statement)">Делегировать</UiButton>
          </div>
        </div>
      </SectionCard>
    </div>

    <!-- Распознанные -->
    <SectionCard v-else :no-pad="true">
      <div class="overflow-x-auto">
        <div class="grid grid-cols-[1.4fr_1.2fr_120px_120px_140px] items-center gap-3 border-b border-line bg-soft/60 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          <span>Полис</span><span>Клиент</span><span>Сумма</span><span>Дата</span><span>Статус</span>
        </div>
        <div
          v-for="p in recPayments"
          :key="p.policyNo"
          class="grid grid-cols-[1.4fr_1.2fr_120px_120px_140px] items-center gap-3 border-b border-line px-5 py-3 transition last:border-0 hover:bg-soft/40"
        >
          <span class="truncate font-mono text-[12.5px] text-ink">{{ p.policyNo }}</span>
          <span class="truncate text-[13px] text-ink">{{ p.client }}</span>
          <span class="text-[13.5px] font-bold tabular-nums text-ink">{{ p.amount }} ₸</span>
          <span class="text-[13px] tabular-nums text-muted-foreground">{{ p.date }}</span>
          <StatusBadge label="Распознан" tone="green" />
        </div>
      </div>
    </SectionCard>
  </div>
</template>
