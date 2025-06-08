<script setup lang="ts">
import type { User } from '@/stores/user'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import MaleIcon from '../icons/MaleIcon.vue'
import FemaleIcon from '../icons/FemaleIcon.vue'
const props = defineProps<{ user: User }>()
</script>

<template>
  <div>
    <div class="flex gap-2">
      <Avatar>
        <AvatarImage :src="user.avatarPath"> </AvatarImage>
        <AvatarFallback> User </AvatarFallback>
      </Avatar>
      <div>
        <div>
          <span>{{ user.firstName }} {{ user.lastName }}</span>
          <span class="text-muted-foreground white-space-pre">#{{ user.refId }}</span>
          <span>
            <MaleIcon class="inline text-blue-600" v-if="user.gender === 'male'" />
            <FemaleIcon class="inline text-pink-600" v-else-if="user.gender === 'female'" />
          </span>
        </div>
        <div>
          {{ user.email }}
        </div>
      </div>
    </div>
  </div>
</template>
