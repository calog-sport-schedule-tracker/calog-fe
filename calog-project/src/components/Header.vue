<template>
	<div class="head">
		<header class="header">
			<div class="logo-container">
				<img src="./../assets/logo.png" alt="calog" class="logo" @click="goToThumbnail">
			</div>
			<nav class="menu">
				<RouterLink to="/calendar" class="material-symbols-outlined" >calendar_month</RouterLink>
        <RouterLink to="/favorites" class="material-symbols-outlined" >favorite</RouterLink>
				<RouterLink to="/list" class="material-symbols-outlined" >list</RouterLink>
				<RouterLink to="/login" class="material-symbols-outlined" >person</RouterLink>
			</nav>
		</header>
	</div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();

const goToThumbnail = function() {
  router.push('/');
}

</script>

<style scoped>

body {
  margin-top: 0px;
}

.head {
  background-color: #f6f8fa; /* Github  */
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
  transition: filter 0.3s ease;
}

.logo-container:hover .logo {
  filter: brightness(1.1); /* 로고가 더 밝아지게 */
}

.logo-container:active .logo {
  filter: brightness(0.9); /* 클릭 시 로고가 더 어두워지게 */
}

.logo-container {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
}

.logo-container:hover {
  transform: scale(1.1); /* 로고가 약간 커지게 */
}

.logo-container:active {
  transform: scale(0.95); /* 클릭 시 로고가 약간 작아지게 */
}


.menu {
  display: flex;
  align-items: center;
  gap: 30px;
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