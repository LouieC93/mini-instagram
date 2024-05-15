<template>
  <img :src="src" alt="avatar" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import defaultAvatar from '../assets/avatarDefault.svg'

const props = withDefaults(
  defineProps<{
    src?: string
    size?: number
  }>(),
  {
    src: defaultAvatar,
    size: 40
  }
)
const avatarSize = computed(() => String(props.size) + 'px')
</script>
<style lang="scss" scoped>
img {
  width: v-bind(avatarSize);
  height: v-bind(avatarSize);
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  cursor: pointer
}
</style>
