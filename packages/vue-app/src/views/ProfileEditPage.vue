<template>
  <form @submit.prevent="handleSubmit">
    <h1>Edit profile</h1>
    <section class="avatar-container">
      <BaseAvatar :size="72" :src="userForm.avatar_link" />
      <label class="button" for="upload">
        <span>Change photo</span>
      </label>
      <input type="file" id="upload" accept="'image/*'" @change="handleUpload" />
    </section>
    <section>
      <h2>Username</h2>
      <input type="text" v-model="userForm.username" readonly />
    </section>
    <section>
      <h2>Nickname</h2>
      <input type="text" v-model="userForm.nickname" />
    </section>
    <section>
      <h2>Introduction</h2>
      <textarea v-model="userForm.intro"></textarea>
    </section>
    <section>
      <h2>Notification</h2>
      <label
        class="toggle"
        :class="{ active: userForm.notification }"
        for="notification"
        @click="userForm.notification = !userForm.notification"
        ><span class="slider"></span>
      </label>
      <input type="checkbox" v-model="userForm.notification" />
    </section>
    <section class="submit-container">
      <button type="button" @click="handleCancel">Cancel</button>
      <button type="submit">Submit</button>
    </section>
  </form>
</template>
<script lang="ts" setup>
import BaseAvatar from '@/components/BaseAvatar.vue'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const defaultUser = computed(() => userStore.user)
const userForm = ref({
  avatar_link: defaultUser.value.avatar_link,
  username: defaultUser.value.username,
  nickname: defaultUser.value.nickname,
  intro: defaultUser.value.intro,
  notification: defaultUser.value.notification
})
async function handleUpload(e: Event) {
  const uploadedFile = (e.target as HTMLInputElement).files?.[0]
  const newUrl = await userStore.uploadAvatar(uploadedFile as File)
  userForm.value.avatar_link = newUrl
}

const router = useRouter()
async function handleSubmit() {
  await userStore.updateUserData(userForm.value)
  router.push({ name: 'profile' })
}
function handleCancel() {
  router.push({ name: 'profile' })
}
</script>

<style lang="scss" scoped>
form {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-content: start;
  overflow: auto;
  > * {
    grid-column: 2 / 6;
  }
  > h1 {
    font-size: 28px;
    font-weight: bold;
    margin: 48px 0 36px;
  }
  > section {
    margin-bottom: 36px;
    h2 {
      font-size: 18px;
      padding-left: 2px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    input[type='text'],
    textarea {
      width: 100%;
      border: 1px solid #999;
      border-radius: 12px;
    }
    input[type='text'] {
      height: 48px;
    }
    textarea {
      height: 120px;
    }
    input[type='checkbox'] {
      display: none;
    }
    input[readonly] {
      background: #eee;
    }
    button[type='submit'],
    button[type='button'] {
      background: #fff;
      font-size: 18px;
      border-radius: 12px;
      padding: 12px 36px;
      border: 1px solid #999;
    }
    button[type='submit'] {
      border: none;
      color: #fff;
      background: $blue;
      margin-top: 12px;
    }
    .toggle {
      display: block;
      width: 60px;
      height: 32px;
      background: #ddd;
      border-radius: 100px;
      position: relative;
      cursor: pointer;
      .slider {
        position: absolute;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        top: 4px;
        left: 4px;
        background: #fff;
        transition: 0.4s;
      }
    }
    .toggle.active {
      background: $blue;
      .slider {
        transform: translateX(28px);
      }
    }
  }
  .avatar-container {
    display: grid;
    border: 1px solid #999;
    border-radius: 18px;
    padding: 24px;
    align-items: center;
    justify-content: start;
    grid-gap: 24px;
    grid-template-columns: repeat(2, auto);
    input {
      display: none;
    }
    .button {
      background: $blue;
      color: #fff;
      padding: 6px 18px;
      border-radius: 6px;
      cursor: pointer;
    }
  }
  .submit-container {
    button {
      width: 100%;
    }
  }
}
</style>
