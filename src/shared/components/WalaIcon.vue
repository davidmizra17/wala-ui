<script setup lang="ts">
// Single icon component with all Wala icons as named paths.
// Usage: <WalaIcon name="inbox" :size="18" color="currentColor" />

defineProps<{
  name: string
  size?: number
  color?: string
  stroke?: number
}>()
</script>

<template>
  <svg
    :width="size ?? 18"
    :height="size ?? 18"
    viewBox="0 0 20 20"
    fill="none"
    :stroke="color ?? 'currentColor'"
    :stroke-width="stroke ?? 1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!-- inbox -->
    <template v-if="name === 'inbox'">
      <path d="M3 13l3-8h8l3 8"/>
      <path d="M3 13v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4"/>
      <path d="M3 13h4l1 2h4l1-2h4"/>
    </template>
    <!-- contacts -->
    <template v-else-if="name === 'contacts'">
      <circle cx="10" cy="7" r="3"/>
      <path d="M4 16c0-3 3-5 6-5s6 2 6 5"/>
    </template>
    <!-- pipeline / crm -->
    <template v-else-if="name === 'pipeline'">
      <rect x="3" y="4" width="4" height="12" rx="1"/>
      <rect x="9" y="4" width="4" height="8" rx="1"/>
      <rect x="15" y="4" width="2" height="5" rx="1"/>
    </template>
    <!-- tasks -->
    <template v-else-if="name === 'tasks'">
      <path d="M4 6l2 2 4-4"/><path d="M4 13l2 2 4-4"/>
      <path d="M13 6h4"/><path d="M13 13h4"/>
    </template>
    <!-- reports -->
    <template v-else-if="name === 'reports'">
      <path d="M3 17V3"/><path d="M3 17h14"/>
      <rect x="6" y="9" width="2.5" height="6"/>
      <rect x="10" y="6" width="2.5" height="9"/>
      <rect x="14" y="11" width="2.5" height="4"/>
    </template>
    <!-- settings -->
    <template v-else-if="name === 'settings'">
      <circle cx="10" cy="10" r="2.5"/>
      <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.3 5.3l1.4 1.4M13.3 13.3l1.4 1.4M5.3 14.7l1.4-1.4M13.3 6.7l1.4-1.4"/>
    </template>
    <!-- search -->
    <template v-else-if="name === 'search'">
      <circle cx="9" cy="9" r="5"/>
      <path d="M13 13l3 3"/>
    </template>
    <!-- bell -->
    <template v-else-if="name === 'bell'">
      <path d="M5 8a5 5 0 0 1 10 0v4l1.5 2h-13L5 12z"/>
      <path d="M8 16a2 2 0 0 0 4 0"/>
    </template>
    <!-- plus -->
    <template v-else-if="name === 'plus'">
      <path d="M10 4v12M4 10h12"/>
    </template>
    <!-- chevron-right -->
    <template v-else-if="name === 'chevron'">
      <path d="M7 5l5 5-5 5"/>
    </template>
    <!-- chevron-down -->
    <template v-else-if="name === 'chevron-down'">
      <path d="M5 7l5 5 5-5"/>
    </template>
    <!-- more (ellipsis) -->
    <template v-else-if="name === 'more'">
      <circle cx="5" cy="10" r="1" fill="currentColor"/>
      <circle cx="10" cy="10" r="1" fill="currentColor"/>
      <circle cx="15" cy="10" r="1" fill="currentColor"/>
    </template>
    <!-- check -->
    <template v-else-if="name === 'check'">
      <path d="M4 10l4 4 8-8"/>
    </template>
    <!-- x / close -->
    <template v-else-if="name === 'x'">
      <path d="M5 5l10 10M15 5L5 15"/>
    </template>
    <!-- filter -->
    <template v-else-if="name === 'filter'">
      <path d="M3 5h14l-5 6v4l-4 2v-6z"/>
    </template>
    <!-- clock -->
    <template v-else-if="name === 'clock'">
      <circle cx="10" cy="10" r="7"/>
      <path d="M10 6v4l3 2"/>
    </template>
    <!-- calendar -->
    <template v-else-if="name === 'calendar'">
      <rect x="3" y="5" width="14" height="12" rx="1.5"/>
      <path d="M3 8h14M7 3v4M13 3v4"/>
    </template>
    <!-- tag -->
    <template v-else-if="name === 'tag'">
      <path d="M4 4h6l6 6-6 6-6-6z"/>
      <circle cx="7" cy="7" r="1" fill="currentColor"/>
    </template>
    <!-- sparkle (AI) -->
    <template v-else-if="name === 'sparkle'">
      <path d="M10 3l1.2 3.5L15 8l-3.8 1.5L10 13l-1.2-3.5L5 8l3.8-1.5z"/>
      <path d="M15 13l.6 1.6 1.4.4-1.4.4-.6 1.6-.6-1.6-1.4-.4 1.4-.4z"/>
    </template>
    <!-- wa (WhatsApp) -->
    <template v-else-if="name === 'wa'">
      <path d="M4 16l1-3a7 7 0 1 1 3 3z"/>
    </template>
    <!-- ig (Instagram) -->
    <template v-else-if="name === 'ig'">
      <rect x="3" y="3" width="14" height="14" rx="4"/>
      <circle cx="10" cy="10" r="3"/>
      <circle cx="14" cy="6" r="0.8" fill="currentColor"/>
    </template>
    <!-- moon -->
    <template v-else-if="name === 'moon'">
      <path d="M15 11a5 5 0 1 1-6-6 4 4 0 0 0 6 6z"/>
    </template>
    <!-- sun -->
    <template v-else-if="name === 'sun'">
      <circle cx="10" cy="10" r="3"/>
      <path d="M10 3v1M10 16v1M3 10h1M16 10h1M5 5l.7.7M14.3 14.3l.7.7M5 15l.7-.7M14.3 5.7l.7-.7"/>
    </template>
    <!-- trend -->
    <template v-else-if="name === 'trend'">
      <path d="M3 14l5-5 3 3 6-6"/>
      <path d="M12 6h5v5"/>
    </template>
    <!-- phone -->
    <template v-else-if="name === 'phone'">
      <path d="M5 4c0 6 5 11 11 11l1-3-3-1-1 1c-2-1-3-2-4-4l1-1-1-3z"/>
    </template>
    <!-- grip (drag handle) -->
    <template v-else-if="name === 'grip'">
      <circle cx="7" cy="6" r="1" fill="currentColor" stroke="none"/>
      <circle cx="13" cy="6" r="1" fill="currentColor" stroke="none"/>
      <circle cx="7" cy="10" r="1" fill="currentColor" stroke="none"/>
      <circle cx="13" cy="10" r="1" fill="currentColor" stroke="none"/>
      <circle cx="7" cy="14" r="1" fill="currentColor" stroke="none"/>
      <circle cx="13" cy="14" r="1" fill="currentColor" stroke="none"/>
    </template>
    <!-- arrow-right -->
    <template v-else-if="name === 'arrow'">
      <path d="M4 10h12M12 6l4 4-4 4"/>
    </template>
    <!-- note -->
    <template v-else-if="name === 'note'">
      <path d="M5 4h8l3 3v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
      <path d="M13 4v3h3"/><path d="M7 11h6M7 14h4"/>
    </template>
  </svg>
</template>
