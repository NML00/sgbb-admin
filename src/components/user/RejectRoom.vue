<script setup lang="ts">
import { useMyFetch } from '@/config/fetch'
import type { Room } from '@/stores/room'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
const props = defineProps<{ room: Room }>()

const { patch } = useMyFetch(`/rooms/${props.room._id}/reject`, { immediate: false })
const emit = defineEmits<{ update: [] }>()
const handleclick = async () => {
  const { data, execute } = patch().json()
  await execute()
  if (data.value.status) {
    emit('update')
  }
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle> Từ chối yêu cầu Matching </AlertDialogTitle>
        <AlertDialogDescription>
          {{ room.name }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogAction @click="handleclick">Tiếp tục</AlertDialogAction>
      <AlertDialogCancel>Hủy</AlertDialogCancel>
    </AlertDialogContent>
  </AlertDialog>
</template>
