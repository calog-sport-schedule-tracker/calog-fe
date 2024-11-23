<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useParticipationStore } from '@/stores/participation';
import CardHeader from './CardHeader.vue';


const route = useRoute();
const router = useRouter();
const id = route.params.id; // URL의 :id를 통해 가져옴
const detail = ref(null); // 이벤트 상세 데이터를 저장

const pStore = useParticipationStore();

// API 호출
onMounted(()=> {
  pStore.getParticipationDetail(id);
  console.log("디테일 정보: ", pStore.getParticipationDetail);
  
})

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

<template>
  <CardHeader :eventName="pStore.participationDetail.eventName"/>
  <div class="card-body">
    <div class="card-body-left">
      <img src="@/assets/sport-image/granfondo.jpg" alt="granfondo">
    </div>

    <div class="card-body-right">
      <div class="detail-info" >
        <p><strong>대회:</strong> {{ pStore.participationDetail.eventName }}</p>
        <p><strong>일정:</strong> {{ pStore.participationDetail.eventDate }}</p>
        <p><strong>종목:</strong> {{ pStore.participationDetail.sport }}</p>
        <p><strong>기록:</strong> {{ pStore.participationDetail.completionTime }}</p>
        <p><strong>메모:</strong> {{ pStore.participationDetail.memo }}</p>
      </div>
      <div class="detail-footer">
        <button @click="$router.back()">돌아가기</button>
        <button @click="deleteParticipation" class="delete-button">삭제하기</button>
      </div>
    </div>
  </div>
</template>

<script>
function formatDate(isoDate) {
  if (!isoDate) return "정보 없음"; // 빈 값 처리
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
</script>

<style scoped>

/* 이벤트 팝업창의 body */
.card-body {
  display: flex;
  align-items: stretch; /* 좌우 영역의 높이를 동일하게 설정 */
  padding: 20px;
  text-align: center;
}

/* 왼쪽에 위치하는 이미지의 크기 */
.card-body img {
  /* 이미지 크기 -> 조금 위아래로 늘어났다가 줄어들었다가 함 */
  width: 70%;
  height: 100%;
  border-radius: 10px;
}

.card-body-left,
.card-body-right {
  /* 남는 공간을 동일하게 나눔 50:50 */
  flex: 1; 
}

.card-body-right {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  justify-content: space-between; /* 위아래 간격을 조정 */
  padding: 10px;
}

.detail-header {
  margin-bottom: 20px;
  text-align: center;
}

.detail-header h2 {
  font-size: 24px;
  font-weight: bold;
}

.detail-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px; /* 요소 간 간격 */

}

.detail-info p {
  margin: 10px 0;
  font-size: 20px;
}

.detail-footer {
  margin-top: 20px;
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* 삭제 버튼 */
.delete-button {
  margin-left: 10px;
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #a71d2a;
}


.loading {
  text-align: center;
  font-size: 18px;
  color: #555;
}
</style>
