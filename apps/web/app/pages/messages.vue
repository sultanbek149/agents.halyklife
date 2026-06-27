<script setup lang="ts">
import { toast } from 'vue-sonner'
import { notifications } from '~/data/demo'

function readAll() {
  toast.success('Все отмечены прочитанными')
}
</script>

<template>
  <div>
    <PageHeader title="Сообщения" subtitle="Уведомления кабинета">
      <template #actions>
        <UiButton variant="outline" class="font-semibold" @click="readAll">Прочитать все</UiButton>
      </template>
    </PageHeader>

    <SectionCard :no-pad="true" class="max-w-3xl">
      <ul>
        <li
          v-for="n in notifications"
          :key="n.id"
          class="flex items-start gap-3.5 border-b border-line px-5 py-4 transition last:border-0"
          :class="!n.read ? 'border-l-2 border-l-brand bg-brand-12/30' : 'hover:bg-soft/40'"
        >
          <span class="grid size-9 shrink-0 place-items-center rounded-xl bg-soft text-brand"><AppIcon :name="n.icon" :size="18" /></span>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <p class="text-[13.5px] font-bold text-ink">{{ n.title }}</p>
              <span v-if="!n.read" class="size-1.5 rounded-full bg-danger" />
            </div>
            <p class="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">{{ n.text }}</p>
            <p class="mt-1 text-[11px] text-muted-foreground/70">{{ n.time }}</p>
          </div>
          <UiButton
            v-if="n.cta"
            variant="ghost"
            size="sm"
            class="shrink-0 font-semibold text-brand hover:text-brand"
            @click="navigateTo(n.cta.to)"
          >
            {{ n.cta.label }} →
          </UiButton>
        </li>
      </ul>
    </SectionCard>
  </div>
</template>
