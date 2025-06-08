<script setup lang="ts">
import { useMyFetch } from '@/config/fetch'
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
import type { User } from '@/stores/user'
import { computed, ref } from 'vue'
import { Input } from '../ui/input'
import MiniUserTag from './MiniUserTag.vue'
import { myDateFormatter } from '@/lib/utils'
import { Button } from '../ui/button'
const props = defineProps<{ user: User }>()

const action = computed(() => {
  return props.user.isLocked ? 'unban' : 'ban'
})
const APIURL = computed(() => {
  return `/user/${props.user._id}/${action.value}`
})
const { post } = useMyFetch(APIURL, { immediate: false })
const emit = defineEmits<{ update: [] }>()
const handleclick = async () => {
  const { data, execute } = post({ reason: reason.value }).json()
  await execute()
  if (data.value.status) {
    emit('update')
    open.value = false
  }
}
const reason = ref()
const open = ref(false)
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogTrigger>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ user.isLocked ? 'Mở quyền' : 'Chặn quyền' }} truy cập của
        </AlertDialogTitle>
        <AlertDialogDescription>
          <MiniUserTag :user="user" />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div>
        <div v-if="user.banDate || user.banReason" class="pb-4">
          <div>
            <span class="font-semibold">Lý do bị chặn </span>

            (<span v-if="user.banDate">{{ myDateFormatter.format(new Date(user.banDate)) }}</span
            >)
          </div>
          <div class="pl-4 bg-muted text-muted-foreground">
            {{ user.banReason }}
          </div>
        </div>
        <form v-if="!user.isLocked" @submit.prevent="handleclick">
          <label>
            Lý do {{ user.isLocked ? 'mở quyền' : 'chặn quyền' }}
            <Input
              required
              placeholder="e.g. Lợi dụng hệ thống"
              v-model="reason"
              type="text"
              class="invalid:outline-destructive"
            />
          </label>
        </form>
      </div>
      <Button @click="handleclick">Tiếp tục</Button>
      <AlertDialogCancel>Hủy</AlertDialogCancel>
    </AlertDialogContent>
  </AlertDialog>
</template>
