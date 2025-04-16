<script setup lang="ts">
import type { BalanceOrder } from '@/stores/balance'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { useMyFetch } from '@/config/fetch'
import { computed, ref, watch } from 'vue'
import { formateDate, truncateNumber } from '@/lib/utils'
import { Button } from '../ui/button'

const mockResponse = {
  message: 'Approve transaction successfully!',
  status: 200,
  metaData: {
    updateTransaction: {
      userId: '1911171',
      received: null,
      type: 'deposit',
      transaction: 'b113ade273404ea1c978f781248cd96c4c6b9d8a',
      amount: 200,
      amount_vnd: 200000,
      comment: '1911171',
      status: 'Success',
      fee: 0,
      createdAt: '2025-04-06T12:11:11.155Z',
      id: '67ff2fd32b95d3e5c83bb077'
    },
    updatedVipData: {
      currentVipLevel: 0,
      remainingRecharge: 800
    }
  }
}
const props = defineProps<{
  order: BalanceOrder
}>()
const payload = computed(() => {
  return {
    transaction: props.order.transaction
  }
})
const {
  data,
  execute: verifyOrder,
  isFetching: pending
} = useMyFetch('balance', { immediate: false }).post(payload).json()

const open = ref()
watch(data, () => {
  console.log('Here is', data)
  if (data.value?.status === 200) {
    open.value = false
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Duyệt lệnh </DialogTitle>
        <DialogDescription> Bạn hãy kiểm tra lại thông tin </DialogDescription>
      </DialogHeader>
      <div>
        <div class="mt-4">
          <div>ID người dùng:</div>
          <div class="pl-2">{{ props.order.userId }}</div>
        </div>
        <div class="mt-4">
          <div>Số tiền chuyển khoản:</div>
          <div class="pl-2">
            <span v-if="props.order.type === 'deposit'">Nạp</span>
            <span v-if="props.order.type === 'withdraw'">Rút</span>
            {{ truncateNumber(props.order.amount_vnd) }} VNĐ ({{ props.order.type }})
          </div>
        </div>
        <div v-if="props.order.amount" class="mt-4">
          <div>Số tiền nạp:</div>
          <div class="pl-2">{{ truncateNumber(props.order.amount) }} Diamonds</div>
        </div>
        <div v-if="props.order.createdAt" class="mt-4">
          <div>Thời gian tạo lệnh:</div>
          <div class="pl-2">{{ formateDate(props.order.createdAt) }}</div>
        </div>
        <div class="border-t-2 border-dashed border-accent my-4"></div>
        <div class="text-center">
          <Button :disabled="pending" @click="verifyOrder"> Duyệt lệnh </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
