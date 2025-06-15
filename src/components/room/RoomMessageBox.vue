<script lang="ts" setup>
import { useMyFetch, type ListData, type Response } from '@/config/fetch'
import type { MinimizeMember, Room } from '@/stores/room'
import { computed } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export type ConversationMessage = {
  deletedByRole: string | null
  deletionReason: string | null
  type: 'T'
  deletedAt: string | null
  deletedBy: string | null
  chatRoomId: string
  content: string
  sender: string
  createdAt: string
  repliedFrom: string | null
  forwardedFrom: string | null
  mentions: {}
  id: string
}
const props = defineProps<{ room: Room }>()
const APIURL = computed(() => {
  return `messages/${props.room._id}/conversation`
})

const { data, execute } = useMyFetch(APIURL, { immediate: false }).json<
  Response<ListData<ConversationMessage>>
>()

const messagesData = computed(() => {
  return data.value?.metaData
})
const memberDict = computed(() => {
  const map = new Map<string, MinimizeMember>()
  props.room.memberDetails.forEach((member) => {
    map.set(member._id, member)
  })
  return map
})
const isNewStreak = (index: number, message: ConversationMessage) => {
  return (
    messagesData.value &&
    (index === 0 ||
      memberDict.value.get(messagesData.value.results[index - 1].sender) !==
        memberDict.value.get(message.sender))
  )
}
const firstMemberID = computed(() => {
  const member = memberDict.value.entries().next().value
  if (member) {
    return member[1]._id
  }
  return ''
})
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <button @click="execute()">Xem tin nhắn</button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle> </DialogTitle>
      </DialogHeader>
      <div>
        <div class="h-[400px] overflow-auto px-2 relative inset-shadow-sm" v-if="messagesData">
          <div
            v-for="(message, index) in messagesData?.results"
            :key="`${index}${message.content}`"
            :class="{ 'pt-4': isNewStreak(index, message) }"
          >
            <div
              class="flex gap-2 pt-1"
              :class="{ 'flex-row-reverse': firstMemberID === message.sender }"
            >
              <div class="shrink-0 h-10 w-10">
                <Avatar
                  v-if="
                    message.sender && memberDict.get(message.sender) && isNewStreak(index, message)
                  "
                  class="self-start"
                >
                  <AvatarImage :src="memberDict.get(message.sender)?.avatarPath ?? ''">
                  </AvatarImage>
                  <AvatarFallback> </AvatarFallback>
                </Avatar>
              </div>
              <div class="grow bg-muted p-1 rounded">
                {{ message.content }}
              </div>
              <div class="shrink-0 h-10 w-10"></div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
