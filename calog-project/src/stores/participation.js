import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { defineStore } from "pinia";

const REST_API_URL = `http://localhost:8080/api/user/1/participation`
const EVENT_URL =  `http://localhost:8080/api/event`

export const useParticipationStore = defineStore('participation', () => {
    const participationList = ref([])
    const getParticipationList = function () {
        axios({
          url: REST_API_URL,
          method: "get",
        })
          .then((response) => {
            console.log("getParticipation 가져오기 완료!🔥");
            // console.log(response.data);

            // participationList 초기화 시 기본값 추가
            participationList.value = response.data.map((item) => ({
                ...item,
                eventDate: null,
                eventName: null,
                // detail: null,
                city: null,
                sport: null,
            }));

            // 각 participation에 대해 이벤트 데이터 추가 요청
            participationList.value.forEach((participation, index) => {
              axios({
                url: `${EVENT_URL}/${participation.eventId}`,
                method: "get",
              })
                .then((eventResponse) => {
                    console.log("event 정보도 추가됨! 🙂");
                    console.log(eventResponse.data);
                    
                    // 날짜 깔끔하게 처리하기 위함
                    const isoDate = eventResponse.data.eventDate;
                    const dateObj = new Date(isoDate);
                    const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

                    // participation에 이벤트 정보 병합
                    participationList.value[index] = {
                        ...participation,
                        sport: eventResponse.data.sport,
                        eventDate: formattedDate,
                        eventName: eventResponse.data.eventName,
                        // detail: eventResponse.data.detail,
                        city: eventResponse.data.city,
                    };
                    console.log(participationList.value)
                
                })
                .catch((error) => {
                  console.log(
                    `이벤트 정보 추가안됨. - eventId: ${participation.eventId}`
                  );
                });
            });
          })
          .catch((error) => {
            console.log("getParticipationList에서 error 발생", error);
          });
      };

    return { participationList, getParticipationList }
  })
  