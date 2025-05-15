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
import { formateDate, myDateFormatter, truncateNumber } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'
import { useMyFetch, type ListData, type Response } from '@/config/fetch'
import type { BalanceOrder } from '@/stores/balance'

export type SMS = {
  phone: string
  type: string
  timestamps: number
  status: boolean
  createdAt: string
  id: string
}

const balanceParams = ref({
  page: 1,
  limit: 10,
  userId: ''
})
const apiRoute = 'user/history/sms'
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
  Response<ListData<SMS>>
>()
const smsHistory = computed(() => {
  return data.value?.metaData
})
</script>

<template>
  <Card class="">
    <CardHeader>
      <CardTitle> Lịch sử SMS </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="mt-4">
        <div class="border rounded">
          <Table class="" :loading="pending">
            <TableCaption>
              <div>Đây là các lệnh SMS trong hệ thống</div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead> Số Điện thoại </TableHead>
                <TableHead> Loại </TableHead>
                <TableHead> Ngày tạo </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody v-if="smsHistory">
              <TableRow
                v-for="entry in smsHistory?.results"
                :key="entry.id"
                class="odd:bg-(--color-background-mute)"
              >
                <TableCell>
                  {{ entry.phone }}
                </TableCell>
                <TableCell>
                  {{ entry.type }}
                </TableCell>
                <TableCell>
                  {{ myDateFormatter.format(new Date(entry.createdAt)) }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Pagination
          v-if="smsHistory"
          class="mt-4"
          v-slot="{ page }"
          :items-per-page="smsHistory.limit"
          :total="smsHistory.totalResults"
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
