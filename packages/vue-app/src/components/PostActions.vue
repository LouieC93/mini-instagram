<template>
  <div class="post-actions">
    <BaseIcon :iconId="'heart'" :size="size" :fill="'none'" :stroke="'#000'" />
    <p class="amount">{{ likes }}</p>
    <BaseIcon :iconId="'comment'" :size="size" :fill="'none'" :stroke="'#000'" />
    <p class="amount">{{ comments }}</p>
    <BaseIcon :iconId="'collect'" :size="size" :fill="'none'" :stroke="'#000'" />
    <p class="amount">{{ saves }}</p>
  </div>
</template>

<script lang="ts" setup>
import BaseIcon from '@/components/BaseIcon.vue'
import { toRef } from 'vue'

const props = withDefaults(
  defineProps<{ size?: number; likes: string; comments: string; saves: string }>(),
  { size: 28, likes: '', comments: '', saves: '' }
)
const size = toRef(props, 'size')
</script>
<style lang="scss" scoped>
.post-actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(36px, auto));
  grid-template-rows: repeat(2, auto);
  grid-gap: 0px 12px;
  grid-auto-flow: column;
  justify-items: center;
  align-content: space-around;
  p {
    text-align: center;
  }
}
</style>
