<template>
  <main>
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
</script>

<style lang="scss" scoped>
main {
  overflow: auto;
  padding: 48px 0;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
</style>
