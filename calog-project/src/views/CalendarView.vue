<template>
  <div>

    <div class="calendar-container">
      <!-- 지역 필터 -->
      <div class="filter-container">
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

        <button @click="fetchFilteredEvents">조회</button>
      </div>
      <!-- 필터 끝 -->

      <!-- FullCalendar -->
      <FullCalendar :options="calendarOptions" class />
    </div>
    <!-- 특정 대회 클릭 시 모달 창으로 상세 페이지 이동 처리 용 -->
    <EventModal v-if="isModalVisible" :event="selectedEvent" @close="closeModal" />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import EventModal from "@/components/EventModal.vue";

export default {
  components: { FullCalendar, EventModal },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        events: [],
        displayEventTime: false,
        eventClick: this.handleEventClick,
      },
      isModalVisible: false,
      selectedEvent: null,
      selectedCity: "",
      selectedSport: "",
    };
  },
  methods: {
    // 전체 이벤트 가져오기
    fetchEvents() {
      axios
        .get("/api/event")
        .then((response) => {
          this.updateCalendarEvents(response.data);
        })
        .catch((error) => {
          console.error("전체 대회 조회 오류:", error);
        });
    },
    // 필터링된 이벤트 가져오기
    fetchFilteredEvents() {
      if (this.selectedCity && this.selectedSport) {
        axios
          .get("/api/event/sportCity", {
            params: { city: this.selectedCity, sport: this.selectedSport },
          })
          .then((response) => {
            this.updateCalendarEvents(response.data);
          })
          .catch((error) => {
            console.error("스포츠 + 도시 필터링 오류:", error);
          });
      } else if (this.selectedCity) {
        axios
          .get("/api/event/city", { params: { city: this.selectedCity } })
          .then((response) => {
            this.updateCalendarEvents(response.data);
          })
          .catch((error) => {
            console.error("도시 필터링 오류:", error);
          });
      } else if (this.selectedSport) {
        axios
          .get("/api/event/sport", { params: { sport: this.selectedSport } })
          .then((response) => {
            this.updateCalendarEvents(response.data);
          })
          .catch((error) => {
            console.error("스포츠 필터링 오류:", error);
          });
      } else {
        this.fetchEvents();
      }
    },
    // FullCalendar에 이벤트 업데이트
    updateCalendarEvents(events) {
      const formattedEvents = events.map((event) => ({
        id: event.id,
        title: `${event.eventName} - ${event.city}`,
        start: event.eventDate,
        end: event.eventDate,
      }));
      this.calendarOptions = {
        ...this.calendarOptions,
        events: formattedEvents,
      };
    },
    handleEventClick(info) {
  const eventId = info.event.id;
  console.log("클릭한 이벤트 ID:", eventId); // 디버깅용
  axios
    .get(`/api/event/${eventId}`) // 이벤트 기본 정보 요청
    .then((response) => {
      console.log("이벤트 기본 정보:", response.data); // 디버깅용
      this.selectedEvent = response.data;
      return axios.get(`/api/detail/${eventId}`); 
    })
    .then((response) => {
      console.log("Detail 정보:", response.data); 
      this.selectedEvent.details = response.data; 
      this.isModalVisible = true; 
    })
    .catch((error) => {
      console.error("이벤트 또는 Detail 정보 조회 오류:", error);
      console.error("요청 URL:", `/api/detail/${eventId}`);
    });
},

    // 모달 닫기
    closeModal() {
      this.isModalVisible = false;
      this.selectedEvent = null;
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>


<style scoped>

/* 필터 스타일 */
.filter-container {
  display: flex;
  flex-wrap: wrap; /* 좁은 화면에서도 정렬되도록 */
  align-items: center; /* 수직 중앙 정렬 */
  gap: 15px; /* 요소 간 간격 */
  margin-top: 20px;
  margin-bottom: 20px; /* 아래 여백 */
  border-radius: 8px; /* 둥근 모서리 */
  max-width: 1200px; /* 캘린더의 너비에 맞추기 */
  margin-left: auto; /* 캘린더와 정렬 */
  margin-right: auto;
  /* justify-content: flex-end; */
}


.filter-container label {
  font-weight: bold;
}

.filter-container select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
}

.filter-container button {
  padding: 5px 20px;
  background-color: #3094CA;
  color: snow;
  font-family: 'Do Hyeon', 'Jua';
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-container select,
.filter-container button {
  min-height: 30px; /* select 및 버튼의 동일 너비 */

}

/* 캘린더 크기 조정 */
.fc {
  max-width: 1200px; /* 캘린더의 최대 너비 제한 */
  margin: 0 auto; /* 화면 중앙 정렬 */
  /* border: 10px solid #ddd; 테두리 */
  border-radius: 12px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 둥근 테두리 안에 콘텐츠가 맞도록 */
}

/* 캘린더 헤더 스타일 */
/* FullCalendar Toolbar 스타일 */
::v-deep(.fc-toolbar) {
  background-color: #3094CA; /* 배경색 */
  color: white; /* 텍스트 색상 */
  border-radius: 12px 12px 0 0; /* 위쪽 둥근 모서리 */
  padding: 10px 20px; /* 전체 여백 (위아래, 좌우) */
  min-height: 60px; /* 높이 설정 */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: space-between; /* 좌우 정렬 */
}

/* ::v-deep(.filter-container button) {
  background-color: snow !important;
} */


/* Toolbar 안의 버튼 스타일 */
::v-deep(.fc-toolbar button) {
  padding: 8px 12px; /* 버튼 내부 여백 */
  border-radius: 6px; /* 둥근 모서리 */
  margin: 0 5px; /* 버튼 간격 */
  background-color: #ffffff; /* 버튼 배경 */
  color: #3094CA; /* 버튼 텍스트 색상 */
  border: none; /* 테두리 제거 */
  cursor: pointer;
  transition: background-color 0.3s;
}

::v-deep(.fc-toolbar button:hover) {
  background-color: #e6e6e6; /* 버튼 호버 시 색상 */
}

/* Toolbar 제목 스타일 */
::v-deep(.fc-toolbar-title) {
  font-size: 24px; /* 제목 폰트 크기 */
  font-weight: bold; /* 제목 폰트 굵기 */
  margin: 0 5px; /* 좌우 여백 */
}

/* Toolbar 안의 버튼과 텍스트 사이의 여백 */
::v-deep(.fc-toolbar-chunk) {
  margin: 0 10px; /* 각 Toolbar 블록의 간격 */
}

/* 캘린더 본문 스타일 */
.fc-view-harness {
  padding: 10px;
  background-color: #fff; /* 캘린더 배경 */
}

.filter-container select {
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

.filter-container select:hover {
  border-color: #3094CA; /* 호버 시 테두리 색상 */
  background-color: #e8f4fc; /* 호버 시 배경색 */
}

</style>
