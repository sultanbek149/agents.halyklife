<script setup lang="ts">
import { Search, Sparkles } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { registry, regCities, downAgents, type RegOrg } from '~/data/demo'
import { formatMoney } from '~/lib/format'

const query = ref('')
const listType = ref('all')
const city = ref('all')

const listChips = [
  { value: 'all', label: 'Все' },
  { value: 'none', label: 'Нет списка' },
  { value: 'mt102', label: 'MT102' },
  { value: 'partial', label: 'Частично' },
]
const agingTone: Record<RegOrg['aging'], 'green' | 'amber' | 'red'> = { green: 'green', amber: 'amber', red: 'red' }

const filtered = computed(() =>
  registry.filter((r) => {
    if (listType.value !== 'all' && r.list !== listType.value) return false
    if (city.value !== 'all' && r.city !== city.value) return false
    if (query.value && !`${r.org} ${r.bin} ${r.payNo}`.toLowerCase().includes(query.value.toLowerCase())) return false
    return true
  }),
)

const sel = reactive<Set<string>>(new Set())
const toggleSel = (id: string) => (sel.has(id) ? sel.delete(id) : sel.add(id))
const allSelected = computed(() => filtered.value.length > 0 && filtered.value.every((r) => sel.has(r.id)))
function toggleAll() {
  if (allSelected.value) filtered.value.forEach((r) => sel.delete(r.id))
  else filtered.value.forEach((r) => sel.add(r.id))
}
const selSum = computed(() =>
  registry.filter((r) => sel.has(r.id)).reduce((s, r) => s + r.total, 0),
)
const totalSum = computed(() => filtered.value.reduce((s, r) => s + r.total, 0))

// Кейс по платежу
const caseOpen = ref(false)
const caseRow = ref<RegOrg | null>(null)
const caseTab = ref<'dist' | 'request'>('dist')
const employees = ref<{ id: string; name: string; iin: string; premium: number; on: boolean }[]>([])
function openCase(r: RegOrg) {
  caseRow.value = r
  caseTab.value = 'dist'
  employees.value = downAgents.slice(0, 4).map((a, i) => ({
    id: a.agId, name: a.name, iin: `${850000000000 + i * 137}`, premium: Math.round(r.total / (4 - (i % 2))), on: false,
  }))
  caseOpen.value = true
}
const autoFill = () => employees.value.forEach((e) => (e.on = true))
const distSum = computed(() => employees.value.filter((e) => e.on).reduce((s, e) => s + e.premium, 0))
function distribute() {
  toast.success('Платёж распределён и распознан')
  caseOpen.value = false
}
function bulkDelegate() {
  toast.success(`Делегировано платежей: ${sel.size}`)
  sel.clear()
}
</script>

<template>
  <div class="pb-20">
    <PageHeader title="Нераспознанные платежи" subtitle="Реестр входящих платежей без распознавания" />

    <HintBanner tone="warm" icon="alert" class="mb-4">
      Платежи без списка «висят» на счёте. Распознайте вручную или делегируйте обработку агенту ветки.
    </HintBanner>

    <!-- Фильтры -->
    <div class="mb-4 space-y-3">
      <div class="relative max-w-md">
        <Search :size="16" class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          v-model="query"
          placeholder="Организация, БИН или № платежа"
          class="h-10 w-full rounded-xl border border-line bg-card pl-10 pr-3 text-[13.5px] outline-none focus:border-brand/40 focus:ring-2 focus:ring-ring"
        />
      </div>
      <FilterChips v-model="listType" :chips="listChips" />
      <div class="flex gap-2 overflow-x-auto pb-1">
        <button
          class="shrink-0 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition"
          :class="city === 'all' ? 'border-transparent bg-ink text-white' : 'border-line bg-card text-muted-foreground hover:bg-soft'"
          @click="city = 'all'"
        >Все города</button>
        <button
          v-for="c in regCities"
          :key="c"
          class="shrink-0 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition"
          :class="city === c ? 'border-transparent bg-ink text-white' : 'border-line bg-card text-muted-foreground hover:bg-soft'"
          @click="city = c"
        >{{ c }}</button>
      </div>
    </div>

    <!-- Сводка -->
    <div class="mb-2 flex items-center justify-between px-1 text-[12.5px] text-muted-foreground">
      <span>Найдено: <b class="text-ink">{{ filtered.length }}</b> · сумма <b class="text-ink tabular-nums">{{ formatMoney(totalSum) }}</b></span>
      <button class="font-semibold text-brand" @click="toggleAll">{{ allSelected ? 'Снять выбор' : 'Выбрать все' }}</button>
    </div>

    <SectionCard :no-pad="true">
      <div v-if="filtered.length" class="overflow-x-auto">
        <div class="grid grid-cols-[40px_1.8fr_1.1fr_140px_150px_120px] items-center gap-3 border-b border-line bg-soft/60 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          <span></span><span>Организация</span><span>Город / регион</span><span>Сумма / к распозн.</span><span>Список</span><span></span>
        </div>
        <div
          v-for="r in filtered"
          :key="r.id"
          class="grid grid-cols-[40px_1.8fr_1.1fr_140px_150px_120px] items-center gap-3 border-b border-line px-5 py-3 transition last:border-0 hover:bg-soft/40"
          :class="sel.has(r.id) ? 'bg-brand-12/40' : ''"
        >
          <input type="checkbox" :checked="sel.has(r.id)" class="size-4 accent-[var(--brand)]" @change="toggleSel(r.id)" />
          <div class="min-w-0">
            <p class="truncate text-[13px] font-semibold text-ink">{{ r.org }}</p>
            <p class="truncate font-mono text-[11px] text-muted-foreground">БИН {{ r.bin }} · №{{ r.payNo }}</p>
          </div>
          <div class="min-w-0 text-[12.5px]">
            <p class="text-ink">{{ r.city }}</p>
            <p class="text-muted-foreground">{{ r.region }}</p>
          </div>
          <div class="text-[12.5px]">
            <p class="font-bold tabular-nums text-ink">{{ formatMoney(r.total) }}</p>
            <p class="tabular-nums text-muted-foreground">{{ formatMoney(r.planned) }}</p>
          </div>
          <StatusBadge :label="r.agingLabel" :tone="agingTone[r.aging]" />
          <UiButton size="sm" variant="outline" class="font-semibold" @click="openCase(r)">Открыть →</UiButton>
        </div>
      </div>
      <EmptyState v-else icon="search" title="Ничего не найдено" body="Измените фильтры или поисковый запрос." />
    </SectionCard>

    <!-- Bulk-бар -->
    <Transition name="fade">
      <div
        v-if="sel.size"
        class="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-2xl bg-ink px-5 py-3.5 text-white shadow-[0_18px_44px_rgba(10,40,30,.4)]"
      >
        <span class="text-[13px]">Выбрано: <b class="tabular-nums">{{ sel.size }}</b> · <b class="tabular-nums">{{ formatMoney(selSum) }}</b></span>
        <UiButton size="sm" class="bg-brand font-semibold text-white hover:bg-brand/90" @click="bulkDelegate">Делегировать обработку</UiButton>
        <button class="text-[13px] text-white/70 hover:text-white" @click="sel.clear()">Отмена</button>
      </div>
    </Transition>

    <!-- Кейс по платежу -->
    <UiDialog v-model:open="caseOpen">
      <UiDialogContent class="sm:max-w-[560px]">
        <UiDialogHeader>
          <UiDialogTitle>Кейс по платежу</UiDialogTitle>
        </UiDialogHeader>
        <div v-if="caseRow" class="space-y-4">
          <div class="rounded-xl bg-soft px-4 py-3">
            <p class="text-[13.5px] font-bold text-ink">{{ caseRow.org }}</p>
            <p class="font-mono text-[11.5px] text-muted-foreground">БИН {{ caseRow.bin }} · №{{ caseRow.payNo }}</p>
            <p class="mt-1 text-[15px] font-extrabold tabular-nums text-brand">{{ formatMoney(caseRow.total) }}</p>
          </div>

          <SegmentedTabs
            v-model="caseTab"
            :segments="[{ value: 'dist', label: 'Авто-распределение' }, { value: 'request', label: 'Запросить список' }]"
          />

          <div v-if="caseTab === 'dist'" class="space-y-2.5">
            <button class="inline-flex items-center gap-2 rounded-lg bg-brand-12 px-3 py-1.5 text-[12.5px] font-semibold text-brand-ink" @click="autoFill">
              <Sparkles :size="14" /> Подобрать всех
            </button>
            <ul class="space-y-2">
              <li v-for="e in employees" :key="e.id" class="flex items-center gap-3 rounded-lg border border-line px-3 py-2">
                <input type="checkbox" v-model="e.on" class="size-4 accent-[var(--brand)]" />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-[13px] font-semibold text-ink">{{ e.name }}</p>
                  <p class="font-mono text-[11px] text-muted-foreground">ИИН {{ e.iin }}</p>
                </div>
                <span class="text-[12.5px] font-bold tabular-nums text-ink">{{ formatMoney(e.premium) }}</span>
              </li>
            </ul>
            <p class="text-right text-[12.5px] text-muted-foreground">Выбрано: <b class="tabular-nums text-ink">{{ formatMoney(distSum) }}</b></p>
          </div>

          <div v-else class="space-y-3">
            <p class="text-[13px] text-muted-foreground">Шаблон письма организации для запроса списка сотрудников:</p>
            <UiTextarea
              rows="5"
              :model-value="`Уважаемые коллеги!\nПросим направить список застрахованных сотрудников по платежу №${caseRow.payNo} (БИН ${caseRow.bin}) на сумму ${formatMoney(caseRow.total)}.\nС уважением, Halyk Life.`"
            />
          </div>
        </div>
        <UiDialogFooter>
          <UiButton variant="outline" @click="caseOpen = false">Отмена</UiButton>
          <UiButton v-if="caseTab === 'dist'" class="font-semibold" @click="distribute">Распределить и распознать</UiButton>
          <UiButton v-else class="font-semibold" @click="caseOpen = false">Отправить запрос</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s, transform .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translate(-50%, 12px); }
</style>
