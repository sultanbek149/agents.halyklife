<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  tone?: 'brand' | 'neutral' | 'danger' | 'warning' | 'info' | 'amber' | 'purple'
  hint?: string
  clickable?: boolean
  active?: boolean
}
const props = withDefaults(defineProps<Props>(), { tone: 'neutral', clickable: false, active: false })

const toneMap: Record<NonNullable<Props['tone']>, { bg: string; text: string }> = {
  brand: { bg: 'bg-brand-12', text: 'text-brand-ink' },
  neutral: { bg: 'bg-soft', text: 'text-ink' },
  danger: { bg: 'bg-danger-soft', text: 'text-danger' },
  warning: { bg: 'bg-warning-soft', text: 'text-amber' },
  amber: { bg: 'bg-amber-soft', text: 'text-amber' },
  info: { bg: 'bg-info-soft', text: 'text-info' },
  purple: { bg: 'bg-purple-soft', text: 'text-purple' },
}
const tone = computed(() => toneMap[props.tone])
</script>

<template>
  <div
    :class="[
      'rounded-xl px-4 py-3.5 transition',
      tone.bg,
      clickable ? 'cursor-pointer hover:brightness-[.98]' : '',
      active ? 'ring-2 ring-brand/50' : '',
    ]"
  >
    <div :class="['text-2xl font-extrabold tabular-nums leading-none', tone.text]">{{ value }}</div>
    <div class="mt-1.5 text-[12px] font-medium text-muted-foreground">{{ label }}</div>
    <div v-if="hint" class="mt-0.5 text-[11px] text-muted-foreground/80">{{ hint }}</div>
  </div>
</template>
