<template>
  <div class="card">
  <!-- 이벤트 팝업창의 header -->
    <EventPopupHeader/>
    <EventPopupRegist />
  </div>
</template>
  
<script setup>
import EventPopupHeader from './EventPopupHeader.vue';
import EventPopupRegist from '@/components/EventPopupRegistBody.vue'
</script>

<style scoped>

</style>
  