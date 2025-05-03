<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formateDate, myDateFormatter, truncateNumber } from '@/lib/utils'
import VerifyOrderModal from './VerifyOrderModal.vue'
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
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <div class="text-sm font-medium leading-none">{{ item.amount }} Diamonds</div>
        <div class="text-sm text-muted-foreground uppercase">
          {{ item.type }}
          <VerifyOrderModal :order="item" v-if="item.status === 'Pending'">
            <button class="p-1 leading-4 rounded text-xs bg-accent text-secondary-foreground">
              Duyệt lệnh
            </button>
          </VerifyOrderModal>
          <Icon
            v-else-if="item.status === 'Success'"
            name="CheckCheck"
            :size="16"
            class="text-emerald-500 inline leading-4 rounded-full bg-muted"
          />
        </div>
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
