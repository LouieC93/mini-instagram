<template>
  <svg>
    <use :href="`${sprite}#icon-${iconId}`"></use>
  </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import sprite from '../assets/icons/sprite.svg'

const props = withDefaults(
  defineProps<{
    iconId: string
    size?: number
  }>(),
  {
    iconId: '',
    size: 36
  }
)
const iconSize = computed(() => String(props.size) + 'px')
</script>

<style lang="scss">
svg {
  width: v-bind(iconSize);
  height: v-bind(iconSize)
}
</style>
