<template>
  <main>
    <div class="search-words">
      <h1>search result: {{ keyword }}</h1>
    </div>
    <PostList v-if="searchPosts.length">
      <PostItem v-for="post in searchPosts" :post="post" :key="post.id" />
    </PostList>
    <h1 v-else>No matched post</h1>
    <PostDetailModal v-if="isDetailModalOpen" />
    <PostUpload v-if="isUploadModalOpen" />
  </main>
</template>
<script lang="ts" setup>
import PostDetailModal from '@/components/PostDetailModal.vue'
import PostUpload from '@/components/PostUploadModal.vue'
import PostList from '@/components/PostList.vue'
import PostItem from '@/components/PostItem.vue'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/post'

const isUploadModalOpen = computed(() => postStore.isUploadModalShow)
const isDetailModalOpen = computed(() => postStore.isDetailModalShow)

const route = useRoute()
const keyword = computed(() => route.query.q as string)
const postStore = usePostStore()
const searchPosts = computed(() => postStore.searchPosts)

onMounted(async () => {
  await postStore.getSearchPosts(keyword.value)
})
</script>

<style lang="scss" scoped>
main {
  overflow: auto;
  padding-bottom: 48px;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  .search-words {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 36px;
    padding: 36px 0 24px 0;
    h1 {
      grid-column: 2 / span 4;
      font-size: 24px;
      color: #333;
    }
  }
  :deep(.post:first-child) {
    scroll-margin-top: 150px;
  }
}
</style>
