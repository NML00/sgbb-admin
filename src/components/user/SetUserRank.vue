<script setup lang="ts">
import type { User } from '@/stores/user'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
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
import { userRank } from '@/config/app'
import RankIcon from '../icons/RankIcon.vue'
import { useMyFetch } from '@/config/fetch'
import { computed, ref } from 'vue'
import { useRankStore } from '@/stores/rank'
import { storeToRefs } from 'pinia'

const props = defineProps<{ user: User }>()
const emit = defineEmits<{ update: [] }>()
const open = ref(false)
const { data, post } = useMyFetch(`/rank/set`, { immediate: false }).json()

const setRank = async (rank: string) => {
  await post({
    userId: props.user._id,
    rankId: rank
  }).execute()

  if (data.value.status) {
    emit('update')
    open.value = false
  }
}
const rankStore = useRankStore()
const { availableRanks } = storeToRefs(rankStore)
const ranks = computed(() => {
  return availableRanks.value?.metaData
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Icon name="Edit" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Chọn Rank cho User </DialogTitle>
        <DialogDescription>
          {{ user.nickname }}
        </DialogDescription>
      </DialogHeader>
      <div class="grid grid-cols-3">
        <div
          v-for="(rank, index) in ranks"
          :key="`${rank.name}-${index}`"
          class="aspect-square relative p-2"
        >
          <AlertDialog>
            <AlertDialogTrigger
              class="bg-card shadow hover:bg-muted transition w-full h-full rounded-lg capitalize flex flex-col text-center cursor-pointer font-semibold"
              :class="{
                'bg-primary text-primary-foreground pointer-events-none': user.rank === rank.level,
                'opacity-70 grayscale pointer-events-none': user.rank > rank.level
              }"
            >
              <div class="grow basis-4/5 px-6 py-2">
                <RankIcon :width="'100%'" height="100%" :rank="rank.level" />
              </div>
              {{ rank.name }}
            </AlertDialogTrigger>
            <AlertDialogContent nonportal>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc không?</AlertDialogTitle>
                <AlertDialogDescription>
                  Một khi đã nâng Rank của user thì sẽ không hạ xuống được
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction @click="setRank(rank._id)">Tiếp tục</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
