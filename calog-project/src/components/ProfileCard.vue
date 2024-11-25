<template>
  <div class="profile-card">
    <img :src="profile.image" alt="profile image" class="profile-img" />
    <div class="profile-info">
      <h1>{{ uStore.nickname }}</h1>
      <p class="profile-detail" >{{ dynamicDetail }}</p>
    </div>
    <Chart/>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import profileImage from "@/assets/profile.jpg";
import Chart from "./Chart.vue";

const uStore = useUserStore();

console.log("uStore.userId: ", uStore.userId);
const profile = ref({
  image: profileImage,
  // name: "짱우",
  details: "마라톤을 좋아하는 개발자 💻",
});

// userId에 따라 동적으로 세부 정보를 설정
const dynamicDetail = computed(() => {
  if (uStore.userId == 1) {
    return "마라톤을 좋아하는 개발자 💻";
  } else if (uStore.userId == 2) {
    return "언젠간 마라톤 풀코스 🏃🏻‍♀️";
  } else {
    console.log(uStore.id);
    return "프로필 정보를 설정해주세요! 😄";
  }
});
</script>

<style>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px; /* 둥근 모서리 추가 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  padding: 12px;
  background-color: #fff; /* 배경색 */
  flex-grow: 1;
  min-height: 80vh;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 10%; /* 이미지를 원형으로 */
  margin-bottom: 10px;
}

.profile-info h1,
.profile-info p {
  margin: 5px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

/* 닉네임 밑에 세부설명 글씨 크기 조절 */
.profile-detail {

  font-size: 16px; 

}
</style>
