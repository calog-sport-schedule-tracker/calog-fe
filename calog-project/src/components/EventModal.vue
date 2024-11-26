<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <!-- 헤더 -->
      <div class="modal-header">
        <h1>{{ event.eventName }}</h1>
        <div class="modal-button">
          <button
            class="material-symbols-outlined"
            :class="{ 'is-favorite': isFavorite }"
            @click="fetchFavorite"
          >
            favorite
          </button>
          <button class="material-symbols-outlined" @click="close">
            close
          </button>
        </div>
      </div>
      <!-- 바디 -->
      <div class="modal-body">
        <section class="modal-body-main">
          <div class="modal-body-left">
            <img :src="getEventImage(event)" alt="Event Image" />
          </div>
          <div class="modal-body-right">
            <p><strong>종목: </strong> {{ event.sport }}</p>
            <p><strong>일시: </strong> {{ formatDate(event.eventDate) }}</p>
            <p>
              <strong>장소: </strong> {{ event.address }}, {{ event.city }}
            </p>
            <p>
              <strong>등록 기간: </strong>
              {{ formatDate(event.registrationStart) }} -
              {{ formatDate(event.registrationDeadline) }}
            </p>
            <p>
              <strong>세부 종목:</strong>
              {{ event.details.map(detail => detail.category).join(', ') }}
            </p>
            <button @click="initializeMap" class="map-button">지도 보기</button>
          </div>
        </section>
        <section class="modal-map">
          <div id="map" style="width: 100%; height: 500px; margin-top: 20px;"></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Props 정의
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

// Emit 정의
const emit = defineEmits(['close']);

// State
const isFavorite = ref(false);

// Methods
function close() {
  console.log('close 버튼 클릭됨');
  emit('close');
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('ko-KR', options);
}

function fetchFavorite() {
  const eventId = props.event.id;
  const url = `api/favorite/user/1/event/${eventId}`;

  if (isFavorite.value) {
    axios
      .delete(url)
      .then(() => {
        console.log('찜 해제 성공');
        isFavorite.value = false;
      })
      .catch(() => {
        console.error('찜 해제 실패');
      });
  } else {
    axios
      .post(url)
      .then(() => {
        console.log('찜 추가 성공');
        isFavorite.value = true;
      })
      .catch(() => {
        console.error('찜 추가 실패');
      });
  }
}

function checkFavoriteStatus() {
  const eventId = props.event.id;
  const url = `api/favorite/user/1/event/${eventId}`;

  axios
    .get(url)
    .then(response => {
      isFavorite.value = response.data.isFavorite;
    })
    .catch(error => {
      console.error('찜 상태 확인 실패', error);
    });
}

function getEventImage(event) {
  if (!event.img) {
    switch (event.sport) {
      case '마라톤':
        return new URL('@/assets/sport-image/marathon.jpg', import.meta.url).href;
      case '그랑폰도':
        return new URL('@/assets/sport-image/granfondo.jpg', import.meta.url).href;
      case '테니스':
        return new URL('@/assets/sport-image/tennis.jpg', import.meta.url).href;
      case '배드민턴':
        return new URL('@/assets/sport-image/badminton.jpg', import.meta.url).href;
      case '철인3종':
        return new URL('@/assets/sport-image/triathlon.jpg', import.meta.url).href;
      default:
        return new URL('@/assets/sport-image/default.jpg', import.meta.url).href;
    }
  }
  return event.img;
}

function initializeMap() {
  if (!window.kakao || !props.event.address) {
    console.error('지도 초기화 실패');
    return;
  }

  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.978),
    level: 3,
  };
  const map = new kakao.maps.Map(container, options);
  const geocoder = new window.kakao.maps.services.Geocoder();

  geocoder.addressSearch(props.event.address, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      new kakao.maps.Marker({
        map,
        position: coords,
      });
      map.setCenter(coords);
    } else {
      console.error('주소 변환 실패');
    }
  });
}

// Lifecycle Hook
onMounted(checkFavoriteStatus);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #f9f9f9;
  border-radius: 10px;
  width: 70%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  /* padding: 20px; */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3094CA;
  color: white;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-header h1{
  margin-left: 20px;
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  line-height: 1.4; 
  color: #F2F2F2; 
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); 
}

.modal-header button {
  margin-right: 20px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 50px; /* 양쪽 섹션 간 간격 */
  padding: 20px;
}

.modal-body-main {
  display: flex;
  gap: 20px;
  width: 100%;
}

.modal-body-left {
  flex: 1; /* 이미지 섹션 너비 비율 */
  display: flex;
  /* align-items: center; */
  justify-content: center;
}

.modal-body-right {
  flex: 2; /* 텍스트 섹션 너비 비율 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px; /* 텍스트 간 간격 */
}


.modal-content img {
  width: 95%;
  height: 95%;
  border-radius: 8px;
  margin: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;
}

.map-button {
  padding: 10px 20px;
  background-color: #3094CA;
  color: white; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.map-button:hover {
  background-color: #287ba8;
}

.modal-body-right p {
  margin: 10px 0;
  font-size: 20px;
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

.is-favorite {
  color: black;
}

</style>
