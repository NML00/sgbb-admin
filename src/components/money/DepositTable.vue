<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'

import { computed, ref } from 'vue'
import { formateDate, truncateNumber } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'
import { useMyFetch, type ListData, type Response } from '@/config/fetch'
import type { BalanceOrder } from '@/stores/balance'
import { Card, CardContent, CardTitle } from '../ui/card'
import CardHeader from '../ui/card/CardHeader.vue'
import { Button } from '../ui/button'
import VerifyOrderModal from './VerifyOrderModal.vue'
import { Input } from '../ui/input'
import UserEncapsulation from '../UserEncapsulation.vue'

const balanceParams = ref({
  page: 1,
  limit: 10,
  type: 'deposit',
  sortBy: 'status:asc',
  status: 'Pending',
  userId: ''
})
const apiRoute = 'balance'
const fullApiRoute = computed(() => {
  const query = new URLSearchParams(balanceParams.value as any)
  const delKeys: Array<string> = []
  query.forEach((value, key) => {
    if (value === undefined || value === 'undefined' || value === '') {
      delKeys.push(key)
    }
  })
  delKeys.forEach((el) => {
    query.delete(el)
  })

  return `${apiRoute}?${query.toString()}`
})

const { data, isFetching: pending } = useMyFetch(fullApiRoute, { refetch: true }).json<
  Response<ListData<BalanceOrder>>
>()
const depositList = computed(() => {
  return data.value?.metaData
})
</script>

<template>
  <Card class="">
    <CardHeader>
      <CardTitle> Lệnh nạp (Deposit) </CardTitle>
      <div class="flex justify-end flex-wrap gap-2 items-center">
        <label>
          <input
            v-model="balanceParams.status"
            type="radio"
            name="status"
            class="absolute opacity-0 w-0 h-0 cursor-pointer peer"
            value="Pending"
          />
          <span
            class="py-1 px-2 border border-1 border-foreground rounded cursor-pointer peer-checked:bg-foreground peer-checked:text-secondary font-semibold"
          >
            Chưa duyệt
          </span>
        </label>
        <label>
          <input
            v-model="balanceParams.status"
            type="radio"
            name="status"
            class="absolute opacity-0 w-0 h-0 cursor-pointer peer"
            value="Success"
          />
          <span
            class="py-1 px-2 border border-1 border-foreground rounded cursor-pointer peer-checked:bg-foreground peer-checked:text-secondary font-semibold"
          >
            Đã duyệt
          </span>
        </label>
        <label>
          <input
            v-model="balanceParams.status"
            type="radio"
            name="status"
            class="absolute opacity-0 w-0 h-0 cursor-pointer peer"
            :value="undefined"
          />
          <span
            class="py-1 px-2 border border-1 border-foreground rounded cursor-pointer peer-checked:bg-foreground peer-checked:text-secondary font-semibold"
          >
            Tất cả
          </span>
        </label>
        <label>
          <Input prepend-icon="User" v-model="balanceParams.userId" class="py-1" placeholder="ID người dùng" type="text" />
        </label>
      </div>
    </CardHeader>
    <CardContent>
      <div class="mt-4">
        <div class="border rounded">
          <Table class="" :loading="pending">
            <TableCaption>
              <div>Đây là các lệnh nạp trong hệ thống</div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div>ID /</div>
                  <div>Chi tiết</div>
                </TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Mã giao dịch</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead class="text-right"> Ngày tạo lệnh </TableHead>
                <TableHead class="text-center"> Action </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody v-if="depositList">
              <TableRow
                v-for="entry in depositList?.results"
                :key="entry.id"
                class="odd:bg-(--color-background-mute)"
              >
                <TableCell>
                  <div class=" font-bold">
                    <UserEncapsulation :user-id="entry.userId" />
                  </div>
                  <div :title="entry.comment">
                    {{ entry.comment }}
                  </div>
                </TableCell>
                <TableCell>
                  <div class="font-bold text-(--vt-c-white-soft)">
                    {{ truncateNumber(entry.amount_vnd) }} VNĐ
                  </div>
                  <div class="font-bold text-(--vt-c-white-soft)">
                    {{ truncateNumber(entry.amount) }} Diamonds
                  </div>
                </TableCell>
                <TableCell class="break-words max-w-[100px]">
                  {{ entry.transaction }}
                </TableCell>
                <TableCell class="uppercase font-bold">
                  {{ entry.status }}
                </TableCell>
                <TableCell class="text-right">
                  {{ formateDate(entry.createdAt) }}
                </TableCell>
                <TableCell class="text-center">
                  <VerifyOrderModal v-if="entry.status === 'Pending'" :order="entry">
                    <Button prepend-icon="Check" class="px-2 py-1"> Duyệt lệnh </Button>
                  </VerifyOrderModal>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Pagination
          v-if="depositList"
          class="mt-4"
          v-slot="{ page }"
          :items-per-page="depositList.limit"
          :total="depositList.totalResults"
          show-edges
          v-model:page="balanceParams.page"
          :disabled="pending"
        >
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationPrev class="w-6 h-6"></PaginationPrev>
            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <button
                  class="w-6 h-6 p-0 hover:bg-primary/50 cursor-pointer rounded"
                  :class="{
                    'bg-primary text-primary-foreground': item.value === page
                  }"
                >
                  {{ item.value }}
                </button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>
            <PaginationNext class="w-6 h-6"></PaginationNext>
          </PaginationList>
        </Pagination>
      </div>
    </CardContent>
  </Card>
</template>
