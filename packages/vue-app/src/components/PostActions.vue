<template>
  <div class="post-actions">
    <BaseIcon
      :iconId="'heart'"
      :size="size"
      :fill="likeByMe ? '#f95738' : 'none'"
      :stroke="likeByMe ? '#fff7' : '#333'"
      @click="emit('like')"
    />
    <p class="amount">{{ formattedLikes }}</p>
    <BaseIcon
      :iconId="'comment'"
      :size="size"
      :fill="'none'"
      :stroke="'#333'"
      @click="emit('comment')"
    />
    <p class="amount">{{ formattedComments }}</p>
    <BaseIcon
      :iconId="'collect'"
      :size="size"
      :fill="saveByMe ? '#f4d35e' : 'none'"
      :stroke="saveByMe ? '#fff7' : '#333'"
      @click="emit('save')"
    />
    <p class="amount">{{ formattedSaves }}</p>
  </div>
</template>

<script lang="ts" setup>
import BaseIcon from '@/components/BaseIcon.vue'
import { getShortAmount } from '@/utils/number'
import { computed, toRef } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: number
    likes: number
    comments: number
    saves: number
    likeByMe: boolean
    saveByMe: boolean
  }>(),
  { size: 28, likes: 0, comments: 0, saves: 0, likeByMe: false, saveByMe: false }
)
const size = toRef(props, 'size')

const emit = defineEmits(['like', 'save', 'comment'])

const formattedLikes = computed(() => getShortAmount(props.likes))
const formattedComments = computed(() => getShortAmount(props.comments))
const formattedSaves = computed(() => getShortAmount(props.saves))
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
  > p {
    text-align: center;
  }
  > svg {
    cursor: pointer;
  }
}
@media (max-width: 640px) {
  .post-actions {
    grid-gap: 0px 2px;
    >svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
