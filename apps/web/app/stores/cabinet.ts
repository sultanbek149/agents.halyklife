import { defineStore } from 'pinia'

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

/** Состояние кабинета: роль (агент/руководитель) и текущий агент. */
export const useCabinetStore = defineStore('cabinet', () => {
  const role = ref<Role>('leader')
  const me = ref<CurrentUser>({
    name: 'Байгалиева Жанар',
    first: 'Жанар',
    initials: 'ЖБ',
    role: 'Руководитель',
    channel: 'СТР',
    level: 5,
    agentNo: 'STR-104116',
    period: 'Июнь 2026',
  })

  function setRole(r: Role) {
    role.value = r
  }

  return { role, me, setRole }
})
