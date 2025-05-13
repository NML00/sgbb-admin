interface IDashboardMenus {
  title: string
  icon: string
  path: string
  description?: string
  hidden?: boolean
}
export type PaginationParams = {
  page: number
  limit: number
}

export const SIDEBAR_EXPAND_WIDTH = 280
export const SIDEBAR_COLLAPSED_WIDTH = 72
export const APP_MENU: Record<string, { name: string; routes: IDashboardMenus[] }> = {
  main: {
    name: 'Core',
    routes: [
      {
        title: 'Lệnh tiền',
        icon: 'CircleDollarSign',
        path: '/dashboard/money'
      },
      {
        title: 'Danh sách Admin',
        icon: 'Shield',
        path: '/dashboard/admin'
      }
    ]
  },
  settings: {
    name: 'General',
    routes: [
      {
        path: '/dashboard/user',
        title: 'User',
        icon: 'Users',
        description: 'Manage User'
      },
    ]
  }
}
export const userRank = [
  'bronze',
  'silver',
  'gold',
  'platinum',
  'diamond',
  'highness',
  'superior'
]
export const globalSearch = {}
