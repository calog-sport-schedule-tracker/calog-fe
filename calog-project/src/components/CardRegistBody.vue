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
/* 이벤트 팝업창의 body */
.card-body {
  display: flex;
  padding: 20px;
  text-align: center;
}

/* 왼쪽에 위치하는 이미지의 크기 */
.card-body img {
  /* 이미지 크기 -> 조금 위아래로 늘어났다가 줄어들었다가 함 */
  width: 70%;
  height: 100%;
  border-radius: 5px;
}

.card-body-left,
.card-body-right {
  /* 남는 공간을 동일하게 나눔 50:50 */
  flex: 1; 
}

.card-body-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

select, textarea, button {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

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
  