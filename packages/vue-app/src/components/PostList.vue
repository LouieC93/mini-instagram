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
@media (max-width: 1024px) {
  .post-list {
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 28px;
  }
}
@media (max-width: 640px) {
  .post-list {
    grid-gap: 18px;
  }
}
</style>
