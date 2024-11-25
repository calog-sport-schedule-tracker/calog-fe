<script setup>
import CardRegistBody from "@/components/CardRegistBody.vue";
import CardRegistHeader from "@/components/CardRegistHeader.vue";

</script>

<template>
  <!-- 참가 대회 등록 뷰 -->
  <div class="event-regist-container">
    <CardRegistHeader />
    <CardRegistBody />
  </div>
</template>

<style scoped>
/* 페이지 외부 여백 추가 */
/* .event-regist-container {
  margin: 20px; 
  padding: 0; 
  box-sizing: border-box; 
  background-color: #f9f9f9; 
  border-radius: 10px; 
  border: 1px solid #ddd; 
} */
</style>
