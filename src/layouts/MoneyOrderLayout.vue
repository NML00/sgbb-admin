<template>
  <page-header title="Lệnh tiền"> </page-header>
  <div class="space-y-4">
    <div
      class="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
    >
      <RouterLink
        :to="{ name: 'MoneyOverview' }"
        exact-active-class="bg-background text-foreground shadow-sm"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        Tổng quan
      </RouterLink>
      <RouterLink
        :to="{ name: 'MoneyDeposit' }"
        exact-active-class="bg-background text-foreground shadow-sm"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        Lệnh nạp
      </RouterLink>
    </div>
    <RouterView />
  </div>
</template>
