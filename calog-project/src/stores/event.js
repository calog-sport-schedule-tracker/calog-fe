import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { defineStore } from "pinia";

const REST_API_URL = `http://localhost:8080//api/event`

export const useEventStore = defineStore('event', () => {
    const eventList = ref([])
    const getEventList = function () {
        axios({
          url: REST_API_URL,
          method: "get",
        })
          .then((response) => {
            console.log("getEvent 가져오기 완료!🔥");
            console.log("데이터 ⭐️ ", response.data);
            eventList.value = response.data;
          })
   
    }  
    return { eventList, getEventList };

})
  