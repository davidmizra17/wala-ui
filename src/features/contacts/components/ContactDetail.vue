<script setup lang="ts">
import { computed } from 'vue'
import WalaIcon from '@/shared/components/WalaIcon.vue'
import type { Contact } from '../types'

const props = defineProps<{ contact: Contact }>()

const initials = computed(() =>
  props.contact.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
)

const dotColor: Record<string, string> = {
  bot:   'var(--accent)',
  deal:  'var(--good)',
  human: 'var(--info)',
  new:   'var(--ink-3)',
}

const tagStyle = (tag: string) => {
  if (tag === 'VIP')  return { background: 'var(--accent)', color: '#1a1614', fontWeight: '700' }
  if (tag === 'Lead') return { background: 'var(--info-tint)', color: 'var(--info)' }
  if (tag === 'B2B')  return { background: 'var(--ai-tint)', color: 'var(--ai)' }
  return { background: 'var(--surface-3)', color: 'var(--ink-2)' }
}
</script>

<template>
  <div class="cd">

    <!-- ── Header ── -->
    <div class="cd__header">
      <div class="cd__avatar">{{ initials }}</div>
      <div class="cd__info">
        <h2 class="cd__name">{{ contact.name }}</h2>
        <div class="cd__meta">
          <WalaIcon
            :name="contact.platform === 'whatsapp' ? 'wa' : 'ig'"
            :size="14"
            :color="contact.platform === 'whatsapp' ? 'var(--wa)' : 'var(--ig)'"
            :stroke="2"
          />
          <WalaIcon name="phone" :size="13" color="var(--ink-3)" />
          <span>{{ contact.phone || contact.external_id }}</span>
          <span v-if="contact.location" class="cd__location">
            &nbsp;·&nbsp;{{ contact.location }}
          </span>
        </div>
      </div>
      <div class="cd__actions">
        <button class="btn-outline">
          <WalaIcon name="phone" :size="13" />
          Llamar
        </button>
        <button class="btn-primary">
          <WalaIcon name="wa" :size="13" color="#1a1614" />
          Open chat
        </button>
      </div>
    </div>

    <!-- ── Tags ── -->
    <div class="cd__tags">
      <span
        v-for="tag in contact.tags"
        :key="tag"
        class="tag"
        :style="tagStyle(tag)"
      >{{ tag }}</span>
      <button class="tag tag--add">
        <WalaIcon name="plus" :size="11" color="var(--ink-3)" />
        tag
      </button>
    </div>

    <!-- ── KPI row ── -->
    <div class="cd__kpis">
      <div class="kpi">
        <span class="kpi__label">PRIMERA VEZ</span>
        <span class="kpi__val">{{ contact.firstContact ?? '—' }}</span>
      </div>
      <div class="kpi">
        <span class="kpi__label">ULTIMA VEZ</span>
        <span class="kpi__val">{{ contact.lastContact ?? '—' }}</span>
      </div>
      <div class="kpi">
        <span class="kpi__label">CONVERSACIONES</span>
        <span class="kpi__val">{{ contact.conversations ?? 0 }}</span>
      </div>
      <div class="kpi">
        <span class="kpi__label">NEGOCIOS</span>
        <span class="kpi__val">{{ contact.deals ?? '0' }}</span>
      </div>
    </div>

    <!-- ── Content: Activity + Notes ── -->
    <div class="cd__content">

      <!-- Activity -->
      <div class="cd__card">
        <h3 class="cd__card-title">Actividad</h3>
        <div v-if="contact.timeline?.length" class="timeline">
          <div
            v-for="(ev, i) in contact.timeline"
            :key="i"
            class="tl-item"
          >
            <div class="tl-item__track">
              <span class="tl-item__dot" :style="{ background: dotColor[ev.type] }" />
              <span v-if="i < contact.timeline!.length - 1" class="tl-item__line" />
            </div>
            <div class="tl-item__body">
              <div class="tl-item__time">{{ ev.time }}</div>
              <div class="tl-item__title">{{ ev.title }}</div>
              <div class="tl-item__sub">{{ ev.sub }}</div>
            </div>
          </div>
        </div>
        <p v-else class="cd__empty">Sin actividad registrada</p>
      </div>

      <!-- Notes -->
      <div class="cd__card">
        <h3 class="cd__card-title">Notas</h3>
        <p v-if="contact.notes" class="note-text">{{ contact.notes }}</p>
        <div v-if="contact.botSuggestion" class="bot-tip">
          <div class="bot-tip__label">
            <WalaIcon name="sparkle" :size="13" color="var(--accent)" />
            Sugerencia del bot
          </div>
          <p class="bot-tip__text">{{ contact.botSuggestion }}</p>
        </div>
        <textarea class="note-input" placeholder="Agregar nota..." rows="2" />
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Shell ── */
.cd {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 28px 32px;
  gap: 16px;
  box-sizing: border-box;
}

/* ── Header ── */
.cd__header {
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 20px 24px;
  box-shadow: var(--shadow-sm);
}
.cd__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-dk));
  color: #1a1614;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cd__info { flex: 1; min-width: 0; }
.cd__name { font-size: 22px; font-weight: 700; color: var(--ink); letter-spacing: -0.01em; margin-bottom: 6px; }
.cd__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--ink-2);
}
.cd__location { color: var(--ink-3); }
.cd__actions { display: flex; gap: 10px; flex-shrink: 0; }

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid var(--line-2);
  border-radius: var(--radius-md);
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
}
.btn-outline:hover { background: var(--surface-2); }

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent);
  border: none;
  border-radius: var(--radius-md);
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 700;
  color: #1a1614;
}
.btn-primary:hover { background: var(--accent-dk); }

/* ── Tags ── */
.cd__tags {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  padding-left: 4px;
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  background: var(--surface-3);
  color: var(--ink-2);
  border: none;
}
.tag--add {
  background: transparent;
  border: 1px dashed var(--line-2);
  color: var(--ink-3);
  cursor: pointer;
}
.tag--add:hover { border-color: var(--ink-3); color: var(--ink-2); }

/* ── KPIs ── */
.cd__kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.kpi {
  background: var(--surface);
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.kpi__label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--ink-3);
  text-transform: uppercase;
}
.kpi__val {
  font-family: var(--font-hero);
  font-size: 20px;
  color: var(--ink);
  letter-spacing: -0.01em;
}

/* ── Content grid ── */
.cd__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

/* ── Cards ── */
.cd__card {
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 22px 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}
.cd__card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}
.cd__empty { font-size: 13px; color: var(--ink-3); }

/* ── Timeline ── */
.timeline { display: flex; flex-direction: column; }
.tl-item  { display: flex; gap: 12px; }
.tl-item__track {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding-top: 3px;
  flex-shrink: 0;
}
.tl-item__dot  { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.tl-item__line { width: 1px; flex: 1; background: var(--line); min-height: 28px; margin: 3px 0; }
.tl-item__body { flex: 1; padding-bottom: 18px; }
.tl-item__time  { font-size: 11px; color: var(--ink-3); font-weight: 500; margin-bottom: 3px; }
.tl-item__title { font-size: 13px; font-weight: 600; color: var(--ink); }
.tl-item__sub   { font-size: 12px; color: var(--ink-3); margin-top: 2px; }

/* ── Notes ── */
.note-text {
  font-size: 13px;
  color: var(--ink-2);
  line-height: 1.6;
  background: var(--surface-2);
  border-radius: var(--radius-lg);
  padding: 14px 16px;
}

.bot-tip {
  background: var(--accent-tint);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.bot-tip__label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-ink);
}
.bot-tip__text {
  font-size: 12px;
  color: var(--accent-ink);
  line-height: 1.5;
}

.note-input {
  width: 100%;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  font-size: 13px;
  color: var(--ink);
  resize: none;
  outline: none;
  font-family: var(--font-ui);
  margin-top: auto;
}
.note-input::placeholder { color: var(--ink-3); }
.note-input:focus { border-color: var(--accent); }
</style>
