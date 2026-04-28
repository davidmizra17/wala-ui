<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ pts: number[]; color?: string; h?: number }>()

const w = 180
const h = computed(() => props.h ?? 32)

const path = computed(() => {
  const pts = props.pts
  if (!pts || pts.length < 2) return ''
  const max = Math.max(...pts), min = Math.min(...pts)
  const range = max - min || 1
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w)
  const ys = pts.map(p => h.value - 2 - ((p - min) / range) * (h.value - 4))
  return xs.map((x, i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(' ')
})

const area = computed(() => path.value ? `${path.value} L${w} ${h.value} L0 ${h.value} Z` : '')

const lastX = computed(() => {
  const pts = props.pts
  if (!pts?.length) return 0
  return w
})

const lastY = computed(() => {
  const pts = props.pts
  if (!pts?.length) return 0
  const max = Math.max(...pts), min = Math.min(...pts)
  const range = max - min || 1
  const last = pts[pts.length - 1]
  return h.value - 2 - ((last - min) / range) * (h.value - 4)
})

const c = computed(() => props.color ?? 'var(--accent)')
const gradId = computed(() => `sg-${Math.random().toString(36).slice(2, 8)}`)
</script>

<template>
  <svg :viewBox="`0 0 ${w} ${h}`" width="100%" :height="h" preserveAspectRatio="none" style="display:block">
    <defs>
      <linearGradient :id="gradId" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" :stop-color="c" stop-opacity="0.22"/>
        <stop offset="100%" :stop-color="c" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path :d="area" :fill="`url(#${gradId})`"/>
    <path :d="path" :stroke="c" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle :cx="lastX" :cy="lastY" r="3" fill="var(--surface)" :stroke="c" stroke-width="1.6"/>
  </svg>
</template>
