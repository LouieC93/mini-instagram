<template>
  <nav>
    <router-link class="logo" :to="{ name: 'home' }">
      <img src="../assets//logo.png" alt="logo" />
    </router-link>
    <form class="search-container" @submit.prevent="searchPosts">
      <BaseIcon :iconId="'search'" :size="24" @click="searchPosts" />
      <input type="text" v-model="searchText" />
    </form>
    <div class="buttons-container">
      <BaseIcon :iconId="'add'" @click="addPost" />
      <div class="avatar-container" @click="toggleDropdown">
        <div class="backdrop" v-if="isDropdownShow"></div>
        <BaseAvatar :src="userAvatar" />
        <div class="dropdown-menu" v-if="isDropdownShow">
          <ul>
            <li @click="router.push({ name: 'profile' })">Profile</li>
            <li @click="logout">Logout</li>
          </ul>
          <div class="triangle"></div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'
import BaseIcon from './BaseIcon.vue'
import BaseAvatar from './BaseAvatar.vue'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { usePostStore } from '@/stores/post'

const isDropdownShow = ref(false)

const postStore = usePostStore()
function addPost() {
  postStore.openUploadModal()
}
function toggleDropdown() {
  isDropdownShow.value = !isDropdownShow.value
}

const userStore = useUserStore()
const router = useRouter()
function logout() {
  userStore.logout()
  router.replace({ name: 'login' })
}
const userAvatar = computed(() => userStore.user.avatar_link)

const searchText = ref('')
async function searchPosts() {
  if (!searchText.value.trim()) return
  await postStore.getSearchPosts(searchText.value)
  router.push({ name: 'search', query: { q: searchText.value } })
}
</script>
<style scoped lang="scss">
nav {
  display: grid;
  align-items: center;
  height: 80px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  .logo {
    grid-column: 2 / 3;
    justify-self: start;
    display: grid;
    justify-content: center;
    > img {
      width: 40px;
    }
  }
  .search-container {
    grid-column: 3 / 5;
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
    padding: 12px;
    border-radius: 24px;
    background: #eee;
    > input {
      background: none;
      border: none;
      padding: 0;
    }
    > svg {
      cursor: pointer;
    }
  }
  .buttons-container {
    grid-column: 5 / 6;
    justify-self: end;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 12px;
    > * {
      display: grid;
      cursor: pointer;
    }
  }
  .avatar-container {
    position: relative;
    .backdrop {
      position: fixed;
      width: 100dvw;
      height: 100dvh;
      left: 0;
      top: 0;
      background: #3332;
      z-index: 1;
      cursor: auto;
    }
    .dropdown-menu {
      position: absolute;
      z-index: 2;
      right: 0;
      bottom: -12px;
      transform: translateY(100%);
      filter: drop-shadow(0 4px 6px #6663);
      > * {
        background: #fefefe;
      }
      ul {
        display: grid;
        position: relative;
        overflow: hidden;
        border-radius: 6px;
        z-index: 2;
        font-size: 1.2rem;
        li {
          padding: 12px 24px;
        }
        li:hover {
          background: $blue;
          color: #fff;
        }
      }
      .triangle {
        position: absolute;
        z-index: 1;
        top: -6px;
        right: 4px;
        width: 28px;
        height: 28px;
        transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
        border-top-right-radius: 6px;
      }
      li {
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 1024px) {
  nav {
    height: 60px;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    .logo {
      grid-column: 2 / 3;
      > img {
        width: 36px;
      }
    }
    .search-container {
      grid-column: 4 / 9;
      padding: 6px;
    }
    .buttons-container {
      grid-column: 10 / 12;
    }
    .avatar-container .dropdown-menu {
      bottom: -18px;
    }
  }
}
@media (max-width: 640px) {
  nav {
    .logo {
      > img {
        width: 30px;
      }
    }
    .search-container {
      grid-column: 3 / 9;
      margin-left: 12px;
      > svg {
        width: 24px;
      }
    }
    .buttons-container {
      grid-column: 10 / 12;
      > svg {
        width: 30px;
      }
    }
    .avatar-container {
      > img {
        width: 36px;
        height: 36px;
      }
    }
  }
}
</style>
