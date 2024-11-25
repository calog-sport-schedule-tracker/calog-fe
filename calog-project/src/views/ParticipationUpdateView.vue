<script setup>
import CardUpdateBody from "@/components/CardUpdateBody.vue";
import CardUpdateHeader from "@/components/CardUpdateHeader.vue";
import Header from "@/components/Header.vue";

</script>

<template>
      <Header />
  <!-- 참가 대회 등록 뷰 -->
  <div class="card-update-container">
    <CardUpdateBody />
  </div>
</template>

<style scoped>
.card-update-container {
  /* 페이지 외부 여백 추가 */
  margin: 50px auto;  /* 원하는 바깥 여백 크기로 조정 */
  padding: 0; /* 내부 여백 추가 */
  box-sizing: border-box; /* 패딩 포함한 박스 크기 계산 */
  background-color: #f9f9f9; /* 선택 사항: 배경색 추가 */
  border-radius: 10px; /* 선택 사항: 모서리 둥글게 */
  border: 1px solid #ddd; /* 선택 사항: 외곽선 추가 */
  width: 75%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 부드러운 그림자 효과 */
}

</style>
