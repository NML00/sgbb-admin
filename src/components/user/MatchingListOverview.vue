<script setup lang="ts">
import { useRoomStore } from '@/stores/room'
import { computed } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const roomStore = useRoomStore()
const roomList = computed(() => {
  return roomStore.data?.metaData
})
</script>

<template>
  <div v-if="roomList && roomList.results">
    <div v-for="(room, index) in roomList.results" :key="`room${index}`" class="py-1 flex">
      <div>
        <div class="font-semibold">
          {{ room.name }}
        </div>
        <div class="flex flex-row-reverse w-fit">
          <div
            v-for="member in room.memberDetails"
            :key="member._id"
            class="w-[1rem] overflow-visible flex justify-start"
          >
            <Avatar>
              <AvatarImage
                class="max-w-none rounded-full border border-border !w-auto aspect-square left-0"
                :src="room.memberDetails[0].avatarPath"
              >
              </AvatarImage>
              <AvatarFallback> User </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
