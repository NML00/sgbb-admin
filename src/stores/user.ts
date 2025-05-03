import type { PaginationParams } from '@/config/app'
import { useMyFetch, type ListData, type Response } from '@/config/fetch'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type User = {
  _id: string
  firstName: string
  lastName: string
  nickname: string
  email: string
  phone: string
  street: string
  district: string
  ward: string
  city: string
  isActivated: boolean
  isLocked: boolean
  lastLogin: string
  balance: number
  refId: string
  backgrounds: Array<string>
  followers: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
  avatarPath: string
  birthDay: string
  gender: string
  userVip: {
    currentVipLevel: number
    totalRecharge: number
    remainingRecharge: number
  }
  rank: number
}
export const useUserStore = defineStore('user', () => {
  const userParams = ref<PaginationParams>({
    page: 1,
    limit: 10
  })
  const userAPIURL = computed(() => {
    const apiRoute = 'user/list'
    const query = new URLSearchParams(userParams.value as any).toString()
    return `${apiRoute}?${query}`
  })
  const {
    data: userList,
    execute: getUserList,
    isFetching
  } = useMyFetch(userAPIURL, {
    immediate: false,
    refetch: true
  }).json<Response<ListData<User>>>()
  return { userList, userParams, getUserList, isFetching }
})
