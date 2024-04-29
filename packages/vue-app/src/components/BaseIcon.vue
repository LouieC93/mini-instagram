<template>
  <p>icon-{{ iconId }}</p>
  <svg>
    <use :href="`${sprite}#icon-${iconId}`"></use>
  </svg>
</template>
<script setup lang="ts">
import sprite from '../assets/icons/sprite.svg'

withDefaults(
  defineProps<{
    iconId: string
  }>(),
  {
    iconId: ''
  }
)
</script>
