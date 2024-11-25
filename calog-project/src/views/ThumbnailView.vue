<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onMounted } from 'vue';
const router = useRouter();
const isTextVisible = ref(false); // 텍스트 보임 여부를 제어

const goToCalendarPage = () => {
  router.push("/calendar"); // '/join' 경로로 이동
};

onMounted(() => {
  setTimeout(() => {
    isTextVisible.value = true; // 2초 뒤 텍스트 보이기
  }, 1000);
});
</script>

<template>

  <div class="thumbnail-container" @click="goToCalendarPage">
    <img src="../assets/logo.png" alt="calog logo" class="logo" />
    <p :class="['description', { 'visible': isTextVisible }]"> 대회의 시작과 끝, 모든 기록을 한 눈에</p>
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
  width: 320px;
  height: auto;
  margin-bottom: 4rem;
  animation: bounce 2s 2; /* 4초 동안 한 번만 실행 */
}

.description {
  font-size: 2.5rem;
  color: rgba(173, 181, 189, 0.3); /* 초기 희미한 색상 */
  text-align: center;
  margin-top: 1rem;
  opacity: 0; /* 초기 투명도 */
  transition: opacity 1.5s ease, color 1.5s ease; /* 밝아지는 효과와 함께 */
}

.description.visible {
  opacity: 1; /* 텍스트가 보이는 상태 */
  color: rgba(173, 181, 189, 1); /* 완전히 밝아진 색상 */
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-60px);
  }
  60% {
    transform: translateY(-30px);
  }
  90% {
    transform: translateY(-10px); /* 마지막 튀는 크기를 줄임 */
  }
}
</style>
