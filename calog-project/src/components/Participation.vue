<script setup>
import { useParticipationStore } from '@/stores/participation';
// import { useEventStore } from '@/stores/event';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const pStore = useParticipationStore();
const router = useRouter();

onMounted(()=>{
  pStore.getParticipationList();
})

function goToDetail(id) {
  router.push({ name: 'participationDetail', params: { id } });
}

</script>

<template>
  <!-- <div class="participation"> -->
    <div class="lists">
      <div v-for="list in pStore.participationList" :key="list.id" class="list" @click="goToDetail(list.id)"
      >
        
        <div class="list-item">
          <div class="list-title">날짜</div>
          <div class="list-content">{{ list.eventDate }}</div>
        </div>

        <div class="list-item">
          <div class="list-title">대회명</div>
          <div class="list-content">{{ list.eventName }}</div>
        </div> 

        <div class="list-item">
        <div class="list-title">종목</div>
          <div class="list-content"> {{ list.sport }} </div>
        </div>

        <div class="list-item">
          <div class="list-title">detail</div>
          <div class="list-content"> {{ list.detail }} </div>
        </div>

        <div class="list-item">
          <div class="list-title">장소</div>
          <div class="list-content">{{ list.city }}</div>
        </div>

        <div class="list-item">
          <div class="list-title">기록</div>
          <div v-if="list.completionTime !== '00:00:00'" class="list-content" >{{ list.completionTime }}</div>
          <div v-else class="list-content" ></div>

        </div>

        <div class="list-item">
          <div class="list-title">순위</div>
          <div v-if="list.ranking" class="list-content">{{ list.ranking }}</div>
          <div v-else class="list-content"></div>
        </div>

        <div class="list-item" id="pictogram">
          <div v-if="list.sport == `마라톤`">
            <span class="material-symbols-outlined">sprint</span>
          </div>
          <div v-else-if="list.sport == `테니스`">
            <span class="material-symbols-outlined">sports_tennis</span>
          </div>
          <div v-else-if="list.sport == `배드민턴`">
            <span class="material-symbols-outlined">sports_handball</span>
          </div>
          <div v-else-if="list.sport == `그랑폰도`">
            <span class="material-symbols-outlined">directions_bike</span>
          </div>
          <div v-else-if="list.sport == `철인3종`">
            <span class="material-symbols-outlined">pool</span>
          </div>
        </div>
      </div>
    <!-- </div> -->
</div>
</template>

<style>

.lists .list {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px; /* 둥근 모서리 */
  background-color: #fff; /* 배경색 */
  max-width: 80vw; /* 최대 크기를 부모 컨테이너에 맞춤 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  overflow-x: hidden; /* 가로 스크롤 방지 */
}

.list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 세로 중앙 정렬 */
  width: 160px;
  flex-grow: 1;
}

.lists .list:hover {
  transform: scale(1.02); /* 살짝 확대 */
  background-color: #f9f9f9; /* 은은한 배경색 변화 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 더 강하게 */
}

/* active 시 눌림 효과 */
.lists .list:active {
  transform: scale(0.98); /* 클릭 시 살짝 축소 */
  background-color: #e9e9e9; /* 배경색 더 어둡게 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* 그림자 더 진하게 */
}


.list-title {
  color: #8E8B8B;
  margin-bottom: 8px;
  text-align: center;
  width: 100%;
}

#pictogram {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  flex-grow: 1;
  min-height: 100%; /* 부모 요소 높이와 동일하게 설정 */
}

#pictogram .material-symbols-outlined {
  font-size: 40px; /* 아이콘 크기 조정 */
  color: #555; /* 아이콘 색상 */
}

.list-content {
  min-height: 20px; /* 다른 list-content와 동일한 최소 높이 설정 */
}

</style>
