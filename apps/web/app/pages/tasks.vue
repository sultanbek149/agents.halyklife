<script setup lang="ts">
import { Plus } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { tasks, taskStatusLabel, taskStatusTone, downAgents } from '~/data/demo'
import { formatDate } from '~/lib/format'
import type { TaskPriority } from '~/types/api'

const filter = ref('all')
const filterChips = computed(() => [
  { value: 'all', label: 'Все', count: tasks.length },
  { value: 'new', label: 'Новые', count: tasks.filter((t) => t.status === 'new').length },
  { value: 'overdue', label: 'Просроченные', count: tasks.filter((t) => t.status === 'overdue').length },
  { value: 'progress', label: 'В работе', count: tasks.filter((t) => t.status === 'progress').length },
  { value: 'done', label: 'Выполнена', count: tasks.filter((t) => t.status === 'done').length },
])
const filtered = computed(() => (filter.value === 'all' ? tasks : tasks.filter((t) => t.status === filter.value)))

const open = ref(false)
const types = ['Звонок', 'Встреча', 'Документы', 'Продление']
const priorities: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
  { value: 'urgent', label: 'Срочный' },
]
const form = reactive({ type: 'Звонок', assignee: '', deadline: '', priority: 'medium' as TaskPriority, comment: '' })

function submit() {
  toast.success('Задача создана и делегирована')
  open.value = false
}
</script>

<template>
  <div>
    <PageHeader title="Задачи" subtitle="Свои задачи и делегированные вниз по структуре">
      <template #actions>
        <UiButton class="gap-2 rounded-xl font-semibold" @click="open = true">
          <Plus :size="17" /> Поставить задачу
        </UiButton>
      </template>
    </PageHeader>

    <FilterChips v-model="filter" :chips="filterChips" class="mb-4" />

    <SectionCard :no-pad="true">
      <div v-if="filtered.length" class="overflow-x-auto">
        <div class="grid grid-cols-[1fr_200px_120px_150px_44px] items-center gap-3 border-b border-line bg-soft/60 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          <span>Задача</span><span>Исполнитель</span><span>Срок</span><span>Статус</span><span></span>
        </div>
        <div
          v-for="t in filtered"
          :key="t.id"
          class="grid grid-cols-[1fr_200px_120px_150px_44px] items-center gap-3 border-b border-line px-5 py-3 transition last:border-0 hover:bg-soft/40"
        >
          <div class="flex min-w-0 items-center gap-3">
            <PriorityDot :priority="t.priority" />
            <div class="min-w-0">
              <p class="truncate text-[13.5px] font-semibold text-ink">{{ t.title }}</p>
              <p class="truncate font-mono text-[11.5px] text-muted-foreground">{{ t.ref }}</p>
            </div>
          </div>
          <div class="flex min-w-0 items-center gap-2">
            <InitialsAvatar :text="t.assigneeInitials" :size="26" />
            <span class="truncate text-[13px] text-ink">{{ t.assignee }}</span>
          </div>
          <span class="text-[13px] tabular-nums text-muted-foreground">{{ formatDate(t.deadline) }}</span>
          <StatusBadge :label="taskStatusLabel(t.status)" :tone="taskStatusTone[t.status]" />
          <button class="grid size-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-soft"><AppIcon name="more" :size="16" /></button>
        </div>
      </div>
      <EmptyState v-else icon="inbox" title="Задач не найдено" body="По выбранному фильтру задач нет." />
    </SectionCard>

    <!-- Новая задача -->
    <UiDialog v-model:open="open">
      <UiDialogContent class="sm:max-w-[520px]">
        <UiDialogHeader>
          <UiDialogTitle>Новая задача</UiDialogTitle>
        </UiDialogHeader>

        <div class="space-y-4 py-1">
          <div>
            <UiLabel class="mb-1.5 block text-[12px] font-semibold text-muted-foreground">Тип</UiLabel>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="ty in types"
                :key="ty"
                type="button"
                class="rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition"
                :class="form.type === ty ? 'border-transparent bg-brand text-primary-foreground' : 'border-line bg-card text-muted-foreground hover:bg-soft'"
                @click="form.type = ty"
              >
                {{ ty }}
              </button>
            </div>
          </div>

          <div>
            <UiLabel class="mb-1.5 block text-[12px] font-semibold text-muted-foreground">Исполнитель (ветка)</UiLabel>
            <UiSelect v-model="form.assignee">
              <UiSelectTrigger class="w-full">
                <UiSelectValue placeholder="Выберите агента" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="a in downAgents" :key="a.agId" :value="a.agId">
                  {{ a.name }} · {{ a.agentNo }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>

          <div>
            <UiLabel class="mb-1.5 block text-[12px] font-semibold text-muted-foreground">Срок</UiLabel>
            <UiInput v-model="form.deadline" type="date" />
          </div>

          <div>
            <UiLabel class="mb-1.5 block text-[12px] font-semibold text-muted-foreground">Приоритет</UiLabel>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="p in priorities"
                :key="p.value"
                type="button"
                class="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition"
                :class="form.priority === p.value ? 'border-transparent bg-brand-12 text-brand-ink' : 'border-line bg-card text-muted-foreground hover:bg-soft'"
                @click="form.priority = p.value"
              >
                <PriorityDot :priority="p.value" /> {{ p.label }}
              </button>
            </div>
          </div>

          <div>
            <UiLabel class="mb-1.5 block text-[12px] font-semibold text-muted-foreground">Комментарий</UiLabel>
            <UiTextarea v-model="form.comment" placeholder="Ожидаемый результат…" rows="3" />
          </div>
        </div>

        <UiDialogFooter>
          <UiButton variant="outline" @click="open = false">Отмена</UiButton>
          <UiButton class="font-semibold" @click="submit">Создать и делегировать</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
