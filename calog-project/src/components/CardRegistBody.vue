<script setup>
import { useEventStore } from '@/stores/event';
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
// Vue Select 컴포넌트 전역 등록

const vSelect = window.VueSelect.VueSelect; // 추가적으로 꾸밀 때 쓸 예정

const eStore = useEventStore();
const selectedEvent = ref("");
const eventDate = ref("");
const categories = ref([]);
const selectedCategory = ref("");
const completionTime = ref({hour: 0, minute: 0, second: 0});
const memo = ref("");

const sport = ref(""); // 선택된 대회의 sport(마라톤, 배드민턴 등)

// 한국어 종목명과 영어 이미지 파일명 매핑
const sportToImageMap = {
  "마라톤": "marathon.jpg",
  "그랑폰도": "granfondo.jpg",
  "철인3종": "triathlon.jpg",
  "테니스": "tennis.jpg",
  "배드민턴": "badminton.jpg",
};

// 기본 이미지 경로
const defaultImage = "/src/assets/sport-image/default.jpg";

// 이미지 경로 계산
const selectedImage = computed(() => {
  return sport.value && sportToImageMap[sport.value] ? `/src/assets/sport-image/${sportToImageMap[sport.value]}` : defaultImage;
});

// API 호출: eventId로 sport 가져오기
const fetchEventSport = () => {
  // 디버깅
  console.log("fetch ⬆️ ");
  if (!selectedEvent.value) {
    // 디버깅
    console.log("slectedEventId.value : false");
    return;
  }
  axios
    .get(`http://localhost:8080/api/event/${selectedEvent.value}`)
    .then((response) => {
      const data = response.data;
      console.log("데이터: ", response.data);
      sport.value = data.sport; // 한국어 sport 값 설정
    })
    .catch((error) => {
      console.error("Failed to fetch event Sport:", error);
      sport.value = ""; // 초기화
    });
};

// 대회명이 선택되었을 때 호출될 메서드
const fetchEventDate = () => {
  if (!selectedEvent.value) return; // 선택되지 않았을 경우 중단
  axios.get(`http://localhost:8080/api/event/${selectedEvent.value}`)
    .then((response) => {
      console.log("선택값" + selectedEvent);
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
  if (!selectedEvent.value) return;
  axios.get(`http://localhost:8080/api/detail/${selectedEvent.value}`)
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
watch(selectedEvent, ()=>{
  fetchEventSport();
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
  participation.value.eventId = selectedEvent.value;
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
      <img :src="selectedImage" alt="Selected Sport Image" />
    </div>

    <!-- 오른쪽에 위치할 정보 -->
    <fieldset class="card-body-right">
      <!-- 대회명 -->
      <div class="regist-list">
        <label for="select-event">대회:</label>
        <select id="select-event" v-model="selectedEvent">
          <option v-for="e in eStore.eventList" :key="e.id" :value="e.id">{{ e.eventName }}</option>
        </select>
      </div>
      <!-- 일정 -->
      <!-- http://localhost:8080/api/event/{eventId}로 get 요청 보내서 eventDate 받아와서 보여줌-->
      <div class="regist-list">
        <span>일정: </span>  
        <span>{{eventDate}}</span>
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
      <!-- 시는 0~23
        분, 초는 0~59 사이에서 선택할 수 있도록 selectbox -->
      <div class="regist-list" id="regist-completionTime">
        <span>기록: </span>
        <div class="completionTime">
          <select v-model="completionTime.hour">
            <option v-for="h in 24" :key="h" :value="h-1">{{ h-1 }}</option>
          </select> 시
        </div>
        <div class="completionTime">
          <select v-model="completionTime.minute">
            <option v-for="m in 60" :key="m" :value="m-1">{{ m-1 }}</option>
          </select> 분
          </div>

        <div class="completionTime">
          <select v-model="completionTime.second">
            <option v-for="s in 60" :key="s" :value="s-1">{{ s-1 }}</option>
          </select> 초
        </div>
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

.card-body-left {
  flex: 1;
}
.card-body-right {
  /* 남는 공간을 동일하게 나눔 50:50 */
  flex: 1.3; 
}

.regist-list {
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; /* 아이템 간 균등 배치 */
  /* flex-wrap: wrap; */
  padding: 6px 0; /* 상하 간격 늘림 */
}

.regist-list label,
.regist-list span {
  flex: 0 0 120px; /* 고정된 너비를 적용 */
  white-space: nowrap;
  text-align: left;
  font-weight: bold;
  margin-right: 10px;
}

#select-event,
#category-select {
  flex: 1; /* 남은 공간을 차지 */
  min-width: 150px; /* 최소 너비 설정 */
  max-width: 100%; /* 상위 컨테이너 너비에 맞게 제한 */
  padding: 8px; /* 내부 여백 추가 */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}


/* 시간, 분, 초 select 박스 스타일 */
#regist-completionTime select {
  width: 50px; /* 선택 박스 최소 너비 */
  padding: 4px; /* 내부 여백 */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* 기록 텍스트(시, 분, 초) 스타일 */
#regist-completionTime span {
  margin: 0 2x; /* 텍스트와 select 박스 사이 간격 */
  font-weight: normal;
  flex-wrap: wrap; /* 자식 요소가 부모 너비 초과 시 줄바꿈 */
}


/* 글자들 한 줄로 나오게 */
.regist-list span {
  min-width: 20px;
}

/* 등록 버튼 위치 조정 */
.card-body-right {
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  align-items: flex-start;
  justify-content: space-between; /* 상하 배치 간격 조정 */
  height: 100%; /* 이미지와 동일한 높이를 맞추기 위해 설정 */
}

select {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

button {
  margin-top: 15px;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #3094CA;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0056b3;
}


fieldset {
  border: none; /* 테두리 제거 */
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

/* 메모 크기 조정 */
#memo {
  width: 500px;
  height: 100px;
  padding: 10px; /* 내부 여백 추가 */
  font-size: 14px; /* 글자 크기 조정 */
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; /* 사용자가 크기를 조정하지 못하도록 설정 */
  box-sizing: border-box;
}

.completionTime {
  display: flex;
  /* justify-content: center; */
  align-items:first baseline;
  padding-right: 10px;
}

.completionTime select {
  margin-right: 10px;
}

</style>