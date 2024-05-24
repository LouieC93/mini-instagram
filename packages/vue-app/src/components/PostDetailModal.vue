<template>
  <BaseModal>
    <div class="detail-container">
      <div class="img-container">
        <!-- <h1>23</h1> -->
        <img
          src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=3328&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="detail"
        />
        <!-- <img
            src="https://images.unsplash.com/photo-1623593721974-f39b78528626?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          /> -->
      </div>

      <div class="details">
        <div class="user">
          <BaseAvatar :size="avatarSize" />
          <p class="name">NAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAME</p>
        </div>

        <div class="post">
          <p class="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet alias in maxime
            consequatur quaerat iste similique sequi tenetur quasi ipsum nam quibusdam quidem minima
            architecto, officiis temporibus reiciendis deleniti assumenda cum laboriosam. Officia
            inventore odit voluptate quae, ab, ducimus quas ut architecto quis voluptatem, neque
            esse at et id dolorem exercitationem possimus reiciendis quibusdam debitis veritatis?
            Earum quas exercitationem dignissimos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Molestiae quidem explicabo deserunt obcaecati, vel neque.
          </p>
          <p class="tags">#123 #456 #123 #456 #123 #456</p>
          <p class="time">2024-11-22</p>
          <div class="comment" v-for="(item, index) in 10" :key="index">
            <BaseAvatar :size="avatarSize" class="avatar" />
            <p class="name">NAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAME</p>
            <p class="msg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, deleniti.
            </p>
            <p class="time">2024-11-22</p>
          </div>
          <div class="comment">
            <BaseAvatar :size="avatarSize" class="avatar" />
            <p class="name">NAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAME</p>
            <p class="msg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, deleniti. Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Distinctio, repudiandae.
            </p>
            <p class="time">2024-11-22</p>
          </div>
        </div>

        <div class="action-container">
          <PostActions :size="iconSize" />
          <div class="submit-container">
            <input
              type="text"
              v-model="newComment"
              placeholder="Add a comment..."
              name="new-post"
            />
            <button>Post</button>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script lang="ts" setup>
import BaseAvatar from './BaseAvatar.vue'
import BaseModal from './BaseModal.vue'
import PostActions from './PostActions.vue'

const avatarSize = 32
const iconSize = 24

const newComment = defineModel()
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
