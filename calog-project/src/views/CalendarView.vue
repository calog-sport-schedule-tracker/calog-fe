<template>
  <div>

    <!-- 필터 처리용 -->
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
        <option value="충북">충북</option>
        <option value="충남">충남</option>
        <option value="전북">전북</option>
        <option value="전남">전남</option>
        <option value="경북">경북</option>
        <option value="경남">경남</option>
        <option value="제주">제주</option>
      </select>

      <label for="sport-select">종목:</label>
      <select id="sport-select" v-model="selectedSport">
        <option value="">모든 종목</option>
        <option value="마라톤">마라톤</option>
        <option value="배드민턴">배드민턴</option>
        <option value="테니스">테니스</option>
        <option value="철인3종">철인3종</option>
        <option value="그란폰도">그란폰도</option>
      </select>

      <button @click="fetchFilteredEvents">조회</button>
    </div>
    <!-- 필터 끝-->

    <!-- FullCalendar -->
    <FullCalendar :options="calendarOptions" />

    <!-- 특정 대회 클릭 시 모달 창으로 상세 페이지 이동 처리 용-->
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
          console.log("전체 대회 데이터:", response.data); // 디버깅용 로그
          this.updateCalendarEvents(response.data);
        })
        .catch((error) => {
          console.error("전체 대회 조회 오류:", error);
        });
    },
    // 필터링된 이벤트 가져오기
    fetchFilteredEvents() {
      if (this.selectedCity && this.selectedSport) {
        // 지역 + 종목 필터링 (오류 로그 추가했음)
        axios
          .get("/api/event/sportCity", {
            params: { city: this.selectedCity, sport: this.selectedSport },
          })
          .then((response) => {
            console.log("스포츠 + 도시 필터링", response.data);
            this.updateCalendarEvents(response.data);
          })
          .catch((error) => {
            console.error("스포츠 + 도시 필터링 오류", error);
          });
      } else if (this.selectedCity) {
        // 지역 필터링 (오류 로그 추가함)
        axios
          .get("/api/event/city", { params: { city: this.selectedCity } })
          .then((response) => {
            console.log("도시 필터링", response.data);
            this.updateCalendarEvents(response.data);
          })
          .catch((error) => {
            console.error("도시 필터링 오류", error);
          });
      } else if (this.selectedSport) {
        // 종목'만' 필터링
        axios
          .get("/api/event/sport", { params: { sport: this.selectedSport } })
          .then((response) => {
            console.log("스포츠 필터링 응답:", response.data);
            this.updateCalendarEvents(response.data);
          })
          .catch((error) => {
            console.error("스포츠 필터링 오류:", error);
          });
      } else {
        // 필터링 없이 전체 조회
        this.fetchEvents();
      }
    },
    // FullCalendar에 이벤트 업데이트
    updateCalendarEvents(events) {
      if (!Array.isArray(events)) {
        console.error("조회 데이터 비어있음", events);
        events = []; // 기본값으로 빈 배열 설정
      }
      const formattedEvents = events.map((event) => ({
        id: event.id,
        title: `${event.eventName} - ${event.city}`,
        start: event.eventDate,
        end: event.eventDate,
      }));
      console.log("포맷된 이벤트", formattedEvents); // 디버깅용 로그
      this.calendarOptions = {
        ...this.calendarOptions,
        events: formattedEvents,
      };
    },
    // 이벤트 클릭 시 모달 열기
    handleEventClick(info) {
      const eventId = info.event.id;
      axios
        .get(`/api/event/${eventId}`)
        .then((response) => {
          this.selectedEvent = response.data;
          this.isModalVisible = true;
        })
        .catch((error) => {
          console.error("이벤트 상세 정보 조회 오류", error);
        });
    },
    // 모달 닫기
    closeModal() {
      this.isModalVisible = false;
      this.selectedEvent = null;
    },
  },
  mounted() {
    this.fetchEvents(); // 첫 페이지 (필터링 걸지않은 모든 대회 조회용)
  },
};
</script>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
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
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-container button:hover {
  background-color: #0056b3;
}
</style>
