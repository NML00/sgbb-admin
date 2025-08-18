import type { PaginationParams } from '@/config/app'
import { useMyFetch, type ListData, type Response } from '@/config/fetch'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type BalanceOrder = {
  userId: string
  received: string | null
  type: string
  transaction: string
  amount: number
  amount_vnd: number
  comment: string
  status: string
  fee: number
  createdAt: string
  id: string
  userFullName: string
  userInfo: {
    _id: string
    firstName: string
    lastName: string
    nickname: string
    phone: string
    balance: number
    refId: string
    avatarPath: string
  },
  adminEmail: string,
  approvedAtFormatted: string,
  createdAtFormatted: string,
  approvedAt: string
}
interface BalanceQueries extends PaginationParams {
  type?: string | string[]
  sortBy?: string
}

export const useBalanceStore = defineStore('balance', () => {
  const transactionParams = ref<BalanceQueries>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt:desc',
    type: 'deposit'
  })
  const apiRoute = 'balance'
  const query = new URLSearchParams(transactionParams.value as any).toString()
  const fullApiRoute = `${apiRoute}?${query}`
  const { data, execute: getTransactionList } =
    useMyFetch(fullApiRoute).json<Response<ListData<BalanceOrder>>>()

  const transactionList = computed(() => {
    return data.value?.status === 200 && data.value.metaData ? data.value.metaData : undefined
  })

  return {
    transactionList,
    getTransactionList,
    transactionParams
  }
})
