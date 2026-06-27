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

const toneText: Record<NonNullable<Props['tone']>, string> = {
  brand: 'text-brand',
  neutral: 'text-ink',
  danger: 'text-danger',
  warning: 'text-amber',
  amber: 'text-amber',
  info: 'text-info',
  purple: 'text-purple',
}
const toneDot: Record<NonNullable<Props['tone']>, string> = {
  brand: 'bg-brand',
  neutral: 'bg-muted-foreground/40',
  danger: 'bg-danger',
  warning: 'bg-amber',
  amber: 'bg-amber',
  info: 'bg-info',
  purple: 'bg-purple',
}
</script>

<template>
  <div
    :class="[
      'rounded-lg border bg-card px-4 py-3 transition',
      active ? 'border-brand ring-1 ring-brand/25' : 'border-line',
      clickable ? 'cursor-pointer hover:border-brand/40 hover:bg-soft/40' : '',
    ]"
  >
    <div :class="['text-[22px] font-bold leading-none tabular-nums', toneText[props.tone]]">{{ value }}</div>
    <div class="mt-2 flex items-center gap-1.5">
      <span :class="['size-1.5 shrink-0 rounded-full', toneDot[props.tone]]" />
      <span class="truncate text-[11.5px] font-medium text-muted-foreground">{{ label }}</span>
    </div>
    <div v-if="hint" class="mt-0.5 text-[11px] text-muted-foreground/70">{{ hint }}</div>
  </div>
</template>
