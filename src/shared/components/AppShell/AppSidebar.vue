<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import WalaIcon from '@/shared/components/WalaIcon.vue'

const route = useRoute()
const router = useRouter()
const ui = useUiStore()

const collapsed = computed(() => ui.sidebarCollapsed)

const navItems = [
  { id: 'dashboard', icon: 'pipeline', label: 'Inicio',     route: 'dashboard' },
  { id: 'crm',       icon: 'pipeline', label: 'Pipeline',   route: 'crm',       badge: 0 },
  { id: 'contacts',  icon: 'contacts', label: 'Contactos',  route: 'contacts' },
  { id: 'tasks',     icon: 'tasks',    label: 'Tareas',     route: 'tasks',     badge: 3 },
  { id: 'settings',  icon: 'settings', label: 'Ajustes',    route: 'settings' },
]

const activeNav = computed(() => route.meta.nav as string)

function navigate(routeName: string) {
  router.push({ name: routeName })
}
</script>

<template>
  <aside :class="['sidebar', { 'sidebar--collapsed': collapsed }]">
    <!-- Brand -->
    <div class="sidebar__brand" @click="ui.toggleSidebar()">
      <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
        <rect width="20" height="20" rx="5" fill="var(--accent)"/>
        <path d="M4.5 6.5L6.5 13.5L8.5 8.5L10 13.5L11.5 8.5L13.5 13.5L15.5 6.5"
              stroke="#1a1614" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span v-if="!collapsed" class="sidebar__wordmark">Wala</span>
    </div>

    <!-- Nav items -->
    <nav class="sidebar__nav">
      <button
        v-for="item in navItems"
        :key="item.id"
        :class="['nav-item', { 'nav-item--active': activeNav === item.id }]"
        :title="collapsed ? item.label : undefined"
        @click="navigate(item.route)"
      >
        <WalaIcon :name="item.icon" :size="18" />
        <span v-if="!collapsed" class="nav-item__label">{{ item.label }}</span>
        <span v-if="!collapsed && item.badge" class="nav-item__badge">{{ item.badge }}</span>
        <span v-if="collapsed && item.badge" class="nav-item__dot" />
      </button>
    </nav>

    <div class="sidebar__spacer" />

    <!-- Profile -->
    <div class="sidebar__profile">
      <div class="avatar avatar--sm">MC</div>
      <div v-if="!collapsed" class="sidebar__profile-info">
        <span class="sidebar__profile-name">María Cardozo</span>
        <span class="sidebar__profile-sub">Florería La Orquídea</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 232px;
  flex-shrink: 0;
  background: var(--surface-2);
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  padding: 18px 14px;
  gap: 4px;
  transition: width 0.2s ease;
  overflow: hidden;
}
.sidebar--collapsed {
  width: 60px;
  padding: 18px 10px;
  align-items: center;
}
.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px 22px;
  cursor: pointer;
  flex-shrink: 0;
}
.sidebar__wordmark {
  font-weight: 700;
  font-size: 16px;
  color: var(--ink);
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 11px;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: var(--ink-2);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  position: relative;
  white-space: nowrap;
  transition: background 0.12s;
}
.sidebar--collapsed .nav-item {
  justify-content: center;
  padding: 10px 0;
}
.nav-item:hover { background: var(--surface-3); }
.nav-item--active {
  background: var(--accent-tint);
  color: var(--accent-ink);
  font-weight: 600;
}
.nav-item__label { flex: 1; text-align: left; }
.nav-item__badge {
  font-size: 11px;
  font-weight: 600;
  background: var(--surface-3);
  color: var(--ink-2);
  padding: 1px 7px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}
.nav-item--active .nav-item__badge {
  background: var(--accent);
  color: #fff;
}
.nav-item__dot {
  position: absolute;
  top: 6px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: var(--accent);
}
.sidebar__spacer { flex: 1; }
.sidebar__profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px;
  cursor: pointer;
  border-top: 1px solid var(--line);
  padding-top: 14px;
  margin-top: 6px;
}
.sidebar--collapsed .sidebar__profile { justify-content: center; }
.avatar {
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-dk));
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.avatar--sm { width: 30px; height: 30px; font-size: 12px; }
.sidebar__profile-info { min-width: 0; display: flex; flex-direction: column; }
.sidebar__profile-name { font-size: 13px; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar__profile-sub { font-size: 11px; color: var(--ink-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
