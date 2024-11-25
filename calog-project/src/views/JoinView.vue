<script setup>
import { ref } from 'vue';

const nickname = ref('');
const id = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match. Please try again.');
    return;
  }
  alert(`Welcome, ${nickname.value}! Your account has been registered.`);
};
</script>

<template>
  <div class="register-container">
    <img src="../assets/logo.png" alt="calog" />
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="input-group">
        <label for="nickname">Nickname</label>
        <input v-model="nickname" type="text" id="nickname" required />
      </div>
      <div class="input-group">
        <label for="email">id</label>
        <input v-model="id" type="text" id="id" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <div class="input-group">
        <label for="confirm-password">Confirm Password</label>
        <input v-model="confirmPassword" type="password" id="confirm-password" required />
      </div>
      <button type="submit" class="register-button">Join</button>
    </form>
  </div>
</template>

<style scoped>
img {
  width: 20%;
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.register-form {
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
  border-color: #43a5ff;
  box-shadow: 0 0 5px rgba(67, 165, 255, 0.3);
}

.register-button {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #43a5ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #258ef0;
}

.register-button:active {
  background-color: #0373db;
}
</style>