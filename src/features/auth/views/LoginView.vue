<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import WalaIcon from '@/shared/components/WalaIcon.vue'

const router = useRouter()
const email = ref('')
const password = ref('')

function login() {
  // Dummy login — navigate to dashboard
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-card__brand">
        <svg width="36" height="36" viewBox="0 0 20 20" fill="none">
          <rect width="20" height="20" rx="5" fill="var(--accent)"/>
          <path d="M4.5 6.5L6.5 13.5L8.5 8.5L10 13.5L11.5 8.5L13.5 13.5L15.5 6.5"
                stroke="#1a1614" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="login-card__wordmark">Wala</span>
      </div>
      <h1 class="login-card__heading">Bienvenido de vuelta</h1>
      <p class="login-card__sub">Inicia sesión para continuar</p>

      <form class="login-form" @submit.prevent="login">
        <div class="field">
          <label class="field__label" for="email">Correo electrónico</label>
          <input id="email" v-model="email" type="email" class="field__input" placeholder="tu@negocio.com" required />
        </div>
        <div class="field">
          <label class="field__label" for="password">Contraseña</label>
          <input id="password" v-model="password" type="password" class="field__input" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn-primary">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}
.login-card {
  width: 100%;
  max-width: 400px;
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 40px 36px;
  box-shadow: var(--shadow-md);
}
.login-card__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
}
.login-card__wordmark {
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
}
.login-card__heading {
  font-family: var(--font-hero);
  font-size: 28px;
  font-weight: 400;
  color: var(--ink);
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}
.login-card__sub { font-size: 14px; color: var(--ink-2); margin-bottom: 28px; }
.login-form { display: flex; flex-direction: column; gap: 18px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field__label { font-size: 13px; font-weight: 500; color: var(--ink-2); }
.field__input {
  padding: 10px 12px;
  border: 1px solid var(--line-2);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  color: var(--ink);
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
}
.field__input:focus { border-color: var(--accent); }
.btn-primary {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  padding: 11px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.15s;
}
.btn-primary:hover { background: var(--accent-dk); }
</style>
