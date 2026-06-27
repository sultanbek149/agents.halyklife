import { defineStore } from 'pinia'
import { agentServiceApi } from '~/api'
import { initials as toInitials } from '~/lib/format'

export type Role = 'agent' | 'leader'

export interface CurrentUser {
  name: string
  first: string
  initials: string
  role: string
  channel: string
  level: number
  agentNo: string
  period: string
}

const DEMO_ME: CurrentUser = {
  name: 'Байгалиева Жанар',
  first: 'Жанар',
  initials: 'ЖБ',
  role: 'Руководитель',
  channel: 'СТР',
  level: 5,
  agentNo: 'STR-104116',
  period: 'Июнь 2026',
}

/** Состояние кабинета: роль (агент/руководитель) и текущий агент. */
export const useCabinetStore = defineStore('cabinet', () => {
  const role = ref<Role>('leader')
  const me = ref<CurrentUser>({ ...DEMO_ME })
  const live = ref(false)

  function setRole(r: Role) {
    role.value = r
  }

  /** Подтянуть боевой профиль из agent-service (если есть токен). Иначе — демо. */
  async function loadMe() {
    if (!import.meta.client || !localStorage.getItem('token')) return
    try {
      const { data } = await agentServiceApi.getMe()
      if (!data || !data.agentName) return
      const name = data.agentName.trim()
      const parts = name.split(/\s+/)
      me.value = {
        name,
        first: parts[1] || parts[0] || name,
        initials: toInitials(name),
        role: data.channel?.type === 'partner' ? 'Партнёр' : 'Руководитель',
        channel: data.saleChannel || data.channel?.saleChannel || DEMO_ME.channel,
        level: typeof data.level === 'number' ? data.level : DEMO_ME.level,
        agentNo: data.agentNo || DEMO_ME.agentNo,
        period: DEMO_ME.period,
      }
      live.value = true
    } catch {
      /* остаёмся на демо-профиле */
    }
  }

  return { role, me, live, setRole, loadMe }
})
