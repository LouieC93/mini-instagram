<template>
  <BaseModal @close="postStore.closeDetailModal()">
    <div class="detail-container">
      <div class="img-container">
        <img :src="postDetail.imgUrl" alt="detail-image" />
      </div>

      <div class="details">
        <div class="user">
          <BaseAvatar :size="avatarSize" :src="postDetail.post_by.avatar_link" />
          <p class="name">{{ postDetail.post_by.nickname }}</p>
        </div>

        <div class="post">
          <p class="desc">
            {{ postDetail.description }}
          </p>
          <!-- <p class="tags"></p> -->
          <p class="time">{{ formattedDate }}</p>
          <div class="comment" v-for="comment in comments" :key="comment.id">
            <BaseAvatar :size="avatarSize" class="avatar" :src="comment.comment_by.avatar_link" />
            <p class="name">{{ comment.comment_by.nickname }}</p>
            <p class="msg">
              {{ comment.content }}
            </p>
            <p class="time">{{ comment.publishedAt }}</p>
          </div>
        </div>

        <div class="action-container">
          <PostActions
            :size="iconSize"
            :likes="postDetail?.like_by"
            :saves="postDetail?.save_by"
            :comments="postDetail?.comments"
            :likeByMe="postDetail?.likedByMe"
            :saveByMe="postDetail?.savedByMe"
            @like="toggleAction('like')"
            @save="toggleAction('save')"
          />
          <form class="submit-container" @submit.prevent="submitComment">
            <input
              type="text"
              v-model="newComment"
              placeholder="Add a comment..."
              name="new-post"
            />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script lang="ts" setup>
import { usePostStore } from '@/stores/post'
import BaseAvatar from './BaseAvatar.vue'
import BaseModal from './BaseModal.vue'
import PostActions from './PostActions.vue'
import { computed } from 'vue'
import { getPublishDate } from '@/utils/date'

const avatarSize = 32
const iconSize = 24

const newComment = defineModel<string>({ default: '' })

const postStore = usePostStore()
const postDetail = computed(() => postStore.getPostDetails())
const formattedDate = computed(() => getPublishDate(postDetail.value?.publishedAt) || '')
function toggleAction(type: 'like' | 'save') {
  postStore.togglePostActions(type, postDetail.value?.id)
}

const comments = computed(() =>
  postStore.allComments.map((comment) => {
    return {
      ...comment,
      publishedAt: getPublishDate(comment.publishedAt)
    }
  })
)

async function submitComment() {
  await postStore.createComment(newComment.value, postDetail.value.id)
  newComment.value = ''
}
</script>
<style lang="scss" scoped>
.detail-container {
  width: 70dvw;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: 1fr;
  overflow: hidden;
  font-size: 14px;
  .name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .time {
    color: #666;
    font-size: 12px;
  }
  .img-container {
    grid-column: 1 / 5;
    overflow: hidden;
    display: grid;
    justify-items: center;
    align-items: center;
    height: 100%;
    > img {
      width: 100%;
      height: 100%;
      overflow: hidden;
      object-fit: contain;
    }
  }
  .details {
    grid-column: 5 / 8;
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-auto-flow: row;
    border-left: 1px solid #bbb;
    grid-template-rows: minmax(auto, 72px) 1fr 120px;
    .user {
      height: 100%;
      padding: 0 60px 0 24px;
      display: grid;
      grid-gap: 12px;
      grid-template-columns: repeat(2, minmax(0, auto));
      justify-content: left;
      align-items: center;
      overflow: hidden;
    }
    .post {
      overflow: auto;
      padding: 24px;
      border-top: 1px solid #bbb;
      border-bottom: 1px solid #bbb;
      &::-webkit-scrollbar {
        display: none;
      }
      > p {
        white-space: pre-line;
        margin-bottom: 12px;
      }
      .tags {
        color: $blue;
      }
    }
    .comment {
      display: grid;
      align-items: center;
      margin-bottom: 18px;
      grid-gap: 4px 12px;
      grid-template-columns: auto 1fr;
      grid-template-rows: repeat(3, auto);
      grid-template-areas:
        'avatar name'
        'comment comment'
        'time time';
      &:last-child {
        margin-bottom: 0;
      }
      .avatar {
        grid-area: avatar;
      }
      .name {
        grid-area: name;
      }
      .msg {
        grid-area: comment;
      }
      .time {
        grid-area: time;
        margin-top: 4px;
      }
    }
    .action-container {
      display: grid;
      grid-template-rows: repeat(2, auto);
      padding: 12px 0;
      grid-gap: 12px;
    }
    :deep(.post-actions) {
      padding: 0 20px;
      grid-gap: 2px 16px;
      justify-content: left;
      > p {
        color: #666;
      }
    }
    .submit-container {
      display: grid;
      grid-template-columns: 1fr auto;
      padding: 0 24px 0 18px;
      grid-gap: 12px;
      align-items: center;
      input {
        border-radius: 24px;
        background: #eee;
        border: none;
        height: 36px;
      }
      button {
        height: 100%;
        color: $blue;
        font-size: 16px;
      }
    }
  }
}
</style>
