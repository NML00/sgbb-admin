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

const { data, patch } = useMyFetch(`/rooms/${props.room._id}/reject`, {immediate: false})


</script>

<template>
  
  <Dialog>
    <DialogTrigger>
        <slot />
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Từ chối yêu cầu Matching
            </DialogTitle>
            <DialogDescription>

            </DialogDescription>
        </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
