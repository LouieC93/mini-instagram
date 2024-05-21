<template>
  <div class="post-actions">
    <BaseIcon :iconId="'heart'" :size="size" :fill="'none'" :stroke="'#000'" />
    <p class="amount">{{ getShortAmount(111239433) }}</p>
    <BaseIcon :iconId="'comment'" :size="size" :fill="'none'" :stroke="'#000'" />
    <p class="amount">113</p>
    <BaseIcon :iconId="'collect'" :size="size" :fill="'none'" :stroke="'#000'" />
    <p class="amount">113</p>
  </div>
</template>

<script lang="ts" setup>
import BaseIcon from '@/components/BaseIcon.vue'
import { getShortAmount } from '@/utils/number'
import { toRef } from 'vue'

const props = withDefaults(defineProps<{ size?: number }>(), { size: 28 })
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
