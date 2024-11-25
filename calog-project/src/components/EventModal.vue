<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h1>{{ event.eventName }}</h1>
        <button class="material-symbols-outlined" @click="close">close</button> <!-- 모달창 끄는 버튼 --> 
      </div>
      <div class="modal-body">
        <div class="modal-body-left">
          <img :src="getEventImage(event)" alt="Event Image" />
        </div>
        <div class="modal-body-right">
          <p><strong>종목: </strong> {{ event.sport }}</p>
          <p><strong>일시: </strong> {{ formatDate(event.eventDate) }}</p>
          <p><strong>장소: </strong> {{ event.address }}, {{ event.city }}</p>
          <p><strong>등록 기간: </strong> {{ formatDate(event.registrationStart) }} - {{ formatDate(event.registrationDeadline) }}</p>
          <p><strong>세부 종목:</strong> {{ event.details.map(detail => detail.category).join(', ') }}</p>
          <button @click="initializeMap" class="map-button">지도 보기</button>
          <div id="map" style="width: 100%; height: 300px; margin-top: 20px;"></div>
        </div>
      </div>
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
        console.error("!window.kakao");
        console.log(window.kakao);
        return;
      }
      else if (!this.event.address) {
        console.log("!this.event.address");
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
  display: flex; /* Flexbox 레이아웃 */
  gap: 50px; /* 양쪽 섹션 간 간격 */
  padding: 20px;
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
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 40px;
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


</style>
