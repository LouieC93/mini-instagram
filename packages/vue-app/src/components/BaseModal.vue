<template>
  <Teleport to="body">
    <div class="modal">
      <div class="backdrop" @click="isBackdropTriggerClose ? $emit('close') : null"></div>
      <div class="content">
        <slot></slot>
        <button type="button" v-if="props.isShowClose" @click="$emit('close')">
          <BaseIcon :iconId="'cross'" />
        </button>
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, toRef } from 'vue'
import BaseIcon from './BaseIcon.vue'

const props = withDefaults(
  defineProps<{ isShowClose?: boolean; height?: string; isBackdropTriggerClose?: boolean }>(),
  {
    isShowClose: true,
    height: '75%',
    isBackdropTriggerClose: true
  }
)

const modalHeight = toRef(props, 'height')

defineEmits(['close'])

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
  .backdrop {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #3335;
  }
  .content {
    position: relative;
    border-radius: 36px;
    height: v-bind(modalHeight);
    min-height: 300px;
    max-height: 90%;
    max-width: 90%;
    z-index: 1;
    margin: 24px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 30px #6666;
    backdrop-filter: blur(28px);
    overflow: hidden;
    > button {
      position: absolute;
      right: 24px;
      top: 18px;
      cursor: pointer;
    }
  }
}
</style>
