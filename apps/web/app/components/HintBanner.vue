<script setup lang="ts">
interface Props { tone?: 'warm' | 'green' | 'danger'; icon?: string }
const props = withDefaults(defineProps<Props>(), { tone: 'warm', icon: 'lightbulb' })
const map = {
  warm: 'bg-[#FFF8EC] border-[#F2DDB0] text-[#7A5B12] dark:bg-amber-soft dark:border-transparent dark:text-amber',
  green: 'bg-brand-12 border-transparent text-brand-ink',
  danger: 'bg-danger-soft border-transparent text-danger',
}
</script>

<template>
  <div :class="['flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[13px] font-medium', map[props.tone]]">
    <AppIcon :name="icon" :size="16" class="mt-0.5 shrink-0" />
    <p class="leading-snug"><slot /></p>
  </div>
</template>
