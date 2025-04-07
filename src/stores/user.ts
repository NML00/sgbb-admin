import type { PaginationParams } from '@/config/app'
import { useMyFetch, type ListData, type Response } from '@/config/fetch'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type User = {
  firstName: string
  lastName: string
  nickname: string
  email: string
  phone: string
  street: string
  district: string
  ward: string
  city: string
  password: string
  isActivated: boolean
  isLocked: boolean
  lastLogin: string
  balance: number
  refId: string
  backgrounds: Array<any>
  followers: number
  isDeleted: false
  createdAt: string
  id: string
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
  const { data: userList, execute: getUserList } = useMyFetch(
    userAPIURL,
    {
      immediate: false
    }
  ).json<Response<ListData<User>>>()
  return { userList, userParams, getUserList }
})
