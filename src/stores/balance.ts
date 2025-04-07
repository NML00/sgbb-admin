import type { PaginationParams } from '@/config/app'
import { useMyFetch } from '@/config/fetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useBalanceStore = defineStore('balance', () => {
  const transactionParams = ref<PaginationParams>({
    page: 1,
    limit: 10
  })
  const transactionList = ref()
  const getTransactionList = async () => {
    const apiRoute = 'balance'
    const query = new URLSearchParams(transactionParams.value as any).toString()
    const fullApiRoute = `${apiRoute}?${query}`

    const { data } = await useMyFetch(fullApiRoute).json()
    return data
  }
  return {
    transactionList,
    getTransactionList,
    transactionParams
  }
})
