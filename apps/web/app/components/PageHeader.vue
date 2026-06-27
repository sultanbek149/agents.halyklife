<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  eyebrow?: string
}
defineProps<Props>()
</script>

<template>
  <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div class="min-w-0">
      <p v-if="eyebrow" class="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{{ eyebrow }}</p>
      <h1 class="text-[22px] font-bold tracking-tight text-ink">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1 text-[13.5px] text-muted-foreground">{{ subtitle }}</p>
    </div>
    <div class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
