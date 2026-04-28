export type SettingsTab = 'business' | 'channels' | 'bot' | 'team' | 'billing'

export type BotTone = 'formal' | 'friendly' | 'playful'

export interface EscalationRule {
  id: string
  label: string
  description: string
  enabled: boolean
}

export interface Channel {
  id: string
  platform: 'whatsapp' | 'instagram'
  name: string
  handle: string
  is_active: boolean
  messages_this_month: number
}
