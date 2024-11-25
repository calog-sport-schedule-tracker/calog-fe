\<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close">X</button> <!-- 모달창 끄는 버튼 --> 
      <h2>{{ event.eventName }}</h2>
      <p><strong>종목: </strong> {{ event.sport }}</p>
      <p><strong>일시: </strong> {{ formatDate(event.eventDate) }}</p>
      <p><strong>장소: </strong> {{ event.address }}, {{ event.city }}</p>
      <p><strong>등록 기간: </strong> {{ formatDate(event.registrationStart) }}  -  {{ formatDate(event.registrationDeadline) }}</p>
      <p><strong>세부 종목:</strong> {{ event.details.map(detail => detail.category).join(', ') }}</p>

      
      <img :src="getEventImage(event)" alt="Event Image" />
      
      <button @click="initializeMap" class="map-button">지도 보기</button>
      <div id="map" style="width: 100%; height: 300px; margin-top: 20px;"></div>
      
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
    // 대회의 이미지가 존재하지 않을 경우 대회의 종목에 따라 대표 이미지 변경하는 메서드
    getEventImage(event) {
      if (!event.img) {
        if (event.sport === "마라톤") {
          return new URL('@/assets/sport-image/marathon.jpg', import.meta.url).href;
        } else if (event.sport === "그랑폰도") {
          return new URL('@/assets/sport-image/granfondo.jpg', import.meta.url).href;
        } else if (event.sport === "테니스") {
          return new URL('@/assets/sport-image/tennis.jpg', import.meta.url).href;
        } else if (event.sport ==="배드민턴") {
          return new URL('@/assets/sport-image/badminton.jpg', import.meta.url).href;
        } else if (event.sport ==="철인3종") {
          return new URL('@/assets/sport-image/triathlon.jpg', import.meta.url).href;
        } 
      
      else {
        return new URL('@/assets/sport-image/default.jpg', import.meta.url).href;
        //혹시 몰라 기본 이미지 생성
      }
    }
    return event.img; 
  },
  initializeMap() {
      
      if (!window.kakao ||!this.event.address) {
        console.error("Kakao Map API 안뜸 아님 주소못찾음 ㅜ");
        return;

      }
      console.log("지도 초기화");
      console.log("전달된 주소:", this.event.address);

      

      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 기본 위치 
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(this.event.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
        console.log("주소 검색 성공! 결과:", result);

      // 변환된 좌표를 지도에 반영
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });

      // 지도 중심 이동
      map.setCenter(coords);

      console.log("지도에 표시된 좌표:", coords);
    } else {
      console.error("주소 변환 실패! 상태 코드:", status);
    }
  });

      


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
  width: 70%;
  max-height: 80%; /* 창 높이를 화면의 80%로 제한 */
  overflow-y: auto; 
  max-width: 500px;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); 
}

.modal-content img {
max-width: 100%;
height: auto;
border-radius: 8px;
margin-top: 20px;
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