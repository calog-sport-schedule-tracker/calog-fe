<template>
  <FullCalendar
    :options="calendarOptions"
    style="padding-left: 100px; padding-right: 100px"
  />
  <EventModal
    v-if="isModalVisible"
    :event="selectedEvent"
    @close="closeModal"
  />
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import EventModal from "@/components/EventModal.vue"; 

export default {
  components: {
    FullCalendar,
    EventModal,
  },
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
    };
  },
  methods: {
    fetchEvents() {
      axios
        .get("/api/event")
        .then((response) => {
          const events = response.data.map((event) => ({
            id: event.id, 
            title: `${event.eventName} - ${event.city}`,
            start: event.eventDate,
            end: event.eventDate,
          }));
          this.calendarOptions.events = events;
        })
        .catch((error) => {
          console.error("이벤트를 가져오는 중 오류 발생:", error);
        });
    },
    handleEventClick(info) {
      const eventId = info.event.id;
      axios
        .get(`/api/event/${eventId}`)
        .then((response) => {
          this.selectedEvent = response.data;
          this.isModalVisible = true;
        })
        .catch((error) => {
          console.error("이벤트 상세 정보를 가져오는 중 오류 발생:", error);
        });
    },
    closeModal() {
      console.log("closeModal 호출됨"); //디버깅용으로 추가
      this.isModalVisible = false;
      this.selectedEvent = null;
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>
