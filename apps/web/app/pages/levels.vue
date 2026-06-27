<script setup lang="ts">
import { levels, specialK, unitInfo } from '~/data/demo'
import { formatMoney, formatUnits } from '~/lib/format'

// Демо-проценты прогресса до следующего уровня
const groupPct = 54
const perPct = 73
const legsPct = 66
</script>

<template>
  <div>
    <PageHeader title="Профессиональные уровни 1–9" subtitle="Карьерная лестница по ВНД-19-04" />

    <div class="grid gap-5 lg:grid-cols-3">
      <!-- Прогресс до следующего уровня -->
      <SectionCard title="Прогресс до следующего уровня" class="lg:col-span-1">
        <div class="flex items-center gap-4">
          <div class="grid size-16 place-items-center rounded-2xl bg-brand-12 text-3xl font-extrabold text-brand-ink">
            {{ unitInfo.level }}
          </div>
          <div class="text-[13px] text-muted-foreground">
            <p class="font-semibold text-ink">Текущий уровень</p>
            <p>Следующий — уровень {{ unitInfo.level + 1 }}</p>
          </div>
        </div>

        <div class="mt-5 space-y-4">
          <ProgressBar :pct="groupPct" label="Структурные единицы" :right="formatUnits(unitInfo.unit.groupUnit)" />
          <ProgressBar :pct="perPct" label="Личные единицы" :right="formatUnits(unitInfo.unit.perUnit)" color="#E0A21B" />
          <ProgressBar :pct="legsPct" label="Ножки 3 ур." right="2 / 3" />
        </div>

        <div class="mt-5 rounded-xl bg-soft p-3.5 text-[12.5px] leading-snug text-muted-foreground">
          До уровня {{ unitInfo.level + 1 }} осталось:
          <span class="font-semibold text-ink">{{ formatUnits(unitInfo.leftPerUnit) }}</span> личных и
          <span class="font-semibold text-ink">{{ formatUnits(unitInfo.leftGroupUnit) }}</span> структурных единиц,
          ещё <span class="font-semibold text-ink">{{ unitInfo.leftsubAgentCount }}</span> ножка нужного уровня
          (ВНД-19-04, Табл. 2).
        </div>
      </SectionCard>

      <!-- Карьерная лестница -->
      <SectionCard title="Карьерная лестница" subtitle="Условия присвоения и базовые ставки" class="lg:col-span-2" no-pad>
        <div>
          <div class="grid grid-cols-[64px_1fr_130px] gap-2 bg-soft px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            <span>Ур.</span><span>Условие присвоения</span><span class="text-right">Ставка</span>
          </div>
          <div
            v-for="lv in levels"
            :key="lv.level"
            class="grid grid-cols-[64px_1fr_130px] items-center gap-2 border-t border-line px-5 py-3 text-[13px]"
            :class="lv.level === unitInfo.level ? 'bg-brand-12' : ''"
          >
            <span class="flex items-center gap-1.5">
              <span v-if="lv.level < unitInfo.level" class="text-brand"><AppIcon name="check" :size="14" /></span>
              <span
                :class="lv.level === unitInfo.level
                  ? 'grid size-6 place-items-center rounded-full bg-brand text-[12px] font-bold text-white'
                  : 'font-semibold text-ink'"
                >{{ lv.level }}</span
              >
            </span>
            <span :class="lv.level === unitInfo.level ? 'font-bold text-ink' : 'text-muted-foreground'">{{ lv.condition }}</span>
            <span class="text-right font-semibold tabular-nums text-ink">{{ formatMoney(lv.rate) }}</span>
          </div>
        </div>
      </SectionCard>
    </div>

    <!-- Спец-коэффициент K -->
    <SectionCard title="Спец-коэффициент K (Таблица 1)" class="mt-5">
      <div class="grid gap-3 sm:grid-cols-3">
        <div v-for="k in specialK" :key="k.label" class="rounded-xl bg-soft px-4 py-5 text-center">
          <div class="text-3xl font-extrabold tabular-nums text-brand">{{ k.value }}</div>
          <div class="mt-1 text-[12.5px] text-muted-foreground">{{ k.label }}</div>
        </div>
      </div>
    </SectionCard>
  </div>
</template>
