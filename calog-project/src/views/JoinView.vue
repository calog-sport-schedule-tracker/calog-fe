<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'; // Pinia 스토어 가져오기

const nickname = ref('');
const id = ref('');
const password = ref('');
const confirmPassword = ref('');

const userStore = useUserStore(); // user 스토어 사용

const handleJoin = () => {
  if (password.value !== confirmPassword.value) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  const payload = {
    nickname: nickname.value,
    userId: id.value,
    userPw: password.value,
  };

  // Pinia 스토어의 join 메서드 호출
  userStore.join(payload);
};
</script>

<template>
  <div class="join-container">
    <form @submit.prevent="handleJoin" class="join-form">
      <h1>Join to Calog</h1>
      <div class="input-group">
        <label for="id">Id</label>
        <input v-model="id" type="text" id="id" required />
      </div>
      <div class="input-group">
        <label for="nickname">Nickname</label>
        <input v-model="nickname" type="text" id="nickname" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <div class="input-group">
        <label for="confirm-password">Confirm Password</label>
        <input v-model="confirmPassword" type="password" id="confirm-password" required />
      </div>
      <button type="submit" class="join-button">Join</button>
    </form>
    <p class="login-callout">
      Already have an account? <a @click.prevent="$router.push('/login')" class="login-button">Log in</a>
    </p>
  </div>
</template>

<style scoped>
img {
  width: 20%;
}

.join-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
  background-color: white;
}

.join-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 30px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  /* background-color: #f6f8fa; */
}

.join-form h1 {
  padding-bottom: 10px;
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 10px;
  color: #24292e;
}

.input-group {
  width: 100%;
  margin-bottom: 2rem;
}

.input-group label {
  display: block;
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.8rem;
  height: 60%;
  font-size: 14px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
}

.input-group input:focus {
  border-color: #0969da;
  box-shadow: 0 0 5px rgba(87, 160, 245, 0.3);
}

button {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  background-color: #43A5FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #43A5FF;
}

button:active {
  background-color: #43A5FF;
}

.login-button {
  color: #0969da;
  text-decoration: none;
}

.login-button:hover {
  text-decoration: underline;
}

.login-callout {
  margin-top: 16px;
  font-size: 14px;
  color: #57606a;
}
</style>
