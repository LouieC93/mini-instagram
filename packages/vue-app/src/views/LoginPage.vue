<template>
  <main>
    <img src="../assets/cover.jpeg" alt="cover" class="cover" />
    <form class="form-container" @submit.prevent="handleSubmit">
      <div class="title">
        <img src="../assets/logo.png" alt="" />
        <h1>Mini Instagram</h1>
      </div>
      <input type="email" placeholder="Email" v-model="email" />
      <input type="text" placeholder="Username" v-if="isNewUser" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit">Submit</button>
      <p v-if="isNewUser">
        Have an account?
        <router-link :to="{}" @click="isNewUser = !isNewUser">Login</router-link>
      </p>
      <p v-else>
        Don't have an account?
        <router-link :to="{}" @click="isNewUser = !isNewUser">Sign up</router-link>
      </p>
      <div class="policy-container" v-if="isNewUser">
        <input type="checkbox" id="policy" v-model="isPolicyChecked" />
        <label for="policy">
          By signing up, you agree to our Terms , Privacy Policy and Cookies Policy
        </label>
      </div>
    </form>
  </main>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const username = ref('')
const password = ref('')
const isPolicyChecked = ref(false)

const isNewUser = ref(true)

const userStore = useUserStore()
const router = useRouter()

async function register() {
  if ([email.value, username.value, password.value].includes('')) {
    alert('Please complete the form')
    return
  }
  if (!isPolicyChecked.value) {
    alert('Please agree the policy.')
    return
  } else {
    await userStore.registerUser({
      email: email.value,
      username: username.value,
      password: password.value
    })
    router.replace({ name: 'home' })
  }
}

async function login() {
  if ([email.value, password.value].includes('')) {
    alert('Please complete the form')
    return
  } else {
    await userStore.loginUser({ email: email.value, password: password.value })
    router.replace({ name: 'home' })
  }
}

function handleSubmit() {
  isNewUser.value ? register() : login()
}
</script>
<style lang="scss" scoped>
main {
  height: 100%;
  min-height: 900px;
  background: #f8f9fb;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: max(36px, 6dvw);
  align-items: center;
  > * {
    height: 70%;
    min-width: 450px;
  }
  .cover {
    grid-column: 2 / 4;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .form-container {
    grid-column: 4 / 6;
    background: #fff;
    padding: 60px 36px;
    box-shadow: 0 4px 12px #eeee;
    display: grid;
    grid-auto-rows: auto;
    border-radius: 28px;
    align-content: center;
    justify-items: center;
    > input {
      width: 100%;
      margin-bottom: 36px;
      background: #eee;
      border-radius: 6px;
      height: 48px;
    }
    > button {
      width: 100%;
      margin-bottom: 24px;
      background: $blue;
      font-size: 18px;
      color: #fff;
      border-radius: 12px;
      padding: 12px 36px;
    }
    > p {
      display: grid;
      grid-template-columns: repeat(2, auto);
      grid-gap: 6px;
      margin-bottom: 24px;
      > a {
        color: $blue;
      }
    }
    .title {
      width: 100%;
      padding-right: 2px;
      margin-bottom: 48px;
      display: grid;
      grid-template-columns: repeat(2, auto);
      justify-content: center;
      align-items: center;
      grid-gap: 18px;
      img {
        width: 48px;
      }
    }
    .policy-container {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 12px;
      align-items: center;
      input {
        width: 16px;
        height: 16px;
        border-radius: 6px;
      }
    }
  }
}
</style>
