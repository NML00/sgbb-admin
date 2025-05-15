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
    name: 'User',
    routes: [
      {
        path: '/dashboard/user',
        title: 'User list',
        icon: 'Users',
        description: 'Manage User'
      },
      {
        path: '/dashboard/sms',
        title: 'SMS list',
        icon: 'MessageCircleMore',
        description: 'SMS History'
      },
      {
        path: '/dashboard/room',
        title: 'Matching',
        icon: 'MessageSquareHeart',
        description: 'Matching room list'
      }
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
