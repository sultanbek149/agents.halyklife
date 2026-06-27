import { markRaw, type Component } from 'vue'
import {
  LayoutGrid, Users, FileText, ClipboardCheck, Wallet, Mail,
  TrendingUp, Network, Layers, Trophy, Calculator, FileWarning,
  ReceiptText, FileDown, Star,
} from '@lucide/vue'

export interface NavItem {
  key: string
  to: string
  icon: Component
  badge?: number
}
export interface NavGroup {
  titleKey: string
  items: NavItem[]
}

export function useNav() {
  const { t } = useLang()

  const groups: NavGroup[] = [
    {
      titleKey: 'grpCabinet',
      items: [
        { key: 'nav.home', to: '/home', icon: markRaw(LayoutGrid) },
        { key: 'nav.clients', to: '/clients', icon: markRaw(Users) },
        { key: 'nav.contracts', to: '/contracts', icon: markRaw(FileText) },
        { key: 'nav.tasks', to: '/tasks', icon: markRaw(ClipboardCheck), badge: 2 },
        { key: 'nav.pay', to: '/payments', icon: markRaw(Wallet), badge: 2 },
        { key: 'nav.messages', to: '/messages', icon: markRaw(Mail), badge: 2 },
      ],
    },
    {
      titleKey: 'grpTools',
      items: [
        { key: 'nav.kpi', to: '/kpi', icon: markRaw(TrendingUp) },
        { key: 'nav.struct', to: '/structure', icon: markRaw(Network) },
        { key: 'nav.levels', to: '/levels', icon: markRaw(Layers) },
        { key: 'nav.awards', to: '/awards', icon: markRaw(Trophy) },
        { key: 'nav.calc', to: '/calculator', icon: markRaw(Calculator) },
        { key: 'nav.reg', to: '/registry', icon: markRaw(FileWarning), badge: 12 },
        { key: 'nav.slip', to: '/payslip', icon: markRaw(ReceiptText) },
        { key: 'nav.rep', to: '/reports', icon: markRaw(FileDown) },
        { key: 'nav.rate', to: '/rating', icon: markRaw(Star) },
      ],
    },
  ]

  return { groups, t }
}
