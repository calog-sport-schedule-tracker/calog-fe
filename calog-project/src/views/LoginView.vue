<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  alert('짱우님, 로그인 되었습니다!');
};
</script>

<template>
  <div class="login-container">
    <img src="../assets/logo.png" alt="calog">
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="input-group">
        <label for="email">E-mail</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<style scoped>

img {
    width: 20%;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}

.input-group {
  width: 100%;
  margin-bottom: 1rem;
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
  font-size: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
}

.input-group input:focus {
  border-color: #43A5FF;
  box-shadow: 0 0 5px rgba(87, 160, 245, 0.3);
}

.login-button {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #43A5FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #43A5FF;
}

.login-button:active {
  background-color: #43A5FF;
}
</style>
