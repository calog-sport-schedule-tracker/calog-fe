<template>
  <div class="card-header">
    <div class="detail-event-name">
      <h1>{{ eventName }}</h1>
    </div>
    <div class="detail-function">
        <button @click="$router.back()" class="material-symbols-outlined">arrow_back</button>
        <button @click="updateParticipation" class="material-symbols-outlined">edit</button>
        <button @click="deleteParticipation" class="material-symbols-outlined">delete</button>
      </div>
  </div>
  
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
defineProps({
  eventName: String, // 부모로부터 전달받을 eventName prop
});

const route = useRoute();
const router = useRouter();
const id = route.params.id; // URL의 :id를 통해 가져옴


// 삭제 이벤트 처리
const deleteParticipation = () => {
  if (confirm('정말로 삭제하시겠습니까?')) {
    axios.delete(`http://localhost:8080/api/user/1/participation/${id}`)
      .then(() => {
        alert('이벤트가 삭제되었습니다.');
        router.push({name: 'list'}); // 삭제 후 리스트 페이지로 이동
      })
      .catch(error => {
        console.error('오류 발생: ' , error);
        alert('삭제 중 오류가 발생했습니다.');
      });
  }
};
</script>

<style scoped>
/* 이벤트 팝업창의 헤더 제목 */
.card-header {
  background-color: #00A1F1;
  color: white;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
}

/* 돌아가기 버튼 */
button {
  padding: 10px 20px;
  background-color: #00A1F1; /* 밝은 회색 */
  color: white; /* 짙은 회색 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


.detail-function {
  display: flex;
}
</style>
