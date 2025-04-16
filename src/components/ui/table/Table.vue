<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import LoadingIcon from '@/components/LoadingIcon.vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
  loading?: boolean
}>()
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
    <div v-if="loading" class="loader absolute inset-0 bg-accent/30 text-accent-foreground flex items-center justify-center">
      <LoadingIcon icon="spinning-circles" />
    </div>
  </div>
</template>
