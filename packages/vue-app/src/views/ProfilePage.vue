import type BaseAvatar from '@/components/BaseAvatar.vue';
<template>
  <main>
    <section class="info-container">
      <BaseAvatar :size="120" :src="user?.avatar_link" />
      <div class="profile">
        <div>
          <p class="name">{{ user?.nickname }}</p>
          <router-link :to="{ name: 'profileEdit' }">Edit Profile</router-link>
        </div>
        <p class="account">@{{ user?.username }}</p>
        <p class="intro">
          {{ user?.intro }}
        </p>
      </div>
    </section>
    <section class="tabs-container">
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: index === currentTab }"
        @click="currentTab = index"
      >
        <BaseIcon
          :icon-id="tab.icon"
          :size="tabSize"
          :fill="index === currentTab ? '#0092ea' : '#333'"
          :stroke="'none'"
        />
        <span>{{ tab.name }}</span>
      </div>
    </section>
    <p class="amount">{{ currentPreviews.length }} posts</p>
    <section class="posts-container">
      <div class="prev" v-for="preview in currentPreviews" :key="preview.id">
        <img :src="preview.imgUrl" alt="preview-image" />
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import BaseAvatar from '@/components/BaseAvatar.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import type { Post, PreviewImages } from '@/services/post'
import { usePostStore } from '@/stores/post'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref, watch } from 'vue'

const tabSize = ref(24)
const tabs = ref([
  {
    icon: 'posts',
    name: 'POSTS'
  },
  {
    icon: 'heart',
    name: 'LIKES'
  },
  {
    icon: 'collect',
    name: 'SAVES'
  }
])
const currentTab = ref(0)
const currentPreviews = ref<PreviewImages[] | Post[]>([])
watch(currentTab, (newIndex) => {
  switch (newIndex) {
    case 0:
      currentPreviews.value = myPreviews.value
      break
    case 1:
      currentPreviews.value = myLikedPreviews.value
      break
    case 2:
      currentPreviews.value = mySavedPreviews.value
      break
  }
})

const postStore = usePostStore()
const myPreviews = computed(() => postStore.myPosts)
const myLikedPreviews = computed(() => postStore.myLikedPosts)
const mySavedPreviews = computed(() => postStore.mySavedPosts)

onMounted(async () => {
  await postStore.getMyPosts(userStore.user.id)
  postStore.getMyLikedPosts()
  postStore.getMySavedPosts()
  currentPreviews.value = myPreviews.value
})

const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>
<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: auto;
  align-content: start;
  justify-content: center;
  padding: 60px 0;
  overflow: auto;
  > * {
    grid-column: 2 / 6;
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info-container {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 48px;
    align-items: center;
    align-content: start;
    .avatar {
      align-self: start;
      justify-self: end;
    }
    .profile {
      display: grid;
      overflow: hidden;
      align-content: start;
      word-break: break-word;
      > div {
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-gap: 12px;
        align-items: center;
        font-size: 18px;
      }
      .account {
        font-size: 12px;
        color: #666;
        margin-top: 4px;
      }
      .intro {
        margin-top: 18px;
        white-space: pre-wrap;
      }
      a {
        color: #fff;
        background: $blue;
        padding: 6px 16px;
        border-radius: 8px;
        white-space: nowrap;
        font-size: 14px;
        font-weight: bold;
        justify-self: end;
      }
    }
  }
  .tabs-container {
    margin-top: 60px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    padding-top: 24px;
    border-top: 1px solid #999;
    .tab {
      display: grid;
      grid-template-rows: repeat(2, auto);
      grid-gap: 6px;
      justify-items: center;
      cursor: pointer;
      > span {
        font-weight: 500;
      }
    }
    .tab.active {
      color: $blue;
      > span {
        font-weight: bold;
      }
    }
  }
  .amount {
    text-align: center;
    margin: 36px 0 24px;
    font-weight: bold;
  }
  .posts-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 6px;
    .prev {
      aspect-ratio: 1 /1;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
}
@media (max-width: 1024px) {
  main {
    grid-template-columns: repeat(12, 1fr);
    > * {
      grid-column: 2 / 12;
    }
  }
}
@media (max-width: 640px) {
  main {
    padding: 36px 0;
    .info-container {
      grid-template-rows: repeat(2, auto);
      grid-template-columns: none;
      grid-gap: 18px;
      .avatar {
        justify-self: center;
      }
      > img {
        width: 90px;
        height: 90px;
      }
    }
    .tabs-container {
      margin-top: 28px;
      padding-top: 18px;
    }
  }
}
</style>
