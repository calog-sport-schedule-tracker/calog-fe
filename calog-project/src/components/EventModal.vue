<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="close-button" @click="close">X</button>
        <h2>{{ event.eventName }}</h2>
        <p><strong>종목:</strong> {{ event.sport }}</p>
        <p><strong>일시:</strong> {{ formatDate(event.eventDate) }}</p>
        <p><strong>장소:</strong> {{ event.address }}, {{ event.city }}</p>
        <p><strong>등록 시작:</strong> {{ formatDate(event.registrationStart) }}</p>
        <p><strong>등록 마감:</strong> {{ formatDate(event.registrationDeadline) }}</p>
        <img v-if="event.img" :src="event.img" alt="Event Image" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      event: {
        type: Object,
        required: true,
      },
    },
    methods: {
      close() {
        console.log("close 버튼 클릭됨"); //디버깅용 ㅎㅎ
        this.$emit("close"); 
      },
      formatDate(date) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString("ko-KR", options);
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white; 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* 달력 위에 모달 창 오도록 z-index 설정!*/
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    position: relative;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); 
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  