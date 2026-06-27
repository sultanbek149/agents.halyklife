/** Глобальное состояние кабинета: роль (агент/руководитель), текущий агент, период. */
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

export function useCabinet() {
  const role = useState<Role>('role', () => 'leader')
  const setRole = (r: Role) => (role.value = r)

  const me = useState<CurrentUser>('me', () => ({
    name: 'Байгалиева Жанар',
    first: 'Жанар',
    initials: 'ЖБ',
    role: 'Руководитель',
    channel: 'СТР',
    level: 5,
    agentNo: 'STR-104116',
    period: 'Июнь 2026',
  }))

  return { role, setRole, me }
}
