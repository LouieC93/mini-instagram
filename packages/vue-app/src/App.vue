<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header id="header">
    <NavBar />
  </header>

  <RouterView />
</template>

<style scoped>
#header {
  box-shadow: 0 4px 12px #eeee;
}
</style>
