import { sendNewPost } from '@/services/post'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore('postStore', () => {
  const isUploadModalShow = ref(false)
  function closeUploadModal() {
    isUploadModalShow.value = false
  }
  function openUploadModal() {
    isUploadModalShow.value = true
  }

  async function createPost(image: File, description: string) {
    await sendNewPost(image, description)
  }

  return { isUploadModalShow, closeUploadModal, openUploadModal, createPost }
})
