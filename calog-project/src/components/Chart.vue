<template>
    <div class="chart-container">
      <PolarArea :data="chartData" :options="chartOptions" :key="chartKey" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { Chart, registerables } from "chart.js";
  import { PolarArea } from "vue-chartjs";
  import { useUserStore } from "@/stores/user";
  import axios from "axios";
  
  const uStore = useUserStore();
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
  
  
  const chartKey = ref(0);
  
  
  const updateChart = async () => {
    try {
      const urls = [
        `http://localhost:8080/api/user/${uStore.userId}/participation/marathon`,
        `http://localhost:8080/api/user/${uStore.userId}/participation/tennis`,
        `http://localhost:8080/api/user/${uStore.userId}/participation/badminton`,
        `http://localhost:8080/api/user/${uStore.userId}/participation/granfondo`,
        `http://localhost:8080/api/user/${uStore.userId}/participation/triathlon`,
      ];
  
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
  
    //차트 값 변경 업데이트
      chartData.value.datasets[0].data = responses.map((response) => response.data);
  
      // 다시 렌더링하기 위해 key 값 변경
      chartKey.value += 1;
  
      
    } catch (error) {
      console.error("에러", error);
    }
  };
  
  onMounted(() => {
    updateChart();
  });
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
  }
  </style>
  