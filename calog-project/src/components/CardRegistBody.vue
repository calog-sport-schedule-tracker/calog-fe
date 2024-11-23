<script setup>
import { useEventStore } from '@/stores/event';
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

const eStore = useEventStore();
const selectedSport = ref("");
const eventDate = ref("");
const categories = ref([]);
const selectedCategory = ref("");
const completionTime = ref({
  hour: 0,
  minute: 0,
  second: 0
});
const memo = ref("");

// 대회명이 선택되었을 때 호출될 메서드
const fetchEventDate = () => {
  if (!selectedSport.value) return; // 선택되지 않았을 경우 중단
  axios.get(`http://localhost:8080/api/event/${selectedSport.value}`)
    .then((response) => {
      console.log("선택값" + selectedSport);
      console.log(response.data);
      eventDate.value = formatDate(response.data.eventDate); // API 응답에서 eventDate 저장
    })
    .catch((error) => {
      console.error('Failed to fetch event date:', error);
      eventDate.value = "조회 실패"; // 오류 처리
    });

};
  // 대회 종목 가져오는 함수
  const fetchCategories = () => {
  if (!selectedSport.value) return;
  axios.get(`http://localhost:8080/api/detail/${selectedSport.value}`)
    .then((response) => {
      console.log("된다!")
      console.log(response.data);
      categories.value = response.data; // categories 데이터 설정
      // console.log(categories.value);
    })
    .catch((error) => {
      console.error('Failed to fetch categories:', error);
      categories.value = []; // 오류 처리
    });
  };

const formatDate = (isoDate) => {
  if (!isoDate) return ""; // 빈 값 처리
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  // 요일 추출
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getDay()]; // getDay()는 0~6 반환

  return `${year}-${month}-${day} (${dayOfWeek})`;
};

// 대회 목록 가져오기
onMounted(() => {
  eStore.getEventList();
});

// 대회 선택 시 API 호출
watch(selectedSport, ()=>{
  fetchEventDate();
  fetchCategories();
});

// 대회 등록하기
import { useParticipationStore } from '@/stores/participation';
// ref는 이미 import 되어있음
const pStore = useParticipationStore();
const participation = ref({
  // 등록할 변수들 빈 상태로 선언
  userId: '',
  eventId: '',
  detail: '',
  memo: '',
  completionTime: '',
})

// 시간으로 변환하기 위함
const padZero = (num) => String(num).padStart(2, '0'); // 두 자리로 변환

const registEvent = function() {
  participation.value.userId = 1;
  participation.value.eventId = selectedSport.value;
  participation.value.detail = categories.value.find(c => c.id === selectedCategory.value)?.category || '';
  participation.value.memo = memo.value;
  participation.value.completionTime = `${padZero(completionTime.value.hour)}:${padZero(completionTime.value.minute)}:${padZero(completionTime.value.second)}`;
  console.log("전송할 데이터: ", participation.value);
  
  pStore.registParticipation(participation.value);
}


</script>

<template>
  <!-- 이벤트 팝업창의 body -->
  <div class="card-body">
    <!-- 왼쪽에 위치할 이미지 사진 -->
    <div class="card-body-left">
      <img src="@/assets/sport-image/granfondo.jpg" alt="granfondo">
    </div>

    <!-- 오른쪽에 위치할 정보 -->
    <fieldset class="card-body-right">
      <!-- 대회명 -->
      <div class="regist-list">
        <label for="select-event">대회:</label>
        <select id="sport-select" v-model="selectedSport">
          <option v-for="e in eStore.eventList" :key="e.id" :value="e.id">{{ e.eventName }}</option>
        </select>
      </div>
      <!-- 일정 -->
      <!-- http://localhost:8080/api/event/{eventId}로 get 요청 보내서 eventDate 받아와서 보여줌-->
      <div class="regist-list">
        <span>일정: {{eventDate}}</span>  
      </div>

      <!-- 종목 -->
      <!-- http://localhost:8080//api/detail{eventId}로 get요청을 보내서 category를 v-for로 돌리면서 보여줌 -->
      <div class="regist-list">
        <label for="category-select">종목:</label>
        <select id="category-select" v-model="selectedCategory">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.category }}
          </option>
        </select>
      </div>

      <!-- 기록 -->
      <!-- 
        시는 0~23
        분, 초는 0~59 사이에서 선택할 수 있도록 selectbox
      -->
      <div class="regist-list">
        <span>기록: </span>
        <select v-model="completionTime.hour">
          <option v-for="h in 24" :key="h" :value="h-1">{{ h-1 }}</option>
        </select>
        <span>시 </span>

        <select v-model="completionTime.minute">
          <option v-for="m in 60" :key="m" :value="m-1">{{ m-1 }}</option>
        </select>
        <span>분 </span>

        <select v-model="completionTime.second">
          <option v-for="s in 60" :key="s" :value="s-1">{{ s-1 }}</option>
        </select>
        <span>초 </span>
      </div>
      <!-- 메모 -->
      <!-- text 적을 수 있는 박스  -->
      <div class="regist-list">
        <label for="memo">memo: </label>
        <textarea id="memo" v-model="memo" rows="2"></textarea>
      </div>

      <button @click="registEvent">등록</button>
   </fieldset>
  </div>
</template>
  

  
<style scoped>
/* 이벤트 팝업창의 body */
.card-body {
  display: flex;
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

.regist-list {
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  padding: 3%;  
}


/* 글자들 한 줄로 나오게 */
.regist-list span {
  min-width: 20px;
}



.card-body-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

select, textarea, button {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.detail-content {
  display: flex;
  align-items: center;
}

.detail-content label {
  display: flex;
  width: 100%;
}

.detail-content select {
  width: 100px;
}

.regist-sport {
  display: flex;
}



</style>
  