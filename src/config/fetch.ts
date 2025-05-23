import { useAuthStore } from '@/stores/auth'
import { createFetch } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { toast } from 'vue3-toastify'

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
      if (ctx.response) {
        if (ctx.response.status === 401) {
          useAuthStore().logout()
          return ctx
        }
        if (ctx.data.message?.length && ctx.data.message.length > 0) {
          toast.error(ctx.data.message)
        } else if (ctx.error) {
          toast.error(ctx.error)
        }
      }
      return ctx
    },
    afterFetch({ data, response }) {
      if (data.message && data.message.length > 0) {
        if (data.status) {
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      }
      return { data, response }
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

export type Response<T> = {
  message: string
  status: number
  metaData: T
}

export type ListData<T> = {
  results: Array<T>
  page: number
  limit: number
  totalPages: number
  totalResults: number
}
