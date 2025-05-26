<script setup lang="ts">
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
import { useMyFetch, type ListData, type Response } from '@/config/fetch'
import { Input } from '@/components/ui/input'

export type SMS = {
  phone: string
  type: string
  timestamps: number
  status: boolean
  createdAt: string
  id: string
  otp: string
}

const smsParams = ref({
  page: 1,
  limit: 10,
  userId: '',
  phone: '',
  type: ''
})
const apiRoute = 'user/history/sms'
const fullApiRoute = computed(() => {
  const query = new URLSearchParams(smsParams.value as any)
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
const showFilter = ref(true)
</script>

<template>
  <Card class="">
    <CardHeader>
      <CardTitle> Lịch sử SMS </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="mt-4 bg-card text-card-foreground p-2 rounded">
        <div class="text-xl flex gap-2 items-center">
          Bộ lọc
          <button
            @click="showFilter = !showFilter"
            class="hover:bg-accent/50 active:bg-accent rounded p-1"
          >
            <Icon
              name="Triangle"
              :class="{ 'rotate-180': !showFilter }"
              class="w-[0.75em] h-[0.75em]"
            />
          </button>
        </div>
        <div :class="{ hidden: !showFilter }" class="flex flex-wrap items-center transition -mx-1">
          <div class="basis-full sm:basis-1/2 md:basis-1/3 px-1">
            <label>
              Số điện thoại
              <Input v-model="smsParams.phone" placeholder="Số điện thoại (e.g. 09012222222)" />
            </label>
          </div>
          <div class="basis-full sm:basis-1/2 md:basis-1/3 px-1">
            <label>
              Loại
              <Input v-model="smsParams.type" class="uppercase" placeholder="Loại OTP" />
            </label>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="border rounded">
          <Table class="" :loading="pending">
            <TableCaption>
              <div>Đây là các lệnh SMS trong hệ thống</div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead> Số Điện thoại
                  <span class="sm:hidden"> / Loại</span>  
                </TableHead>
                <TableHead> Mã OTP </TableHead>
                <TableHead class="hidden sm:table-cell"> Loại </TableHead>
                <TableHead> Ngày tạo </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody v-if="smsHistory">
              <TableRow v-for="entry in smsHistory?.results" :key="entry.id" class="odd:bg-muted">
                <TableCell>
                  {{ entry.phone }}
                  <div class="sm:hidden">
                    {{ entry.type }}
                  </div>
                </TableCell>
                <TableCell>
                  {{ entry.otp }}
                </TableCell>
                <TableCell class="hidden sm:table-cell">
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
          v-model:page="smsParams.page"
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
