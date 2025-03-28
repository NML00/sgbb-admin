<template>
  <div>
    <page-header title="Users"> </page-header>
    <div class="flex py-4">
      <label class="py-">
        Users Name
        <Input prependIcon="User" />
      </label>
    </div>
    <DataTable :columns="columns" :data="users" />
  </div>
</template>

<script lang="ts" setup>
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import data from '@/assets/tasks.json'
import { ref, h } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import DataTableHeader from '@/components/ui/data-table/DataTableHeader.vue'
import type { Column } from '@tanstack/vue-table'
import { Badge } from '@/components/ui/badge'
import logo from '@/assets/images/logo.svg'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'

const users = ref([
  { name: 'mitchell', diamond: 32000, img: logo, lastActive: new Date().toDateString(), rank: 'Silver', id: '698987' }
])

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) =>
      h('div', { class: 'flex gap-2' }, [
        h(Avatar, {}, h(AvatarImage, { src: row.original.img })),
        h('div', {}, [
          h('div', {}, row.original.name),
          h('div', {}, row.original.rank)
        ])
      ])
  },
  {
    accessorKey: 'lastActive',
    header: 'Last Active',
    cell: ({ row }) => h('div', {}, row.original.lastActive)
  },
  {
    accessorKey: 'diamond',
    header: 'Diamond',
    cell: ({ row }) => h('div', {}, row.original.diamond)
  }
]
</script>
