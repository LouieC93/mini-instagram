<template>
  <div class="post-list">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
.post-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 36px;
}
</style>
