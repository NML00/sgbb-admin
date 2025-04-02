import { createRouter, createWebHashHistory, type RouteMeta } from 'vue-router'
import DashboardLayoutVue from '@/layouts/dashboard.vue'
import { useAuthStore } from '@/stores/auth'

interface IRouteMeta {
  title: string
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard/money'
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
      redirect: '/dashboard/money',
      meta: {
        title: 'Dashboard',
        authRequired: true
      },
      children: [
        // {
        //   path: 'home',
        //   name: 'home',
        //   component: () => import('@/views/dashboard/examples/Home.vue'),
        //   meta: {
        //     title: 'Home'
        //   } as RouteMeta & IRouteMeta
        // },
        // {
        //   path: 'task',
        //   name: 'tasks_index',
        //   component: () => import('@/views/dashboard/examples/tasks/Index.vue'),
        //   meta: {
        //     title: 'Tasks'
        //   } as RouteMeta & IRouteMeta
        // },
        {
          path: 'user',
          name: 'user_index',
          component: () => import('@/views/dashboard/user/Index.vue'),
          meta: {
            title: 'User'
          } as RouteMeta & IRouteMeta
        },
        // {
        //   path: 'settings',
        //   name: 'settings_index',
        //   component: () => import('@/views/dashboard/examples/settings/Index.vue'),
        //   meta: {
        //     title: 'Settings'
        //   } as RouteMeta & IRouteMeta
        // },
        {
          path: 'money',
          name: 'money_index',
          component: () => import('@/views/dashboard/MoneyOrder.vue'),
          meta: {
            title: 'Money'
          } as RouteMeta & IRouteMeta
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

router.beforeEach((loc,_,next) => {
  document.title = loc.meta.title as string
  const authStore = useAuthStore();
  if(loc.meta.authRequired && !authStore.isLogin) {
    return next('/login')
  }
  if(loc.meta.guest && authStore.isLogin) {
    return next('/dashboard')
  } 
  next()
})

export default router
