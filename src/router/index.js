import { createRouter, createWebHistory } from 'vue-router'
import PowerView from '@/views/power-view.vue'

const router = createRouter({
  // https://cn.vitejs.dev/guide/env-and-mode.html#env-variables
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'powerview',
      path: '/',
      component: PowerView,
    },
  ],
})

export default router
