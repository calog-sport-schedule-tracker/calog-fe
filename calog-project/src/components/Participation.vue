<template>
  <!-- <div class="participation"> -->
    <div class="lists">
      <div v-for="list in pStore.participationList" :key="list.id" class="list">
        
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
          <div class="list-content">{{ list.completionTime }}</div>
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

<script setup>
import { useParticipationStore } from '@/stores/participation';
import { useEventStore } from '@/stores/event';
import { onMounted } from 'vue';

const pStore = useParticipationStore();
const eStore = useEventStore();

onMounted(()=>{
  pStore.getParticipationList();
})

</script>

<style>
/* .participation {
  display: flex;
  flex-direction: column;
} */
.lists .list {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px; /* 둥근 모서리 */
  background-color: #fff; /* 배경색 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}
.list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px;
  flex-grow: 1;
}

.list-title {
  color: #8E8B8B;
  margin-bottom: 8px;
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

</style>
