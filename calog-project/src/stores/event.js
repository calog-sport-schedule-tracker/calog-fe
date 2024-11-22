import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { defineStore } from "pinia";

const REST_API_URL = `http://localhost:8080/api/event`

export const useEventStore = defineStore('event', () => {
    const eventList = ref([])
    // const getEventList = function() {
    //     axios({
    //         url: REST_API_URL,
    //         method: 'get',
    //     })
    //         .then((response)=> {
    //             console.log("getEvent 가져오기 완료!")
    //             console.log(response.data);
    //             eventList.value = response.data;
    //         })
            
    //         .catch(error=> {
    //             console.log("getEventList에서 error 발생");
    //         })
    // }
    const getEventById = function(id) {
        axios({
            url: REST_API_URL,
            method: 'get'
        })
            .then((response)=> {
                console.log("eventId로 event정보 가져오기 성공");
            })
            .catch((response)=>{
                console.log("eventId로 event 정보 가져오기 실패");
            })
    }

    return { eventList, getEventById }
  })
  