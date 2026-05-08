export interface StatCardData {
  label: string
  value: string
  unit?: string
  delta?: string
  positive?: boolean
  sparkline?: number[]
}

export interface VolumeDay {
  weekday: string
  bot: number
  human: number
}

export interface ActivityItem {
  type: 'bot' | 'won' | 'human' | 'new'
  who: string
  text: string
  time: string
  channel: 'wa' | 'ig'
}

export interface AgentRow {
  name: string
  initials: string
  messages: number
  responseTime: string
  closed: number
}

export interface ChannelData {
  name: string
  count: number
  pct: number
}

export interface FunnelStage {
  label: string
  count: number
  value: string
  isWon?: boolean
}
