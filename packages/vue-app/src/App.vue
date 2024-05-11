<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div id="content">
    <header id="header">
      <NavBar />
    </header>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
#content {
  height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr;
  #header {
    box-shadow: 0 4px 12px #eeee;
  }
  main {
    overflow: auto;
    padding: 48px 0;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
}
</style>
