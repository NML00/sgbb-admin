<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formateDate, myDateFormatter, truncateNumber } from '@/lib/utils'
import VerifyOrderModal from './VerifyOrderModal.vue'
import { useBalanceStore } from '@/stores/balance'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import UserEncapsulation from '../UserEncapsulation.vue'
const balanceStore = useBalanceStore()
const { transactionList } = storeToRefs(balanceStore)
const list = computed(() => {
  return transactionList.value?.results ?? []
})
</script>

<template>
  <div class="">
    <div
      class="flex flex-wrap items-center border-b-2 py-4"
      v-for="item in list"
      :key="`balance${item.id}`"
    >
      <UserEncapsulation :user-id="item.userId">
        <Avatar class="h-9 w-9">
          <AvatarImage :src="item.userInfo.avatarPath" alt="Avatar" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </UserEncapsulation>
      <div class="ml-4 space-y-1">
        <div class="text-sm font-medium leading-none">
          <span>{{ truncateNumber(item.amount) }} Diamonds </span>
          ~
          <span>{{ truncateNumber(item.amount_vnd) }} VND</span>
        </div>
        <div class="text-sm text-muted-foreground uppercase">
          {{ item.userFullName }}
          <VerifyOrderModal :order="item" v-if="item.status === 'Pending'">
            <button class="p-1 leading-4 rounded text-xs bg-accent text-secondary-foreground">
              Duyệt lệnh
            </button>
          </VerifyOrderModal>
          <template v-else-if="item.status === 'Success'">
            <Icon
              name="CheckCheck"
              :size="16"
              class="text-emerald-500 inline leading-4 rounded-full bg-muted"
            />
            <span v-if="item.adminEmail" class="lowercase">
              {{ item.adminEmail }}
            </span>
          </template>
        </div>
      </div>
      <div class="ml-auto font-medium">
        <div>
          Tạo lúc: <span class="font-semibold">{{ formateDate(item.createdAt) }}</span>
        </div>
        <div>
          Duyệt lúc: <span class="font-semibold">{{ formateDate(item.approvedAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
