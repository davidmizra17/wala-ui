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
      meta: { layout: 'app', nav: 'dashboard', title: 'Reportes', subtitle: 'Desempeño del negocio', requiresAuth: true },
    },
    {
      path: '/crm',
      name: 'crm',
      component: () => import('@/features/crm/views/CrmView.vue'),
      meta: { layout: 'app', nav: 'crm', title: 'Pipeline', subtitle: 'Muestra negocios entre etapas', requiresAuth: true },
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/features/contacts/views/ContactsView.vue'),
      meta: { layout: 'app', nav: 'contacts', title: 'Contactos', subtitle: 'Clientes y prospectos', requiresAuth: true },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/features/tasks/views/TasksView.vue'),
      meta: { layout: 'app', nav: 'tasks', title: 'Tareas', subtitle: 'Tu lista del día', requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/features/settings/views/SettingsView.vue'),
      meta: { layout: 'app', nav: 'settings', requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to) => {
  const hasToken = !!localStorage.getItem('access_token')
  if (to.meta.requiresAuth && !hasToken) {
    return { name: 'login' }
  }
  if (to.name === 'login' && hasToken) {
    return { name: 'dashboard' }
  }
})

export default router
