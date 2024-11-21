<template>
  <div class="records">
    <div v-for="record in records" :key="record.id" class="record">
      <div>{{ record.date }}</div>
      <div>{{ record.detail }}</div>
      <div>{{ record.type }}</div>
      <div>{{ record.time }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const records = ref([
  {
    id: 1,
    date: "2024/11/19",
    detail: "섬섬여수 그랑폰도",
    type: "그랑폰도",
    time: "04:45:02",
  },
  {
    id: 1,
    date: "2024/11/03",
    detail: "JTBC 마라톤",
    type: "그랑폰도",
    time: "04:45:02",
  },
  {
    id: 1,
    date: "2024/11/03",
    detail: "JTBC 마라톤",
    type: "그랑폰도",
    time: "04:45:02",
  },
  {
    id: 1,
    date: "2024/11/03",
    detail: "JTBC 마라톤",
    type: "그랑폰도",
    time: "04:45:02",
  },
  {
    id: 1,
    date: "2024/11/03",
    detail: "JTBC 마라톤",
    type: "그랑폰도",
    time: "04:45:02",
  },
  {
    id: 1,
    date: "2024/11/17",
    detail: "손기정마라톤",
    type: "그랑폰도",
    time: "01:08:21",
  },

  // 추가 기록들
]);
</script>

<style>
.records .record {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px; /* 둥근 모서리 */
  background-color: #fff; /* 배경색 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}
</style>
