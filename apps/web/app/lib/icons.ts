/**
 * Единый набор иконок кабинета (lucide, line-стиль, currentColor — темизируется).
 * Заменяет эмодзи во всём интерфейсе. Имена — стабильные ключи для данных/шаблонов.
 */
import { markRaw, type Component } from 'vue'
import {
  Clock, Coins, Wallet, AlertTriangle, Hourglass, Trophy, TrendingUp, Users,
  ClipboardList, Calculator, ReceiptText, Download, Zap, Check, Lock, Search,
  Wrench, Inbox, Lightbulb, Gauge, Medal, GitBranch, FileText, FileCheck, Scale,
  Table, Smartphone, Plane, Laptop, Car, House, Crown, Gift, Bell, Star, Phone,
  MessageCircle, Plus, ChevronRight, ChevronDown, Award, Percent, Network, Layers,
  Mail, Info, MoreHorizontal,
} from '@lucide/vue'

export const iconMap: Record<string, Component> = {
  clock: markRaw(Clock),
  coins: markRaw(Coins),
  wallet: markRaw(Wallet),
  alert: markRaw(AlertTriangle),
  hourglass: markRaw(Hourglass),
  trophy: markRaw(Trophy),
  trending: markRaw(TrendingUp),
  users: markRaw(Users),
  clipboard: markRaw(ClipboardList),
  calculator: markRaw(Calculator),
  receipt: markRaw(ReceiptText),
  download: markRaw(Download),
  zap: markRaw(Zap),
  check: markRaw(Check),
  lock: markRaw(Lock),
  search: markRaw(Search),
  wrench: markRaw(Wrench),
  inbox: markRaw(Inbox),
  lightbulb: markRaw(Lightbulb),
  gauge: markRaw(Gauge),
  medal: markRaw(Medal),
  branch: markRaw(GitBranch),
  file: markRaw(FileText),
  'file-check': markRaw(FileCheck),
  scale: markRaw(Scale),
  table: markRaw(Table),
  smartphone: markRaw(Smartphone),
  plane: markRaw(Plane),
  laptop: markRaw(Laptop),
  car: markRaw(Car),
  house: markRaw(House),
  crown: markRaw(Crown),
  gift: markRaw(Gift),
  bell: markRaw(Bell),
  star: markRaw(Star),
  phone: markRaw(Phone),
  message: markRaw(MessageCircle),
  plus: markRaw(Plus),
  chevron: markRaw(ChevronRight),
  'chevron-down': markRaw(ChevronDown),
  award: markRaw(Award),
  percent: markRaw(Percent),
  network: markRaw(Network),
  layers: markRaw(Layers),
  mail: markRaw(Mail),
  info: markRaw(Info),
  more: markRaw(MoreHorizontal),
}

export type IconName = keyof typeof iconMap | string

export function resolveIcon(name: string): Component {
  return iconMap[name] ?? iconMap.info
}
