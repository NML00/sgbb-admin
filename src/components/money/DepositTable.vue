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

const balanceParams = ref({
  page: 1,
  limit: 10,
  type: 'deposit'
})
const apiRoute = 'balance'
const query = new URLSearchParams(balanceParams.value as any).toString()
const fullApiRoute = `${apiRoute}?${query}`

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
    </CardHeader>
    <CardContent>
      <div class="mt-4">
        <div class="border rounded">
          <Table class="">
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
                  <div class="md:hidden font-bold">
                    <span class="text-(--vt-c-white-soft)">
                      {{ entry.id }}
                    </span>
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
                <TableCell class="text-right">
                  {{ formateDate(entry.createdAt) }}
                </TableCell>
                <TableCell class="text-center">
                  <Button prepend-icon="Check" class="px-2 py-1"> Duyệt lệnh </Button>
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
                    'bg-primary text-primary-foreground':
                      item.value === page
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
