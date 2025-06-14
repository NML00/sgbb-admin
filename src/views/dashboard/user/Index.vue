<template>
  <div>
    <page-header title="Users"> </page-header>
    <!-- <div class="flex py-4">
      <label class="py-">
        Users Name
        <Input prependIcon="User" />
      </label>
    </div> -->
    <DataTable :columns="columns" :data="userList?.results ?? []" :loading="isFetching" />
    <Pagination
      v-if="userList"
      class="mt-4"
      v-slot="{ page }"
      :items-per-page="userList.limit"
      :total="userList.totalResults"
      show-edges
      v-model:page="userParams.page"
      :disabled="isFetching"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationPrev class="w-6 h-6"></PaginationPrev>
        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
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
</template>

<script lang="ts" setup>
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import Icon from '@/components/ui/Icon.vue'
import data from '@/assets/tasks.json'
import { ref, h, computed } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import DataTableHeader from '@/components/ui/data-table/DataTableHeader.vue'
import type { Column } from '@tanstack/vue-table'
import { Badge } from '@/components/ui/badge'
import logo from '@/assets/images/logo.svg'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import { useUserStore, type User } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { myDateFormatter } from '@/lib/utils'
import MaleIcon from '@/components/icons/MaleIcon.vue'
import FemaleIcon from '@/components/icons/FemaleIcon.vue'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'
import UserEncapsulation from '@/components/UserEncapsulation.vue'
import RankIcon from '@/components/icons/RankIcon.vue'
import SetUserRank from '@/components/user/SetUserRank.vue'
import BanUser from '@/components/user/BanUser.vue'
import { useRankStore } from '@/stores/rank'

const users = ref([
  {
    name: 'Mitchell Hudson',
    diamond: 32000,
    img: logo,
    lastActive: new Date().toDateString(),
    rank: 'Silver',
    id: '698987'
  }
])

const userStore = useUserStore()
const { userList: dataResponse, userParams, isFetching } = storeToRefs(userStore)

const userList = computed(() => {
  return dataResponse.value?.metaData
})

const rankStore = useRankStore()
const { availableRanks } = storeToRefs(rankStore)
const ranks = computed(() => {
  return availableRanks.value?.metaData
})
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'user',
    header: 'Người dùng',
    cell: ({ row }) =>
      h('div', { class: 'flex gap-2 items-center' }, [
        h(Avatar, {}, () => h(AvatarImage, { src: row.original.avatarPath }, '')),
        h('div', {}, [
          h('div', {}, [
            h('span', {}, [row.original.firstName, row.original.lastName]),
            h(
              'span',
              { class: 'text-muted-foreground white-space-pre' },
              ` #${row.original.refId}`
            ),
            h(
              row.original.gender === 'male'
                ? MaleIcon
                : row.original.gender === 'female'
                  ? FemaleIcon
                  : Icon,
              {
                class:
                  row.original.gender === 'male' ? 'inline text-blue-600' : 'inline text-pink-600'
              }
            )
          ]),
          h('div', {}, row.original.email)
        ]),
        h(
          UserEncapsulation,
          { userInfo: row.original, userId: row.original.refId },
          h(Icon, { name: 'User' })
        )
      ])
  },
  {
    accessorKey: 'userVip',
    header: 'VIP',
    cell: ({ row }) => h('div', {}, `VIP${row.original.userVip.currentVipLevel}`)
  },
  {
    accessorKey: 'rank',
    header: 'Cấp',
    cell: ({ row }) =>
      h('div', { class: 'flex gap-2 items-center' }, [
        h(
          'div',
          {},
          ranks.value ? ranks.value.find((el) => el.level == row.original.rank)?.name : ''
        ),
        h(SetUserRank, { user: row.original, onUpdate: userStore.getUserList })
      ])
  },
  {
    accessorKey: 'lastLogin',
    header: 'Lần đăng nhập cuối',
    cell: ({ row }) => h('div', {}, myDateFormatter.format(new Date(row.original.lastLogin)))
  },
  {
    accessorKey: 'balance',
    header: 'Số dư',
    cell: ({ row }) => h('div', {}, row.original.balance)
  },
  {
    accessorKey: 'action',
    header: 'Quyền truy cập',
    cell: ({ row }) =>
      h('div', { class: 'flex gap-1' }, [
        h(
          BanUser,
          { class: 'text-center', user: row.original, onUpdate: userStore.getUserList },
          row.original.isLocked
            ? h(Icon, { name: 'Ban', class: 'inline text-destructive cursor-pointer' })
            : h(Icon, { name: 'BadgeCheck', class: 'inline text-emerald-500' })
        ),
        h('div', { class: 'line-clamp-3' }, [row.original.banReason])
      ])
  }
]
</script>
