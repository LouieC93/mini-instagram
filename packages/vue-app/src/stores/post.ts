import {
  sendLike,
  sendLoadPosts,
  sendNewComment,
  sendNewPost,
  sendSave,
  type Post
} from '@/services/post'
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
    getAllPosts()
  }

  const allPosts = ref<Post[]>([])
  async function getAllPosts() {
    allPosts.value = await sendLoadPosts()
  }

  async function togglePostActions(type: 'like' | 'save', postID: number) {
    const transMap = {
      request: {
        like: sendLike,
        save: sendSave
      },
      counter: {
        like: 'like_by',
        save: 'save_by'
      },
      isClicked: {
        like: 'likedByMe',
        save: 'savedByMe'
      }
    }
    const isAdd = await transMap.request[type](postID)
    const post = allPosts.value.find((post) => post.id === postID) as Post
    const typeCount = transMap.counter[type] as 'like_by' | 'save_by'
    const typeClicked = transMap.isClicked[type] as 'likedByMe' | 'savedByMe'

    post[typeClicked] = isAdd
    if (isAdd) {
      post[typeCount]++
    } else {
      post[typeCount]--
    }
  }

  const isDetailModalShow = ref(false)
  const currentPostId = ref<number | null>(null)
  function closeDetailModal() {
    isDetailModalShow.value = false
    currentPostId.value = null
  }
  function openDetailModal(postId: number) {
    isDetailModalShow.value = true
    currentPostId.value = postId
  }
  function getPostDetails(): Post {
    const post = allPosts.value.find((post) => post.id === currentPostId.value) as Post
    return post
  }

  async function createComment(msg: string, postId: number) {
    await sendNewComment(msg, postId)
    const post = allPosts.value.find((post) => post.id === postId) as Post
    post.comments++
  }

  return {
    isUploadModalShow,
    closeUploadModal,
    openUploadModal,
    createPost,
    allPosts,
    getAllPosts,
    togglePostActions,
    isDetailModalShow,
    closeDetailModal,
    openDetailModal,
    getPostDetails,
    createComment
  }
})
