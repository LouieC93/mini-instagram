<template>
  <main>
    <div class="post-list">
      <div class="post" v-for="(item, index) in 20" :key="index" @click="open">
        <div class="img-container">
          <img
            src="https://images.unsplash.com/photo-1623593721974-f39b78528626?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div class="post-info">
          <div class="prop-container">
            <div class="left">
              <div class="avatar-container">
                <BaseAvatar :size="36" />
                <p class="name">NAMENAMENAMENAMENAME</p>
              </div>
              <p class="date">2222.22.22</p>
            </div>
            <PostActions />
          </div>
          <p class="desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae eius voluptatem
            reiciendis, consequuntur dignissimos quisquam suscipit velit ex odit similique, in
            deserunt porro autem repellendus veniam necessitatibus sapiente voluptates molestiae
            debitis modi, ut numquam hic quos! Harum at, iusto deleniti, ab provident voluptas
            voluptatem fuga quibusdam, aliquid amet sed veritatis.
          </p>
        </div>
      </div>
    </div>
    <PostDetailModal @close="close" v-if="isModalOpen" />
    <PostUpload v-if="false"/>
  </main>
</template>
<script lang="ts" setup>
import BaseAvatar from '@/components/BaseAvatar.vue'
import PostActions from '@/components/PostActions.vue'
import PostDetailModal from '@/components/PostDetailModal.vue'
import PostUpload from '@/components/PostUpload.vue'
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
.post-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 36px;
  .post:nth-child(odd) {
    grid-column: 2 / span 2;
  }
  .post:nth-child(even) {
    grid-column: 4 / span 2;
  }
  .post {
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 24px 4px #eee;
    scroll-snap-align: start;
    scroll-margin-top: 36px;
    &:nth-child(1) {
      scroll-margin-top: 48px;
    }
  }
  .img-container {
    display: grid;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #ccc;
    aspect-ratio: 4 / 3;
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  .post-info {
    padding: 18px;
    padding-left: 24px;
    .prop-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr) auto;
      p {
        font-size: 14px;
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
      }
      .left {
        grid-column: 1 / span 2;
        display: grid;
        align-content: start;
        grid-gap: 6px;
        margin-right: 18px;
        .avatar-container {
          display: grid;
          grid-auto-flow: column;
          justify-content: start;
          grid-gap: 12px;
          align-items: center;
        }
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .date {
          color: #888;
        }
      }
      .post-actions {
        grid-column: 3;
      }
    }
  }
  .desc {
    margin-top: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
}
</style>
