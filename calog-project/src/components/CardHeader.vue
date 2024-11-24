<template>
  <div class="card-header">
    <h1>{{ eventName }}</h1>
  </div>
</template>

<script setup>
defineProps({
  eventName: String, // 부모로부터 전달받을 eventName prop
});
</script>

<style scoped>
/* 이벤트 팝업창의 헤더 제목 */
.card-header>h1 {
  background-color: #3094CA;
  color: white;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0;
}
</style>
