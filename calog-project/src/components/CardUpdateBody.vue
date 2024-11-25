<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useParticipationStore } from '@/stores/participation';
import CardUpdateHeader from './CardUpdateHeader.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id; // URL의 :id를 통해 가져옴
const pStore = useParticipationStore(); // participation.js에 있는 useParticipation 사용 -> updateParticipation 쓰겠다

// 시간으로 변환하기 위함
const padZero = (num) => String(num).padStart(2, '0'); // 두 자리로 변환

// 바꿀 내용들
const memo = ref("");
const completionTime = ref({hour: 0, minute: 0, second: 0});
const selectedCategory = ref("");  // 세부 종목
const categories = ref([]);

// 세부 종목 데이터를 가져오는 함수
const fetchCategories = (eventId) => {
  if (!eventId) {
    console.log("eventId false");
    return;
  }
  axios
    .get(`http://localhost:8080/api/detail/${eventId}`)
    .then((response) => {
      console.log("세부 종목 데이터:", response.data);
      categories.value = response.data;
      
    })
    .catch((error) => {
      console.error("세부 종목 로드 실패:", error);
      categories.value = [];
    });
};

const updateParticipation = function() { 
  const updatedData = {
    memo: memo.value,
    completionTime: `${padZero(completionTime.value.hour)}:${padZero(completionTime.value.minute)}:${padZero(completionTime.value.second)}`,
    detail: categories.value.find(c => c.id === selectedCategory.value)?.category || '',
  }
  console.log("전송 데이터: ", updatedData); // 데이터 전송
  // 스토어의 update함수 호출 -> patch 요청 전송
  pStore.updateParticipation(updatedData, id); 
}

const images = import.meta.glob('@/assets/sport-image/*.jpg', { eager: true });

const getImageSrc = (eventId, sport) => {
  const sportMapping = {
    '마라톤': 'marathon',
    '그랑폰도': 'granfondo',
    '철인3종': 'triathlon',
    '테니스': 'tennis',
    '배드민턴': 'badminton',
  };
  
  const userEventImagePath = `/src/assets/sport-image/1_${eventId}.jpg`;
  const englishSportName = sportMapping[sport] || 'default';
  const sportImagePath = `/src/assets/sport-image/${englishSportName}.jpg`;

  // 이미지 반환 로직
  if (images[userEventImagePath]) {
    console.log("사용자 이벤트 이미지:", userEventImagePath);
    return images[userEventImagePath].default;
  } else if (images[sportImagePath]) {
    console.log("종목 이미지:", sportImagePath);
    return images[sportImagePath].default;
  } else {
    console.log("기본 이미지 사용");
    return images['/src/assets/sport-image/default.jpg'].default;
  }
};

// // API 호출
// onMounted(()=> {
//   pStore.getParticipationDetail(id) // 기존 참여 정보 가져오기
//   console.log("참여 상세 정보: ", pStore.getParticipationDetail);
//   memo.value = pStore.participationDetail.memo || "";
// })

onMounted(() => {
  // 비동기 호출에서 데이터를 가져온 후 바로 접근
  pStore.getParticipationDetail(id);

  // 데이터 접근
  const detail = pStore.participationDetail;

  if (detail) {
    console.log("참여 상세 정보(memo):", detail.memo);

    // 초기 값 설정
    memo.value = detail.memo || "";
    completionTime.value = {
      hour: parseInt(detail.completionTime?.split(':')[0] || 0),
      minute: parseInt(detail.completionTime?.split(':')[1] || 0),
      second: parseInt(detail.completionTime?.split(':')[2] || 0),
    };
    console.log("detail.detail: ", detail.detail);
    // 세부 종목 로드
    fetchCategories(detail.id);

    // 선택된 카테고리 초기화
    selectedCategory.value = detail.detail || "";
    // selectedCategory.value = categories.value.find(c=>c.category === participationDetail.detail)?.id || "";
  } else {
    console.error("참여 상세 정보를 가져올 수 없습니다.");
  }
});

</script>

<template>
  <CardUpdateHeader :eventName="pStore.participationDetail.eventName"/>
  <div class="card-body">
    <div class="card-body-left">
      <img :src="getImageSrc(pStore.participationDetail.eventId, pStore.participationDetail.sport)" :alt="pStore.participationDetail.sport">
    </div>

    <div class="card-body-right">
      <div class="detail-info" >
        <p class="update-list"><strong>대회:</strong> {{ pStore.participationDetail.eventName }}</p>
        <p class="update-list"><strong>일정:</strong> {{ pStore.participationDetail.eventDate }}</p>
        <p class="update-list"><strong>종목:</strong> {{ pStore.participationDetail.sport }}</p>
        <!-- 세부 종목 -->
        <div class="update-list" id="update-category">
          <label for="category-select"><strong>세부: </strong></label>
          <select id="category-select" v-model="selectedCategory">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.category }}
            </option>
          </select>
        </div>
        <!-- 기록 -->
        <div class="update-list" id="update-completionTime">
          <span><strong>기록: </strong></span>

          <div class="completionTime">
            <select v-model="completionTime.hour">
              <option v-for="h in 24" :key="h" :value="h-1">{{ h-1 }}</option>
            </select>
            시
          </div>
          <div class="completionTime">
            <select v-model="completionTime.minute">
              <option v-for="m in 60" :key="m" :value="m-1">{{ m-1 }}</option>
            </select>
            분
          </div>
          <div class="completionTime">
            <select v-model="completionTime.second">
              <option v-for="s in 60" :key="s" :value="s-1">{{ s-1 }}</option>
            </select>
            초
          </div>
        </div>
        <div class="update-list" id="update-memo">
          <label for="memo"><strong>memo</strong> </label>
          <textarea id="memo" v-model="memo" rows="2"></textarea>
        </div>
      </div>
      <div class="detail-footer">
        <button @click="updateParticipation" class="material-symbols-outlined">check</button>
      </div>

    </div>
  </div>
</template>


<style scoped>

/* 이벤트 팝업창의 body */
.card-body {
  display: flex;
  align-items: stretch; /* 좌우 영역의 높이를 동일하게 설정 */
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

.card-body-right {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  justify-content: space-between; /* 위아래 간격을 조정 */
  padding: 10px;
}

.detail-header {
  margin-bottom: 20px;
  text-align: center;
}

.detail-header h2 {
  font-size: 24px;
  font-weight: bold;
}

.detail-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px; /* 요소 간 간격 */
  flex-grow: 1; /* 남는 공간을 채우도록 설정 */
  height: 100%; /* 부모 컨테이너 높이로 확장 */
}

.detail-info p,
.detail-info label {
  margin: 10px 0;
  font-size: 20px;
  min-width: 50px;
}

.update-list {
  font-size: 20px;
}

.detail-footer {
  /* margin-top: auto; */
  text-align: center;
}

/* 돌아가기 버튼 */
button {
  padding: 10px 20px;
  background-color: #f9f9f9; /* 밝은 회색 */
  color: #495057; /* 짙은 회색 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ced4da; /* 약간 어두운 회색 */
}

.material-symbols-outlined {
  font-size: 26px;
}

#update-completionTime {
  display: flex;
  min-width: 20px;
  gap: 10px;
}

/* 시간, 분, 초 select 박스 스타일 */
select {
  width: 50px; /* 선택 박스 최소 너비 */
  padding: 4px; /* 내부 여백 */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* 기록 텍스트(시, 분, 초) 스타일 */
#update-completionTime span {
  margin: 0 2x; /* 텍스트와 select 박스 사이 간격 */
  font-weight: normal;
  flex-wrap: wrap; /* 자식 요소가 부모 너비 초과 시 줄바꿈 */
}

#category-select {
  min-width: 150px;
}


textarea {
  resize: none; /* 크기 조정 비활성화 */
  width: 100%;
  height: 100%;

}


#update-memo {
  display: flex;
  flex-direction: column;;
  align-items: baseline;
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
  width: 100%;
}
</style>
