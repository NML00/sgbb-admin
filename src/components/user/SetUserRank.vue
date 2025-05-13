<script setup lang="ts">
import type { User } from '@/stores/user'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { userRank } from '@/config/app'
import RankIcon from '../icons/RankIcon.vue'
import { useMyFetch } from '@/config/fetch'
import { ref } from 'vue'

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
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Icon name="Edit" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Chọn Rank cho User </DialogTitle>
      </DialogHeader>
      <div class="grid grid-cols-3">
        <div
          v-for="(rank, index) in userRank"
          :key="`${rank}-${index}`"
          class="aspect-square relative p-2"
          @click="setRank(rank)"
        >
          <div
            class="bg-card shadow hover:bg-muted transition w-full h-full rounded-lg capitalize flex flex-col text-center cursor-pointer font-semibold"
          >
            <div class="grow basis-4/5 px-6 py-2">
              <RankIcon :width="'100%'" height="100%" :rank="index + 1" />
            </div>
            {{ rank }}
          </div>
        </div>
        <div :key="`unrank-0`" class="aspect-square relative p-2" @click="setRank('unrank')">
          <div
            class="bg-card shadow hover:bg-muted transition w-full h-full rounded-lg capitalize flex flex-col text-center cursor-pointer font-semibold"
          >
            <div class="grow basis-4/5 px-6 py-2">
              <!-- <RankIcon :width="'100%'" height="100%" /> -->
            </div>
            Unrank
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
