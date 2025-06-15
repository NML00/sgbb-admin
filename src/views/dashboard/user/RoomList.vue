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
import type { Room } from '@/stores/room'
import ListOfAvatars from '@/components/user/ListOfAvatars.vue'
import ApproveRoom from '@/components/user/ApproveRoom.vue'
import RejectRoom from '@/components/user/RejectRoom.vue'
import RoomMessageBox from '@/components/room/RoomMessageBox.vue'
import LoadingIcon from '@/components/LoadingIcon.vue'

const balanceParams = ref({
  page: 1,
  limit: 10,
  userId: ''
})
const apiRoute = '/rooms'
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
  Response<ListData<Room>>
>()
const roomList = computed(() => {
  return data.value?.metaData
})
</script>

<template>
  <Card class="">
    <CardHeader>
      <CardTitle> Các phòng chat </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="mt-4">
        <div class="border rounded">
          <Table class="" :loading="pending">
            <TableCaption>
              <div
                v-if="pending && !roomList"
                class="flex items-center justify-center min-h-[10rem]"
              >
                <LoadingIcon class="inline-block w-[2rem]" icon="spinning-circles"></LoadingIcon>
              </div>
              <div
                class="flex items-center justify-center text-xl font-semibold min-h-[10rem]"
                v-else-if="roomList && roomList?.results.length <= 0"
              >
                Không có dữ liệu phòng chat
              </div>
              <div>Đây là các phòng chat trong hệ thống</div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead> Tên phòng </TableHead>
                <TableHead> Trạng thái xác nhận </TableHead>
                <TableHead> Ngày tạo </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody v-if="roomList">
              <TableRow
                v-for="entry in roomList?.results"
                :key="entry._id"
                class="odd:bg-(--color-background-mute)"
              >
                <TableCell>
                  <div class="font-semibold max-w-[15rem] text-ellipsis overflow-hidden">
                    {{ entry.name }}
                  </div>
                  <div class="flex gap-2 items-center">
                    <ListOfAvatars :list="entry.memberDetails" />
                    <RoomMessageBox :room="entry" />
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex gap-2">
                    {{ entry.isApproved ? 'Đã xác nhận' : 'Chưa xác nhận' }}
                    <template v-if="!entry.isApproved">
                      <ApproveRoom :room="entry" class="text-primary">
                        <Icon name="Check" />
                      </ApproveRoom>
                      <RejectRoom :room="entry">
                        <Icon class="text-destructive" name="X" />
                      </RejectRoom>
                    </template>
                  </div>
                </TableCell>
                <TableCell>
                  {{ myDateFormatter.format(new Date(entry.createdAt)) }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Pagination
          v-if="roomList"
          class="mt-4"
          v-slot="{ page }"
          :items-per-page="roomList.limit"
          :total="roomList.totalResults"
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
