<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { computed } from 'vue'
import { useMyFetch, type ListData, type Response } from '@/config/fetch'
import CreateAdminDialog from '@/components/CreateAdminDialog.vue'

// ['read', 'edit', 'write', 'delete', 'super']
export type Admin = {
  email: string
  password: string
  isLocked: boolean
  roles: Array<string>
  createdAt: string
  id: string
}

const url = '/manager/list'
const fullAPIURL = computed(() => {
  return url
})

const { data } = useMyFetch(fullAPIURL).json<Response<ListData<Admin>>>()
const adminList = computed(() => {
  return data.value?.status === 200 && data.value.metaData ? data.value.metaData : undefined
})
</script>
<template>
  <div>
    <page-header title="Quản lý Admin"> </page-header>

    <div class="grid grid-cols-12">
      <Card class="col-span-7">
        <CardHeader>
          <CardTitle>
            <div class="flex gap-2 justify-between">
                Danh sách Admin
                <CreateAdminDialog></CreateAdminDialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent class="pl-2">
          <div class="mt-4" v-if="adminList">
            <div
              class="flex items-center bg-muted p-1"
              v-for="admin in adminList.results"
              :key="`admin${admin.id}`"
            >
              <Avatar class="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>Admin</AvatarFallback>
              </Avatar>
              <div class="ml-4 space-y-1">
                <p class="text-sm font-medium leading-none">{{ admin.email }} </p>
                <p class="text-sm text-muted-foreground uppercase">{{ admin.roles }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
