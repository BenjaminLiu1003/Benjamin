<template>
  <div class="app">
       <!-- @contextmenu.prevent> -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #020308;
  // background-image: url('./assets/bg.jpg');
  // overflow: scroll;
}
</style>
