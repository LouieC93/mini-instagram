<template>
  <main>
    <div class="search-words">
      <h1>search result: {{ keyword }}</h1>
    </div>
    <PostList>
      <PostItem v-for="(item, index) in 20" :key="index" @click="open" />
    </PostList>
    <PostDetailModal @close="close" v-if="isModalOpen" />
    <PostUpload v-if="false" />
  </main>
</template>
<script lang="ts" setup>
import PostDetailModal from '@/components/PostDetailModal.vue'
import PostUpload from '@/components/PostUpload.vue'
import PostList from '@/components/PostList.vue'
import PostItem from '@/components/PostItem.vue'
import { ref } from 'vue'

const isModalOpen = ref(false)
function close() {
  isModalOpen.value = false
}
function open() {
  isModalOpen.value = true
}

const keyword = ref('123456')
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
