import type BaseAvatar from '@/components/BaseAvatar.vue';
<template>
  <main>
    <section class="info-container">
      <BaseAvatar :size="120" />
      <div class="profile">
        <div>
          <p class="name">NAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAMENAME</p>
          <router-link :to="{ name: 'profileEdit' }">Edit Profile</router-link>
        </div>
        <p class="account">
          @ACCOUNTACCOUNTACCOUNTACCOUNTACCOUNTACCOUNTACCOUNTACCOUNTACCOUNTACCOUNTACCOUNTACCOUNTACCOUNTACCOUNT
        </p>
        <p class="intro">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum hic nam repellendus
          voluptate aut, quisquam eos tempora facilis! Est, et? Odit dolorem nemo illo similique
          quas placeat quidem earum officia.
        </p>
      </div>
    </section>
    <section class="tabs-container">
      <div class="tab">
        <BaseIcon :icon-id="'posts'" :size="tabSize" :fill="'#000'" :stroke="'none'" />
        <span>POSTS</span>
      </div>
      <div class="tab">
        <BaseIcon :icon-id="'heart'" :size="tabSize" :fill="'none'" :stroke="'#000'" />
        <span>LIKES</span>
      </div>
      <div class="tab">
        <BaseIcon :icon-id="'collect'" :size="tabSize" :fill="'none'" :stroke="'#000'" />
        <span>SAVES</span>
      </div>
    </section>
    <p class="amount">123 posts</p>
    <section class="posts-container">
      <div class="prev" v-for="(item, index) in 10" :key="index">
        <img
          src="https://images.unsplash.com/photo-1715523089278-c2c768164abb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="post"
        />
      </div>
      <div class="prev" v-for="(item, index) in 10" :key="index">
        <img
          src="https://images.unsplash.com/photo-1707730376818-a7a02fe896d5?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="post"
        />
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import BaseAvatar from '@/components/BaseAvatar.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { ref } from 'vue'

const tabSize = ref(24)
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
    grid-template-columns: 1fr 3fr;
    grid-gap: 60px;
    align-items: center;
    align-content: start;
    .avatar {
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
      }
      a {
        color: #fff;
        background: $blue;
        padding: 6px 16px;
        border-radius: 8px;
        white-space: nowrap;
        font-size: 14px;
        font-weight: bold;
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
</style>
