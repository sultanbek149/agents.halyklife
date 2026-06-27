<script setup lang="ts">
import { Download } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { reports } from '~/data/demo'

const fmtClass: Record<string, string> = {
  XLSX: 'bg-success-soft text-brand',
  ZIP: 'bg-amber-soft text-amber',
  PDF: 'bg-danger-soft text-danger',
}
function download(title: string) {
  toast.success(`Готовим: ${title}`)
}
</script>

<template>
  <div>
    <PageHeader title="Отчёты" subtitle="Все доступные выгрузки в одном месте" />

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="r in reports"
        :key="r.id"
        class="flex flex-col rounded-2xl border border-line bg-card p-5 block-shadow"
      >
        <div class="mb-3 flex items-start justify-between">
          <span class="grid size-11 place-items-center rounded-xl bg-brand-12 text-brand"><AppIcon :name="r.icon" :size="22" /></span>
          <span :class="['rounded-md px-2 py-0.5 text-[11px] font-bold', fmtClass[r.format]]">{{ r.format }}</span>
        </div>
        <h3 class="text-[15px] font-bold text-ink">{{ r.title }}</h3>
        <p class="mt-1 flex-1 text-[12.5px] leading-snug text-muted-foreground">{{ r.desc }}</p>
        <p class="mt-2 truncate font-mono text-[10.5px] text-muted-foreground/70">{{ r.endpoint }}</p>
        <UiButton variant="outline" class="mt-4 w-full gap-2 rounded-xl font-semibold" @click="download(r.title)">
          <Download :size="16" /> Скачать
        </UiButton>
      </div>
    </div>
  </div>
</template>
