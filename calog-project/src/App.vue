<template>
  <div class="page-container">
    <Header />
    <div class="router-view-container">
      <RouterView />
    </div>
  </div>
</template>


<script setup>
import Header from "./components/Header.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
/* nav {
  padding-top: 20px;
  padding-bottom: 50px;
} */
.page-container {
  height: 100vh; /* 전체 화면 높이를 차지 */
  display: flex;
  flex-direction: column; /* 세로 방향 정렬 */
}

.router-view-container {
  /* flex: 1; */
  /* display: flex; */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  background-color: white; 
  padding: 20px; /* 내부 여백 */
  box-sizing: border-box; /* 패딩 포함한 크기 계산 */
}
</style>