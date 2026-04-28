import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/features/auth/views/LoginView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/features/dashboard/views/DashboardView.vue'),
      meta: { layout: 'app', nav: 'dashboard', title: 'Reportes', subtitle: 'Desempeño del negocio' },
    },
    {
      path: '/crm',
      name: 'crm',
      component: () => import('@/features/crm/views/CrmView.vue'),
      meta: { layout: 'app', nav: 'crm' },
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/features/contacts/views/ContactsView.vue'),
      meta: { layout: 'app', nav: 'contacts' },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/features/tasks/views/TasksView.vue'),
      meta: { layout: 'app', nav: 'tasks' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/features/settings/views/SettingsView.vue'),
      meta: { layout: 'app', nav: 'settings' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
