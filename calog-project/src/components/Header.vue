<template>
	<div class="head">
		<header class="header">
			<div class="logo-container">
				<img src="./../assets/logo.png" alt="calog" class="logo">
			</div>
			<nav class="menu">
				<RouterLink to="/calendar" class="material-symbols-outlined" >calendar_month</RouterLink>
				<RouterLink to="/list" class="material-symbols-outlined" >list</RouterLink>
				<RouterLink to="/login" class="material-symbols-outlined" >person</RouterLink>
			</nav>
		</header>
	</div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>

body {
  margin-top: 0px;
}

.head {
  background-color: #F7F7F7;
  height: 2.5em;
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  height: 2.8em;
}

.logo-container {
  display: flex;
  align-items: center;
}

.menu {
  display: flex;
  align-items: center;
  gap: 20px;

}

.menu a {
  text-decoration: none; /* 밑줄 없애기 */
  color: inherit; /* 색상 변화를 막고 기본 색상 유지 */
  transition: color 0.3s ease; /* 색상 변화에 부드러운 전환 효과 추가 */
}

.menu a:hover{
  text-decoration: none; /* hover, focus, active 상태에서도 밑줄 없애기 */
  color: gray; /* hover 및 active 상태에서 색상을 회색으로 변경 */
}


.material-symbols-outlined {
  user-select: none; /* 텍스트 선택 방지 */
  cursor: pointer; /* 클릭 가능한 아이콘임을 표시 */
  font-size: 28px; /* 아이콘 크기 조정 */
  transition: color 0.3s ease; /* 아이콘 색상 전환 효과 */
}
</style>