import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
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
    ,
    {
      path: '/transmissor',
      name: 'transmissor',
      component: () => import('../views/Transmissor.vue'),
    },
    ,
    {
      path: '/receptor',
      name: 'receptor',
      component: () => import('../views/Receptor.vue'),
    },
  ],
})

export default router
