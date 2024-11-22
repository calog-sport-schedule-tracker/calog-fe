<script setup>
import ProfileCard from "@/components/ProfileCard.vue";
import Participation from "@/components/Participation.vue";
import { useRouter } from 'vue-router';

const router = useRouter();

function goToEventRegist() {
  router.push({ name: 'eventRegist' }); // 'EventRegist': 라우트의 name
}
</script>

<template>
  <div class="participation-list-view">
    <button class="registBtn" @click="goToEventRegist" >기록하기</button>
    <div class="participation-list-content">
      <ProfileCard class="profile-section" />
      <Participation class="list-section" />
    </div>
  </div>
</template>

<style>
.participation-list-view {
  display: flex;
  flex-direction: column;
}

/* 기록하기 버튼 오른쪽으로  */
.registBtn {
  align-self: flex-end; /* 오른쪽 정렬 */
  margin-top: 20px;
  margin-right: 20px; /* 버튼이 리스트 끝과 간격 유지 */
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.participation-list-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.profile-section {
  flex: 1;
  margin-right: 20px; 
}

.list-section {
  flex: 3;
}

.registBtn {
  align-self: flex-end; /* 부모 요소 내에서 오른쪽 끝으로 정렬 */
  margin-bottom: 10px; /* 버튼과 리스트 사이 간격 추가 */
  padding: 10px 20px; /* 버튼 크기 조정 */
  background-color: #3094CA; /* 버튼 색상 */
  color: #fff; /* 버튼 텍스트 색상 */
  border: none;
  border-radius: 4px; /* 둥근 모서리 */
  cursor: pointer;
  /* font-family: 'Jua'; */
  font-size: 14px;
}

.registBtn button:hover {
  background-color: #0056b3;
}


</style>
