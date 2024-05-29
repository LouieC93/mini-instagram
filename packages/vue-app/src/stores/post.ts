import { defineStore } from 'pinia'
import { ref } from 'Vue'

export const usePostStore = defineStore('postStore', () => {
  const isUploadModalShow = ref(false)
  function closeUploadModal() {
    isUploadModalShow.value = false
  }
  function openUploadModal() {
    isUploadModalShow.value = true
  }
  return { isUploadModalShow, closeUploadModal, openUploadModal}
})
