import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { camelize, getCurrentInstance, toHandlerKey } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const truncateString = (input: string, start: number = 6, end: number = 12) => {
  if (input.length > start + end + 4) {
    return input.substring(0, start) + '...' + input.substring(input.length - end)
  }
  return input
}
export const truncateNumber = (input: string | number) => {
  const myNum = Number(input).toLocaleString('en-US', { maximumFractionDigits: 4 })
  // const twoParts = myNum.split('.');
  return myNum
}
export const formateDate = (input: string) => {
  const myDate = new Date(input).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  return myDate
}

export const myDateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit'
})


