<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const formSchema = toTypedSchema(
  z.object({
    password: z.string().min(6).default('admin1@BBG'),
    email: z.string().email().default('admin1@gmail.com')
  })
)

const form = useForm({
  validationSchema: formSchema
})

const authStore = useAuthStore()
const router = useRouter()
const onSubmit = form.handleSubmit(async (val) => {
  const data = await authStore.loginEmail(val)
  if (data.value.status === 200) {
    router.push('/')
  }
})
</script>

<template>
  <main class="h-screen w-screen flex items-center justify-center">
    <Card class="max-w-[320px] md:max-w-[400px] w-full">
      <CardHeader>
        <CardTitle class="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent class="pb-0">
        <form @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem class="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example@mail.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <!-- <div class="flex items-center space-x-2 my-4">
            <Checkbox id="terms" />
            <Label for="terms">Remember Me</Label>
          </div> -->
          <Button class="w-full my-4" type="submit">Login</Button>
        </form>
      </CardContent>
      <!-- <CardFooter>
        <div class="w-full">
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
            </div>
          </div>
          <div class="grid gap-4 grid-cols-2">
            <Button variant="outline" prepend-icon="GithubIcon" class="w-full"> Github </Button>
            <Button variant="outline" prepend-icon="Gitlab" class="w-full"> Gitlab </Button>
          </div>
        </div>
      </CardFooter> -->
    </Card>
  </main>
</template>
