<script setup lang="ts">
type Tone = 'green' | 'blue' | 'amber' | 'red' | 'grey' | 'purple' | 'brand'
interface Props {
  label: string
  tone?: Tone
  dot?: boolean
}
const props = withDefaults(defineProps<Props>(), { tone: 'grey', dot: true })

const map: Record<Tone, { bg: string; text: string; dot: string }> = {
  green: { bg: 'bg-success-soft', text: 'text-brand', dot: 'bg-brand' },
  brand: { bg: 'bg-brand-12', text: 'text-brand-ink', dot: 'bg-brand' },
  blue: { bg: 'bg-info-soft', text: 'text-info', dot: 'bg-info' },
  amber: { bg: 'bg-amber-soft', text: 'text-amber', dot: 'bg-amber' },
  red: { bg: 'bg-danger-soft', text: 'text-danger', dot: 'bg-danger' },
  grey: { bg: 'bg-soft', text: 'text-muted-foreground', dot: 'bg-muted-foreground/60' },
  purple: { bg: 'bg-purple-soft', text: 'text-purple', dot: 'bg-purple' },
}
const s = computed(() => map[props.tone])
</script>

<template>
  <span
    :class="[
      'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-semibold',
      s.bg,
      s.text,
    ]"
  >
    <span v-if="dot" :class="['size-1.5 rounded-full', s.dot]" />
    {{ label }}
  </span>
</template>
