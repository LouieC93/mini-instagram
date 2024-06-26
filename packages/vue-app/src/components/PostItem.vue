<template>
  <div class="post" v-if="post">
    <div class="img-container" @click="postStore.openDetailModal(post.id)">
      <img :src="post?.imgUrl" alt="post-image" />
    </div>
    <div class="post-info">
      <div class="prop-container">
        <div class="left">
          <div class="avatar-container">
            <BaseAvatar :size="36" :src="post?.post_by.avatar_link" />
            <p class="name">{{ post?.post_by.nickname }}</p>
          </div>
          <p class="date">{{ formattedDate }}</p>
        </div>
        <PostActions
          :likes="post?.like_by"
          :saves="post?.save_by"
          :comments="post?.comments"
          :likeByMe="post?.likedByMe"
          :saveByMe="post?.savedByMe"
          @like="toggleAction('like')"
          @save="toggleAction('save')"
          @comment="postStore.openDetailModal(post.id)"
        />
      </div>
      <p class="desc" @click="postStore.openDetailModal(post.id)">
        {{ post?.description }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BaseAvatar from '@/components/BaseAvatar.vue'
import PostActions from '@/components/PostActions.vue'
import type { Post } from '@/services/post'
import { usePostStore } from '@/stores/post'
import { getPublishDate } from '@/utils/date'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    post: Post
  }>(),
  {
    post: undefined
  }
)

const formattedDate = computed(() => getPublishDate(props?.post?.publishedAt) || '')

const postStore = usePostStore()
function toggleAction(type: 'like' | 'save') {
  postStore.togglePostActions(type, props?.post?.id)
}
</script>

<style lang="scss" scoped>
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
  .img-container,
  .desc {
    cursor: pointer;
  }
}
.img-container {
  display: grid;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #ccc;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  -webkit-line-clamp: 3;
  overflow: hidden;
  white-space: pre-line;
}
@media (max-width: 1024px) {
  .post-list {
    .post:nth-child(odd) {
      grid-column: 2 / span 5;
    }
    .post:nth-child(even) {
      grid-column: 7 / span 5;
    }
  }
  .post {
    scroll-margin-top: 28px;
  }
}
@media (max-width: 640px) {
  .post-list {
    .post {
      scroll-margin-top: 18px;
      .avatar-container > img {
        width: 30px;
        height: 30px;
      }
    }
    .post:nth-child(odd) {
      grid-column: 2 / 12;
    }
    .post:nth-child(even) {
      grid-column: 2 / 12;
    }
  }
  .post-info {
    padding: 16px;
    padding-left: 18px;
  }
}
</style>
