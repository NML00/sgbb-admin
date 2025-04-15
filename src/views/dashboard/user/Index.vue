<template>
  <div>
    <page-header title="Users"> </page-header>
    <!-- <div class="flex py-4">
      <label class="py-">
        Users Name
        <Input prependIcon="User" />
      </label>
    </div> -->
    <DataTable :columns="columns" :data="userList" />
  </div>
</template>

<script lang="ts" setup>
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
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
const { userList: dataResponse } = storeToRefs(userStore)

const userList = computed(() => {
  return dataResponse.value?.metaData?.results ?? []
})
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) =>
      h('div', { class: 'flex gap-2' }, [
        h(Avatar, {}, h(AvatarImage, { src: logo })),
        h('div', {}, [
          h('div', {}, [
            h('span', {}, [row.original.firstName, row.original.lastName]),
            h('span', { class: 'text-muted-foreground white-space-pre' }, ` #${row.original.refId}`)
          ]),
          h('div', {}, row.original.email)
        ])
      ])
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last login',
    cell: ({ row }) => h('div', {}, myDateFormatter.format(new Date(row.original.lastLogin)))
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
    cell: ({ row }) => h('div', {}, row.original.balance)
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => h('div', {}, 'Block')
  }
]
</script>
