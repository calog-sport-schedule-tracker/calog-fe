<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useParticipationStore } from '@/stores/participation';
import axios from 'axios'; // axios 임포트

const router = useRouter();

// 반응형 변수
const selectedCity = ref('');
const selectedSport = ref('');
const selectedDate = ref(''); // 날짜 필터 추가
const selectedOrder = ref(''); // 정렬 (시간순, 최신순)
onMounted(() => {
  const datePicker = document.querySelector('#date-picker');
  flatpickr(datePicker, {
    plugins: [new window.monthSelectPlugin({})], // 월 선택 플러그인 활성화
    dateFormat: 'F Y', // UI 표시 형식 (November 2024)
    onChange: (selectedDates) => {
      // 선택된 날짜를 'YYYY-MM' 형식으로 변환
      const selectedDateObj = selectedDates[0];
      if (selectedDateObj) {
        const year = selectedDateObj.getFullYear();
        const month = String(selectedDateObj.getMonth() + 1).padStart(2, '0');
        selectedDate.value = `${year}-${month}`; // 'YYYY-MM' 형식으로 저장
      } else {
        selectedDate.value = ''; // 선택 취소 시 빈 값
      }
      console.log('선택된 날짜 (YYYY-MM):', selectedDate.value); // 디버깅용
    },
  });
});

// API 요청 함수
// 필터링된 데이터를 Pinia에 전달
// 필터링 시 하나의 데이터만 병합하는 문제 -> Promise.all로 해결
function fetchFilteredEvents() {
  const cityParam = selectedCity.value ? `city=${selectedCity.value}` : '';
  const sportParam = selectedSport.value ? `sport=${selectedSport.value}` : '';
  const dateParam = selectedDate.value ? `eventDate=${selectedDate.value}` : '';
  const orderParam = selectedOrder.value === '최신순' ? '2' : ''; // 최신순일 경우 '2', 시간순은 빈 값

  let url = `/api/user/1/participation`;

  if (orderParam==2) {
    if (cityParam && sportParam && dateParam) {
      url = `/api/user/1/participation/sportDateCity2?${sportParam}&${dateParam}&${cityParam}`;
    } else if (cityParam && sportParam) {
      url = `/api/user/1/participation/sportCity2?${sportParam}&${cityParam}`;
    } else if (cityParam && dateParam) {
      url = `/api/user/1/participation/dateCity2?${dateParam}&${cityParam}`;
    } else if (sportParam && dateParam) {
      url = `/api/user/1/participation/sportDate2?${sportParam}&${dateParam}`;
    } else if (cityParam) {
      url = `/api/user/1/participation/city2?${cityParam}`;
    } else if (sportParam) {
      url = `/api/user/1/participation/sport2?${sportParam}`;
    } else if (dateParam) {
      url = `/api/user/1/participation/date2?${dateParam}`;
    } else {
      url = `/api/user/1/participation2`;
    }
  } else {
    if (cityParam && sportParam && dateParam) {
      url = `/api/user/1/participation/sportDateCity?${sportParam}&${dateParam}&${cityParam}`;
    } else if (cityParam && sportParam) {
      url = `/api/user/1/participation/sportCity?${sportParam}&${cityParam}`;
    } else if (cityParam && dateParam) {
      url = `/api/user/1/participation/dateCity?${dateParam}&${cityParam}`;
    } else if (sportParam && dateParam) {
      url = `/api/user/1/participation/sportDate?${sportParam}&${dateParam}`;
    } else if (cityParam) {
      url = `/api/user/1/participation/city?${cityParam}`;
    } else if (sportParam) {
      url = `/api/user/1/participation/sport?${sportParam}`;
    } else if (dateParam) {
      url = `/api/user/1/participation/date?${dateParam}`;
    } else
      url = `/api/user/1/participation`;
  }


  console.log("orderParam: ", orderParam);
  console.log(url);

  const participationStore = useParticipationStore();

  // 필터링된 데이터 요청
  axios
  .get(url)
  .then((response) => {
    // response.data가 배열인지 확인
    const participationList = Array.isArray(response.data) ? response.data : [];

    if (participationList.length === 0) {
      console.log('조건에 맞는 데이터가 없습니다.');
      participationStore.participationList = []; // 빈 리스트를 스토어에 저장
      return; // 이후 로직을 중단
    }

    console.log('필터링된 데이터 요청 성공:', participationList);

    // 데이터 병합 로직
    participationList.forEach((participation, index) => {
      axios
        .get(`/api/event/${participation.eventId}`)
        .then((eventResponse) => {
          const isoDate = eventResponse.data.eventDate;
          const dateObj = new Date(isoDate);
          const formattedDate = `${dateObj.getFullYear()}-${String(
            dateObj.getMonth() + 1
          ).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

          participationList[index] = {
            ...participation,
            eventName: eventResponse.data.eventName,
            eventDate: formattedDate,
            sport: eventResponse.data.sport,
            city: eventResponse.data.city,
          };

          // 업데이트
          participationStore.participationList = [...participationList];
        })
        .catch((error) => {
          console.error(
            `eventId ${participation.eventId}의 상세 정보 요청 실패:`,
            error
          );
        });
    });
  })
    .catch((error) => {
      console.error('필터링된 데이터 요청 실패:', error);
    });
}

function goToEventRegist() {
  router.push({ name: 'eventRegist' }); // 'EventRegist': 라우트의 name
}
</script>

<template>
    <div class="header-container">
      <!-- 정렬 필터 -->
      <label for="sport-select">정렬:</label>
      <select id="sport-select" v-model="selectedOrder">
        <option value="">시간순</option>
        <option value="최신순">최신순</option>
      </select>
      <!-- 지역 필터 -->
      <label for="city-select">지역:</label>
      <select id="city-select" v-model="selectedCity">
        <option value="">모든 지역</option>
        <option value="서울">서울</option>
        <option value="부산">부산</option>
        <option value="대구">대구</option>
        <option value="인천">인천</option>
        <option value="광주">광주</option>
        <option value="대전">대전</option>
        <option value="울산">울산</option>
        <option value="세종">세종</option>
        <option value="경기">경기</option>
        <option value="강원">강원</option>
        <option value="충청">충청</option>
        <option value="전라">전라</option>
        <option value="경상">경상</option>
        <option value="제주">제주</option>
      </select>

    <!-- 종목 필터 -->
      <label for="sport-select">종목:</label>
      <select id="sport-select" v-model="selectedSport">
        <option value="">모든 종목</option>
        <option value="마라톤">마라톤</option>
        <option value="배드민턴">배드민턴</option>
        <option value="테니스">테니스</option>
        <option value="철인3종">철인3종</option>
        <option value="그랑폰도">그랑폰도</option>
      </select>

      <!-- 날짜 필터 -->
      <label for="date-picker">날짜:</label>
      <input id="date-picker" type="text" placeholder="선택된 날짜" readonly />



      <button class="filterBtn" @click="fetchFilteredEvents">조회</button>
      <button class="registBtn" @click="goToEventRegist" >기록하기</button>
    </div>
</template>



<style scoped>

/* 필터 스타일 */
.header-container {
  display: flex;
  flex-wrap: wrap; /* 좁은 화면에서도 정렬되도록 */
  align-items: center; /* 수직 중앙 정렬 */
  gap: 15px; /* 요소 간 간격 */
  margin-top: 20px;
  margin-bottom: 20px; /* 아래 여백 */
  border-radius: 8px; /* 둥근 모서리 */
  max-width: 100%; /* 부모 요소에 맞게 최대 크기 */
  margin-left: auto;
  margin-right: 0; /* 오른쪽 끝에 맞춤 */
  justify-content: flex-end;
  padding-right: 20px;
}


.header-container label {
  font-weight: bold;
}

.header-container select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}



.header-container button {
  font-size: 14px;
  /* font-family: 'Do Hyeon', 'Jua'; */
  padding: 5px 20px;
  background-color: #3094CA;
  color: snow;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  min-height: 35px; /* 버튼 높이 통일 */
  line-height: normal; /* 텍스트의 세로 정렬 문제 해결 */
  transition: background-color 0.3s, transform 0.2s; /* 부드러운 전환 효과 */

}
/* 호버 효과 */
.header-container button:hover {
  background-color: #2678A3; /* 호버 시 버튼 색상 변경 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 효과 추가 */
  transform: translateY(-2px); /* 약간 위로 이동 */
}

/* 눌렀을 때 효과 */
.header-container button:active {
  background-color: #1D5F83; /* 눌렀을 때 버튼 색상 변경 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 그림자 감소 */
  transform: translateY(1px); /* 약간 아래로 이동 */
}


.header-container select{
  min-height: 30px; /* select 및 버튼의 동일 너비 */
  appearance: none; /* 기본 브라우저 스타일 제거 */
  min-width: 120px; /* 기본 선택 박스 너비 */
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #f7f9fc; /* 밝은 배경색 */
  color: #333; /* 텍스트 색상 */
  font-size: 16px; /* 글꼴 크기 */
  padding: 10px 15px; /* 내부 여백 */
  border: 1px solid #ccc; /* 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
  cursor: pointer; /* 포인터 커서 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 약간의 그림자 */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 5 5-5z' fill='%23333'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center; /* 드롭다운 화살표 위치 */
  background-size: 12px; /* 드롭다운 화살표 크기 */
}

.header-container select:hover {
  border-color: #3094CA; /* 호버 시 테두리 색상 */
  background-color: #e8f4fc; /* 호버 시 배경색 */
}

#date-picker {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f7f9fc;
  font-size: 14px;
  appearance: none;
  min-width: 150px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-height: 22px;
}

#date-picker {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 5 5-5z' fill='%23333'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px;
  font-family: inherit;
}

</style>

