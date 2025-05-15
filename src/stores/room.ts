import { useMyFetch, type ListData, type Response } from '@/config/fetch'
import { defineStore } from 'pinia'

export type Room = {
  _id: string
  name: string
  members: Array<string>
  admins: Array<string>
  isGroup: boolean
  creator: string
  isLocked: boolean
  isPublic: boolean
  isApproved: boolean
  createdAt: string
  updatedAt: string
  memberDetails: Array<MinimizeMember>
}
export type MinimizeMember = {
  _id: string
  nickname: string
  avatarPath: string
  gender: string
}
export const useRoomStore = defineStore('room', () => {
  const { data } = useMyFetch('/rooms').json<Response<ListData<Room>>>()
  return { data }
})
