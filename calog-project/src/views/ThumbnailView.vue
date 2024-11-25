<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLoginPage = () => {
  router.push("/login"); // '/join' 경로로 이동
};
</script>

<template>

  <div class="thumbnail-container" @click="goToLoginPage">
    <img src="../assets/logo.png" alt="calog logo" class="logo" />
    <p class="description">대회의 시작과 끝, 모든 기록을 한 눈에</p>
  </div>
</template>

<style scoped>
.thumbnail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  font-family: 'Arial', sans-serif;
}

.logo {
  width: 200px;
  height: auto;
  margin-bottom: 2rem;
}

.description {
  font-size: 1.6rem;
  color: #CECECE;
  text-align: center;
  margin-top: 1rem;
}
</style>
