<template>
  <Teleport to="body">
    <div class="modal">
      <div class="backdrop"></div>
      <div class="content">
        <slot></slot>
        <BaseIcon :iconId="'cross'" v-if="props.isShowClose" @click="$emit('close')" />
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
import { toRef } from 'vue'
import BaseIcon from './BaseIcon.vue'

const props = withDefaults(defineProps<{ isShowClose: boolean; height?: string }>(), {
  isShowClose: true,
  height: '60%'
})
const modalHeight = toRef(props.height)
defineEmits(['close'])
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  .backdrop {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #3339;
  }
  .content {
    position: relative;
    grid-column: 2 / 6;
    border-radius: 36px;
    height: v-bind(modalHeight);
    z-index: 1;
    margin: 24px;
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 4px 30px #6666;
    backdrop-filter: blur(24px);
    overflow: hidden;
    > svg {
      position: absolute;
      right: 24px;
      top: 24px;
      cursor: pointer;
    }
  }
}
</style>
