<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formateDate, myDateFormatter, truncateNumber } from '@/lib/utils'
import { useBalanceStore } from '@/stores/balance'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const balanceStore = useBalanceStore()
const { transactionList } = storeToRefs(balanceStore)
const list = computed(() => {
  return transactionList.value?.results ?? []
})
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center" v-for="item in list" :key="`balance${item.id}`">
      <Avatar class="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>{{ item.userId }}</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">{{ item.amount }} Diamonds</p>
        <p class="text-sm text-muted-foreground uppercase">{{ item.type }}</p>
      </div>
      <div class="ml-auto font-medium">
        <div>{{ truncateNumber(item.amount_vnd) }} VND</div>
        <div>
          {{ formateDate(item.createdAt) }}
        </div>
      </div>
    </div>
  </div>
</template>
