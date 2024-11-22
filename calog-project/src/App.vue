<template>
  <div>
    <Header />
    <!-- <EventPopupRegist/> -->
    <RouterView />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
nav {
  padding-top: 20px;
  padding-bottom: 50px;
}

body {
  font-family: 'Jua', sans-serif;
}
</style>
