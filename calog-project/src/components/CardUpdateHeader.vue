<template>
  <div class="card-header">
    <div class="detail-event-name">
      <h1>[수정] {{ eventName }} </h1>
    </div>
    <div class="detail-function">
        <button @click="$router.back()" class="material-symbols-outlined">arrow_back</button>
      </div>
  </div>
  
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
defineProps({
  eventName: String, // 부모로부터 전달받을 eventName prop
});

const route = useRoute();
const router = useRouter();
const id = route.params.id; // URL의 :id를 통해 가져옴

</script>

<style scoped>
/* 이벤트 팝업창의 헤더 제목 */
.card-header {
  background-color: #3094CA;
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
  background-color: #3094CA;
  color: white; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  transform: scale(1.02); /* 살짝 확대 */
}

/* active 시 */
button:active {
  transform: scale(0.98); /* 클릭 시 살짝 축소 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); /* 그림자 더 작게 */
}

.detail-function {
  display: flex;
}

.detail-event-name {
  display: flex; /* Flexbox 활성화 */
  align-items: center; /* 세로 가운데 정렬 */
  padding-left: 20px;
}

.detail-event-name h1{
  font-size: 1.5rem;
  font-weight: 600; /* 굵은 글자 */
  font-family: 'Poppins', sans-serif;
  text-align: center; /* 중앙 정렬 */
  text-transform: capitalize; /* 첫 글자 대문자 */
  margin: 0;
  line-height: 1.4; /* 간격 조정 */
  color: #F2F2F2; /* 밝은 색상 */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 부드러운 그림자 */

}
</style>
