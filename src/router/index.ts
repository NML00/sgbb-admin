import { createRouter, createWebHashHistory, type RouteMeta } from 'vue-router'
import DashboardLayoutVue from '@/layouts/dashboard.vue'
import { useAuthStore } from '@/stores/auth'
import MoneyOrderLayout from '@/layouts/MoneyOrderLayout.vue'

interface IRouteMeta {
  title: string
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {name: 'MoneyOverview'}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Login',
        guest: true
      } as RouteMeta & IRouteMeta
    },
    {
      path: '/dashboard',
      component: DashboardLayoutVue,
      redirect: {name: 'MoneyOverview'},
      meta: {
        title: 'Dashboard',
        authRequired: true
      },
      children: [
        {
          path: 'user',
          name: 'user_index',
          component: () => import('@/views/dashboard/user/Index.vue'),
          meta: {
            title: 'User'
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'admin',
          name: 'AdminView',
          component: () => import('@/views/dashboard/AdminList.vue'),
          meta: {
            title: 'Admins'
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'money',
          name: 'money_layout',
          component: MoneyOrderLayout,
          meta: {
            title: 'Money'
          } as RouteMeta & IRouteMeta,
          children: [
            {
              path: '',
              name: 'MoneyOverview',
              component: () => import('@/views/dashboard/money/MoneyOrderOverview.vue')
            },
            {
              path: 'deposit',
              name: 'MoneyDeposit',
              component: () => import('@/views/dashboard/money/MoneyOrderDeposit.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/views/404.vue'),
      meta: {
        title: 'Page Not Found'
      } as RouteMeta & IRouteMeta
    }
  ]
})

router.beforeEach((loc, _, next) => {
  document.title = `SGBB - ${loc.meta.title}` as string
  const authStore = useAuthStore()
  if (loc.meta.authRequired && !authStore.isLogin) {
    return next('/login')
  }
  if (loc.meta.guest && authStore.isLogin) {
    return next('/dashboard')
  }
  next()
})

export default router
