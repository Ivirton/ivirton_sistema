import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/anuncio',
      name: 'anuncio',
      component: () => import('../views/Anuncio.vue'),
    },
    {
      path: '/transmissao',
      name: 'transmissao',
      component: () => import('../views/Transmissao.vue'),
    },
  ],
})

export default router
