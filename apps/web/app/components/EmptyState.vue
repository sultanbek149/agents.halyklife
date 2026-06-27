<script setup lang="ts">
interface Props { icon?: string; title: string; body?: string }
withDefaults(defineProps<Props>(), { icon: 'inbox' })
</script>

<template>
  <div class="grid place-items-center px-6 py-14 text-center">
    <div class="mb-3 grid size-14 place-items-center rounded-2xl bg-soft text-muted-foreground">
      <AppIcon :name="icon" :size="26" />
    </div>
    <h4 class="text-[15px] font-bold text-ink">{{ title }}</h4>
    <p v-if="body" class="mt-1 max-w-sm text-[13px] text-muted-foreground">{{ body }}</p>
    <div class="mt-4"><slot name="action" /></div>
  </div>
</template>
