<script setup>
import ProfileCard from "@/components/ProfileCard.vue";
import Participation from "@/components/Participation.vue";
</script>

<template>
  <div class="participation-list-view">
    <ProfileCard class="profile-section" />
    <Participation class="record-section" />
  </div>
</template>

<style>
.participation-list-view {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.profile-section {
  flex: 1;
  margin-right: 20px; /* 프로필과 기록 목록 사이의 간격 조정 */
}

.record-section {
  flex: 3;
}
</style>
