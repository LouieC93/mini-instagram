<template>
  <BaseModal @close="postStore.closeUploadModal">
    <div class="post-upload">
      <div class="upload-container">
        <img v-if="imgUrl" :src="imgUrl" alt="upload-img-preview" class="preview" />
        <label v-else class="upload" for="upload"
          ><BaseIcon :icon-id="'image-upload'" :fill="'none'" :stroke="'#333'" :size="250" />
          <h1>Choose file to upload</h1>
        </label>
        <input type="file" id="upload" accept="image/*" @change="handleUpload" />
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
import { usePostStore } from '@/stores/post'
import { ref } from 'vue'

const postStore = usePostStore()
const desc = ref('')
const imgUrl = ref('')

function handleUpload(e: Event) {
  const imgFile = (e.target as HTMLInputElement).files?.[0]
  if (imgFile) {
    imgUrl.value = URL.createObjectURL(imgFile)
  }
}
</script>
<style lang="scss">
.post-upload {
  width: 60dvw;
  display: grid;
  grid-template-rows: 3fr 2fr auto;
  height: 100%;
  overflow: hidden;
  .upload-container {
    overflow: hidden;
    > label {
      cursor: pointer;
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
        color: #333;
      }
    }
    > input {
      display: none;
    }
    .preview {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
  .desc-container {
    display: grid;
    grid-template-rows: 1fr auto;
    > textarea {
      padding: 24px;
      border: none;
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
