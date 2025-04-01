import { useAuthStore } from '@/stores/auth'
import { createFetch } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies()
const baseUrl = import.meta.env.VITE_API_URL
export const useMyFetch = createFetch({
  baseUrl,
  options: {
    async beforeFetch({ options }) {
      const myToken = cookies.get('adAuth')
      // @ts-ignore
      options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    },
    updateDataOnError: true,
    onFetchError(ctx) {
      console.log('ERR', ctx)
      if (ctx.response?.status === 401) {
        useAuthStore().logout()
      }
      return ctx
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})
