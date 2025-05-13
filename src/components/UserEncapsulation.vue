<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { useMyFetch, type ListData, type Response } from '@/config/fetch'
import type { User } from '@/stores/user'
import { computed, toRefs } from 'vue'

const props = defineProps<{
  userInfo?: User
  userId: string
}>()

const { userInfo, userId } = toRefs(props)
const fullAPIURL = computed(() => {
  return `/user/list?refId=${userId.value}`
})
const { data: response, isFetching, execute } = useMyFetch(fullAPIURL, { immediate: false }).json<Response<ListData<User>>>()
const data = computed(() => {
  return response.value?.metaData.results[0]
})
const userData = computed(() => {
  return {...userInfo.value, ...data.value}
})
const handleOpen = async (open: boolean) => {
  if (open) {
    if (!userInfo.value) {
      await execute()
    }
  }
}
</script>

<template>
  <Dialog @update:open="handleOpen">
    <DialogTrigger>
      <slot>
        <span class="p-1 rounded bg-foreground text-secondary">{{ userId }} <Icon name="User" class="inline"></Icon></span>
      </slot>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ userData?.firstName }} {{ userData?.lastName }}</DialogTitle>
        <DialogDescription>
          Thông tin người dùng
        </DialogDescription>
      </DialogHeader>
      <div>
      <div class="flex gap-2 py-2 items-center">
        <div class="basis-[6rem] aspect-square bg-muted outline outline-accent rounded-xl relative leading-0 shrink-0">
          <img class="w-full aspect-square object-cover rounded-xl absolute inset-0" :src="userData.avatarPath" />
        </div>
        <div>
          <div class="flex gap-2">
            <div>
              <div class="text-[0.875em]">
                First name
              </div>
              <div class="bg-muted text-muted-foreground rounded px-1">
                {{ userData.firstName }}
              </div>
            </div>
            <div>
              <div class="text-[0.875em]">
                Last name
              </div>
              <div class="bg-muted text-muted-foreground rounded px-1">
                {{ userData.lastName }}
              </div>
            </div>
            <div>
              <div class="text-[0.875em]">
                Nickname
              </div>
              <div class="bg-muted text-muted-foreground rounded px-1">
                {{ userData.nickname }}
              </div>
            </div>
          </div>
          <div>
            <Icon class="inline-block pr-2" name="Mail"></Icon>
            {{ userData.email ?? 'N/A' }}
          </div>
          <div>
            <Icon class="inline-block pr-2" name="Phone"></Icon>
            {{ userData.phone ?? 'N/A' }}
          </div>
        </div>
      </div>
        <div class="flex gap-2">
          <div>Balance</div>
          <div>{{userData.balance}}</div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
