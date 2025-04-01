import { useMyFetch } from '@/config/fetch'
import { useCookies } from '@vueuse/integrations/useCookies'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const cookies = useCookies()
  const isLogin = ref<boolean>(!!cookies.get('adAuth'))
  const router = useRouter()
  const loginEmail = async (payload: any) => {
    const { data } = await useMyFetch<any>('auth/login').post(payload).json()
    if (data.value.status === 200) {
      cookies.set('adAuth', data.value.metaData.tokens.accessToken)
      isLogin.value = true
    }
    return data
  }
  const logout = async () => {
    cookies.remove('adAuth', { path: '/' })
    isLogin.value = false
    router.push('/login')
  }
  return {
    isLogin,
    loginEmail,
    logout
  }
})
