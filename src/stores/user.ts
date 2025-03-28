import { defineStore } from 'pinia'
import { ref } from 'vue'

type User = {}

export const useUserStore = defineStore('user', () => {
  const user = ref<any>()
  return { user }
})
