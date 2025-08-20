import WelcomePage from '@/Pages/WelcomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomePage,
    },
    {
      path: '/search/:category/:searchName',
      name: 'searchPage',
      component: () => import('@/Pages/searchPage.vue'),
    },
    {
      path: '/categoryCatalog',
      name: 'categoryCatalog',
      component: () => import('@/Pages/catalogPage.vue'),
    },
    {
      path: '/subCatalog/:category',
      name: 'subCatalog',
      component: () => import('@/Pages/subCatalogPage.vue'),
    },
    {
      path: '/cargoList/:category/:sub',
      name: 'cargoList',
      component: () => import('@/Pages/cargoListPage.vue'),
    },
    {
      path: '/cargo/:category/:sub/:art',
      name: 'cargoPage',
      component: () => import('@/Pages/cargoPage.vue'),
    },
    {
      path: '/busket',
      name: 'busket',
      component: () => import('@/Pages/busketPage.vue'),
    },
    {
      path: '/404',
      name: 'not-found',
      component: () => import('@/Pages/notFoundPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

export default router
