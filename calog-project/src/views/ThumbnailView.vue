<script setup>
</script>

<template>
  <div class="thumbnail-container">
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
  background-color: #f9f9f9;
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
