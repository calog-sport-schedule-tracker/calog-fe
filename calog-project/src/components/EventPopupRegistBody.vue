<template>
  <!-- 이벤트 팝업창의 body -->
  <div class="card-body">
    <!-- 왼쪽에 위치할 이미지 사진 -->
    <div class="card-body-left">
      <img src="@/assets/sport-image/granfondo.jpg" alt="granfondo">
    </div>

    <!-- 오른쪽에 위치할 정보 -->
    <div class="card-body-right">
      <p>대회: 그랑폰도</p>
      <p>일정: 2024.11.03 (일)</p>
      <div class="detail-content">
        <label for="detail-select">종목: </label>
        <select id="detail-select">
          <option value="10km">10km</option>
          <option value="Full">Full</option>
        </select>
      </div>
      <div class="completion-time-content">
        기록:
      </div>
      <textarea placeholder="메모"></textarea>
      <button>기록하기</button>
    </div>
  </div>
</template>
  
<script setup>

</script>
  
<style scoped>

.detail-content {
  display: flex;
  align-items: center;
}

.detail-content label {
  display: flex;
  width: 100%;
}

.detail-content select {
  width: 100px;
}

</style>
  