<template>
  <main>
    <h1>Edit profile</h1>
    <section class="avatar-container">
      <BaseAvatar :size="72" />
      <label class="button" for="upload">
        <span>Change photo</span>
      </label>
      <input type="file" id="upload" accept="'image/*'" />
    </section>
    <section>
      <h2>Account ID</h2>
      <input type="text" name="" id="" />
    </section>
    <section>
      <h2>Nickname</h2>
      <input type="text" name="" id="" />
    </section>
    <section>
      <h2>Introduction</h2>
      <textarea name="" id=""></textarea>
    </section>
    <section>
      <h2>Notification</h2>
      <label class="toggle" :class="{ active }" for="notification" @click="active = !active"
        ><span class="slider"></span>
      </label>
      <input type="checkbox" name="" id="notification" />
    </section>
    <section class="submit-container">
      <button type="button">Submit</button>
    </section>
  </main>
</template>
<script lang="ts" setup>
import BaseAvatar from '@/components/BaseAvatar.vue'
import { ref } from 'vue'
const active = ref(false)
</script>

<style lang="scss" scoped>
main {
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
    button[type='button'] {
      background: $blue;
      font-size: 18px;
      color: #fff;
      border-radius: 12px;
      padding: 12px 36px;
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
