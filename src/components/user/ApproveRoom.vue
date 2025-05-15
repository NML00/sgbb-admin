<script setup lang="ts">
import { useMyFetch } from '@/config/fetch'
import type { Room } from '@/stores/room'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
const props = defineProps<{ room: Room }>()

const { data, patch } = useMyFetch(`/rooms/${props.room._id}/approve`, { immediate: false })
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle> Xác nhận yêu cầu Matching </AlertDialogTitle>
        <AlertDialogDescription>
          {{ room.name }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div>
        <AlertDialogCancel>Hủy</AlertDialogCancel>
        <AlertDialogAction @click="patch()">Tiếp tục</AlertDialogAction>
      </div>
    </AlertDialogContent>
  </AlertDialog>
</template>
