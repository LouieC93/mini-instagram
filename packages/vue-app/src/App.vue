<template>
  <div id="content" v-if="!isLoginPage">
    <header id="header">
      <NavBar />
    </header>
    <RouterView />
  </div>
  <div id="content" class="full-page" v-else>
    <RouterView />
  </div>
</template>
<script lang="ts" setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue';
const route = useRoute()
const isLoginPage = computed(() => route.name === 'login')
</script>

<style lang="scss" scoped>
#content {
  height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr;
  #header {
    box-shadow: 0 4px 12px #eeee;
  }
  &.full-page {
    grid-template-rows: 1fr
  }
}
</style>
