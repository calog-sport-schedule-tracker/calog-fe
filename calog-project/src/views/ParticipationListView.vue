<script setup>
import ProfileCard from "@/components/ProfileCard.vue";
import Participation from "@/components/Participation.vue";
import ParticipationListHeader from "@/components/ParticipationListHeader.vue";
import Header from "@/components/Header.vue";


</script>

<template>
      <Header />

  <div class="participation-list-view">
    <div class="participation-list-header">
      <ParticipationListHeader/>
    </div>
    <div class="participation-list-content">
      <ProfileCard class="profile-section" />
      <Participation class="list-section" />
    </div>
  </div>
</template>

<style>
.participation-list-view {
  display: flex;
  flex-direction: column;
}

.paraticipation-list-header {
  display: flex;
  flex-direction: row;
}


.participation-list-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.profile-section {
  flex: 1;
  margin-right: 20px; 
}

.list-section {
  flex: 3;
}

</style>
