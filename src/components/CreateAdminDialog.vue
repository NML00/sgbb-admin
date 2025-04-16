<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMyFetch } from '@/config/fetch'
import { ref } from 'vue'

const formSchema = toTypedSchema(
  z
    .object({
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
      email: z.string().email()
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match',
          path: ['confirmPassword']
        })
      }
    })
)
const form = useForm({
  validationSchema: formSchema
})
const onSubmit = form.handleSubmit(async (val) => {
  const { password, email } = val
  const { data } = await useMyFetch('auth/create').post({ password, email }).json()
  if (data.value) {
    open.value = true;
  }
})
const open = ref(false)
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <button class="p-1 leading-4 rounded-full hover:bg-secondary">
        <Icon name="Plus" size="36" />
      </button>
    </DialogTrigger>
    <DialogContent class="bg-secondary rounded">
      <DialogHeader>
        <DialogTitle>Create Admin</DialogTitle>
        <DialogDescription> Create a new admin with email and password </DialogDescription>
      </DialogHeader>
      <div>
        <form @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem class="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autocomplete="email"
                  placeholder="example@mail.com"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" autocomplete="new-password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" autocomplete="new-password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <!-- <div class="flex items-center space-x-2 my-4">
            <Checkbox id="terms" />
            <Label for="terms">Remember Me</Label>
          </div> -->
          <Button class="w-full mt-4" type="submit">Login</Button>
        </form>
      </div>
    </DialogContent>
  </Dialog>
</template>
