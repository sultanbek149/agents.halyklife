/** Форматирование чисел/денег/дат в стиле кабинета (₸, разряды пробелом). */

export function formatNumber(value: number | string | null | undefined, digits = 0): string {
  if (value === null || value === undefined || value === '') return '—'
  const n = typeof value === 'string' ? parseFloat(value.replace(/\s/g, '').replace(',', '.')) : value
  if (Number.isNaN(n)) return String(value)
  return n.toLocaleString('ru-RU', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

/** Деньги в тенге: «3 180 000 ₸». */
export function formatMoney(value: number | string | null | undefined, digits = 0): string {
  const num = formatNumber(value, digits)
  return num === '—' ? '—' : `${num} ₸`
}

/** Единицы: «2 903,32». */
export function formatUnits(value: number | string | null | undefined): string {
  return formatNumber(value, 2)
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function initials(fullname: string): string {
  const parts = fullname.trim().split(/\s+/)
  const a = parts[0]?.[0] ?? ''
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase()
}

export function clampPct(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}
