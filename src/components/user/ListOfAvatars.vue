<script setup lang="ts">
import type { User } from '@/stores/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const props = defineProps<{list: User[]}>()

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
</template>