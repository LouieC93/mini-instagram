<template>
  <main>
    <PostList>
      <PostItem :post="post" v-for="post in allPosts" :key="post.id"/>
    </PostList>
    <PostDetailModal v-if="false" />
    <PostUpload v-if="isUploadModalOpen" />
  </main>
</template>
<script lang="ts" setup>
import PostDetailModal from '@/components/PostDetailModal.vue'
import PostUpload from '@/components/PostUploadModal.vue'
import PostList from '@/components/PostList.vue'
import PostItem from '@/components/PostItem.vue'
import { computed, onMounted, ref } from 'vue'
import { usePostStore } from '@/stores/post'


const postStore = usePostStore()
const isUploadModalOpen = computed(() => postStore.isUploadModalShow)

const allPosts = computed(()=>postStore.allPosts) 

onMounted(() => {
  postStore.getAllPosts()
})
</script>

<style lang="scss" scoped>
main {
  overflow: auto;
  padding: 48px 0;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
</style>
