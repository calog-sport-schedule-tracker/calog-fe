import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { defineStore } from "pinia";

const API_URL = "http://localhost:8080/api/user"; // API 기본 URL

export const useUserStore = defineStore("user", () => {
const userId = ref(null);
const nickname = ref(null); // 닉네임

  // 1. 로그인
  const login = (id, password) => {
    axios
      .post(`${API_URL}/login`, { userId: id, userPw: password })
        .then((response) => {
            console.log("response.data", response.data);
            const { id: userIdFromResponse, nickname: userNickname } = response.data;

            // 상태 업데이트
            userId.value = userIdFromResponse; // ref로 선언된 id 업데이트
            nickname.value = userNickname;

            // 로그인 성공 메시지
            alert(`${userNickname}님, 반갑습니다!`);

            // 캘린더 페이지로 이동
            router.push({ name: "calendar" });
        })
        .catch((error) => {
            const errorMessage = error.response?.data?.message || "로그인 실패";
            alert(`로그인 실패: ${errorMessage}`);
            console.error("로그인 오류:", error);
        });
  };

  return {
    userId,
    nickname,
    login,
  };
});
