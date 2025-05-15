<script setup lang="ts">
import type { User } from '@/stores/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import MaleIcon from '../icons/MaleIcon.vue'
import FemaleIcon from '../icons/FemaleIcon.vue'
import type { MinimizeMember } from '@/stores/room';

const props = defineProps<{ list: MinimizeMember[] }>()
</script>

<template>
  <div class="flex flex-row-reverse w-fit">
    <div
      v-for="member in props.list"
      :key="member._id"
      class="w-[1rem] overflow-visible flex justify-start"
    >
      <Avatar>
        <AvatarImage
          class="max-w-none rounded-full border border-border !w-auto aspect-square left-0"
          :src="props.list[0].avatarPath"
        >
        </AvatarImage>
        <AvatarFallback> User </AvatarFallback>
      </Avatar>
    </div>
  </div>
  <Dialog>
    <DialogTrigger> </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Danh sách người dùng </DialogTitle>
      </DialogHeader>
      <div>
        <div v-for="member in props.list" :key="member._id" class="flex gap-2 py-1">
          <div>
            <Avatar>
              <AvatarImage
                class="max-w-none rounded-full border border-border !w-auto aspect-square left-0"
                :src="member.avatarPath"
              >
              </AvatarImage>
              <AvatarFallback> User </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div>
              {{ member.nickname }}
              <span
                class="inline"
                :class="{
                  'text-blue-600': member.gender === 'male',
                  'text-pink-600': member.gender === 'female'
                }"
              >
                {{ member.gender === 'male' ? MaleIcon : FemaleIcon }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
