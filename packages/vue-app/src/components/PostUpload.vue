<template>
  <BaseModal>
    <div class="post-upload">
      <div class="upload-container">
        <label class="upload" for="upload"
          ><BaseIcon :icon-id="'image-upload'" :fill="'none'" :stroke="'#000'" :size="250" />
          <h1>Choose file to upload</h1>
        </label>
        <input type="file" id="upload" accept="image/*" />
      </div>
      <div class="desc-container">
        <textarea placeholder="Write a description..." v-model="desc"></textarea>
      </div>
      <button type="button">Post</button>
    </div>
  </BaseModal>
</template>
<script lang="ts" setup>
import BaseIcon from '@/components/BaseIcon.vue'
import BaseModal from '@/components/BaseModal.vue'
import { ref } from 'vue'

const desc = ref('')
</script>
<style lang="scss">
.post-upload {
  width: 60dvw;
  display: grid;
  grid-template-rows: 3fr 2fr auto;
  height: 100%;
  overflow: hidden;
  .upload-container {
    > label {
      height: 100%;
      display: grid;
      grid-template-rows: 3fr 1fr;
      grid-gap: 24px;
      justify-content: center;
      border-bottom: 1px solid #bbb;
      align-items: center;
      > svg {
        width: 100%;
        align-self: end;
      }
      > h1 {
        font-size: 36px;
        align-self: start;
      }
    }
    > input {
      display: none;
    }
  }
  .desc-container {
    display: grid;
    grid-template-rows: 1fr auto;
    > textarea {
      padding: 24px;
      border: none;
      resize: none;
      background: #6663;
      font-size: 18px;
    }
  }
  > button {
    padding: 24px 0;
    color: $blue;
    font-size: 24px;
  }
}
</style>
