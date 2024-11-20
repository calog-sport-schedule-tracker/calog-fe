<template>
  <div>
    <Header />
    <!-- <EventPopupRegist/> -->
    <nav>
      <RouterLink to="/calendar">CalendarView</RouterLink> |
      <RouterLink to="/list">참가 대회 목록 페이지</RouterLink> |
      <RouterLink to="/detail">상세 대회 정보</RouterLink> |
      <RouterLink to="/login">로그인</RouterLink> |
      <RouterLink to="/join">회원가입</RouterLink> |
      <RouterLink to="/thumbnail">썸네일</RouterLink> |
      
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
