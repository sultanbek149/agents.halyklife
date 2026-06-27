<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}
defineProps<Props>()
</script>

<template>
  <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 class="text-[26px] font-extrabold tracking-tight text-ink">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1 text-[14px] text-muted-foreground">{{ subtitle }}</p>
    </div>
    <div class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
