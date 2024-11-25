<template>
    <div class="chart-container">
    <PolarArea :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";
import { PolarArea } from "vue-chartjs";
import { useUserStore } from "@/stores/user";
import axios from "axios";

const uStore = useUserStore();

console.log("uStore.userId: ", uStore.userId); //도착 잘함


Chart.register(...registerables);
  

const chartData = ref({
    labels: ["마라톤", "테니스", "배드민턴", "그랑폰도", "철인3종"],
    datasets: [
      {
        label: "참여 수",
        data: [0, 0, 0, 0, 0], // 초기값
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
});
  
 
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}회`;
          },
        },
      },
    },
  };
  
 

  const fetchParticipationData = () => {
  console.log("Received userId:", uStore.userId); // userId 확인

  // 마라톤
  axios.get(`http://localhost:8080/api/user/${uStore.userId}/participation/marathon`)
    .then((response) => {
      console.log("Marathon participation count:", response.data);
      chartData.value.datasets[0].data[0] = response.data; // 마라톤 데이터 설정
    })
    .catch((error) => {
      console.error("Error fetching marathon data:", error);
    });

//   // 테니스
  axios.get(`http://localhost:8080/api/user/${uStore.userId}/participation/tennis`)
    .then((response) => {
      console.log("Tennis participation count:", response.data);
      chartData.value.datasets[0].data[1] = response.data; // 테니스 데이터 설정
    })
    .catch((error) => {
      console.error("Error fetching tennis data:", error);
    });

//   // 배드민턴
  axios.get(`http://localhost:8080/api/user/${uStore.userId}/participation/badminton`)
    .then((response) => {
      console.log("Badminton participation count:", response.data);
      chartData.value.datasets[0].data[2] = response.data; // 배드민턴 데이터 설정
    })
    .catch((error) => {
      console.error("Error fetching badminton data:", error);
    });

//   // 그랑폰도
  axios.get(`http://localhost:8080/api/user/${uStore.userId}/participation/granfondo`)
    .then((response) => {
      console.log("Granfondo participation count:", response.data);
      chartData.value.datasets[0].data[3] = response.data; // 그랑폰도 데이터 설정
    })
    .catch((error) => {
      console.error("Error fetching granfondo data:", error);
    });

//   // 철인3종
  axios.get(`http://localhost:8080/api/user/${uStore.userId}/participation/triathlon`)
    .then((response) => {
      console.log("Triathlon participation count:", response.data);
      chartData.value.datasets[0].data[4] = response.data; // 철인3종 데이터 설정
    })
    .catch((error) => {
      console.error("Error fetching triathlon data:", error);
    });

  console.log("Updated chartData:", chartData.value.datasets[0].data); // 차트 데이터 확인
};
onMounted(() => {
fetchParticipationData();
});
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
  }
  </style>
  