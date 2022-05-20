<template>
  <div class="app">
       <!-- @contextmenu.prevent> -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
console.log(process.env, 'process.env')
console.log(process.env.VUE_APP_API_URL)
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
