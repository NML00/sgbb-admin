import { useMyFetch } from '@/config/fetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBalanceStore = defineStore('balance', () => {
  const transactionList = ref()
  const getTransactionList = async (params: any) => {
    const apiRoute = 'balance'
    const query = new URLSearchParams(params)
    const fullApiRoute = `${apiRoute}?${query}`

    const { data } = await useMyFetch(fullApiRoute).json()
    return data
  }
  return {
    transactionList,
    getTransactionList
  }
})
