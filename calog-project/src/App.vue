<template>
  <div>
    <Header />
    <!-- <EventPopupRegist/> -->
    <nav>
      <RouterLink to="/calendar">CalendarView</RouterLink> |
      <RouterLink to="/list">참가 대회 목록 페이지</RouterLink> |
      <RouterLink to="/detail">상세 대회 정보</RouterLink>
    </nav>

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
</style>
