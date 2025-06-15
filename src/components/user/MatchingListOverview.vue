<script setup lang="ts">
import { useRoomStore } from '@/stores/room'
import { computed } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ListOfAvatars from './ListOfAvatars.vue'

const roomStore = useRoomStore()
const roomList = computed(() => {
  return roomStore.data?.metaData
})
</script>

<template>
  <div v-if="roomList && roomList.results">
    <div v-for="(room, index) in roomList.results" :key="`room${index}`" class="py-1 flex p-2 bg-muted my-2 rounded">
      <div>
        <div class="font-semibold max-w-[15rem] text-ellipsis overflow-hidden">
          {{ room.name }}
        </div>
        <ListOfAvatars :list="room.memberDetails" />
      </div>
    </div>
  </div>
</template>
