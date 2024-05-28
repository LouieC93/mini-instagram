import { defineStore } from 'pinia'
import { ref } from 'Vue'

export const usePostStore = defineStore('postStore', () => {
  const p = ref(0)
  return { p }
})
