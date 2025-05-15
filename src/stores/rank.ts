import { useMyFetch, type Response } from '@/config/fetch'
import { defineStore } from 'pinia'
export type Rank = {
  _id: string
  name: string
  price: number
  duration: number
  benefits: Array<string>
  level: number
  isExpired: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
export const useRankStore = defineStore('rank', () => {
  const { data: availableRanks, isFetching: fetchingRanks } =
    useMyFetch('rank').json<Response<Array<Rank>>>()

    
  return { availableRanks, fetchingRanks }
})
