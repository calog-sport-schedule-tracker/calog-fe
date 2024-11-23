import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { defineStore } from "pinia";

const REST_API_URL = `http://localhost:8080/api/user/1/participation`
const EVENT_URL =  `http://localhost:8080/api/event`

export const useParticipationStore = defineStore('participation', () => {
    // 1. 조회
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

      // 2. 참가대회 등록(Regist)
      const registParticipation = function(participation) {
        axios({
          url: `http://localhost:8080/api/participation`,
          method: 'post',
          data: participation
        })
          .then(()=> {
            console.log("참가대회 등록 완료!");
            router.push({name: 'list'});
          })
          .catch(()=> {
            console.log("참가대회 등록 실패 😞");
          })
      }

      const participationDetail = ref({});
      // 3. 대회 상세 보기
      const getParticipationDetail = function(id) {

        axios({
          url: `${REST_API_URL}/${id}`,
          method: "get",
        })
          .then((response) => {
            console.log("참여 상세 정보 가져오기 성공! 🔥");
            // console.log("참여 정보:", response.data);
      
            // participationDetail 업데이트 및 eventId 추출
            participationDetail.value = response.data;
            const eventId = response.data.eventId;
      
            if (!eventId) {
              console.error("eventId가 존재하지 않습니다.");
              return;
            }

                // 2. eventId를 기반으로 이벤트 상세 정보 가져오기
            return axios.get(`${EVENT_URL}/${eventId}`);
            })
            .then((eventResponse) => {
              console.log("이벤트 상세 정보 가져오기 성공! 🙂");

              // 이벤트 상세 정보를 포맷팅 및 병합
              const eventData = eventResponse.data;

              const isoDate = eventData.eventDate;
              const dateObj = new Date(isoDate);
              const formattedDate = `${dateObj.getFullYear()}-${String(
                dateObj.getMonth() + 1
              ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;

              participationDetail.value = {
                ...participationDetail.value,
                eventDate: formattedDate,
                eventName: eventData.eventName,
                sport: eventData.sport,
                city: eventData.city,
              };

              console.log("병합된 참여 상세 정보: ", participationDetail.value);
            })
            .catch((error) => {
              console.error("데이터 로드 실패 😞", error);
            })
        };
    //         axios({
    //           url: `${REST_API_URL}/${eventId}`,
    //           method: 'get',
    //         })
    //         .then((response) =>            
    //           participationDetail.value = {
    //           ...response.data, // 기존 참여 정보
    //           eventDate: null,
    //           eventName: null,
    //           sport: null,
    //         })
            
    //   // eventId로 이벤트 상세 정보 가져오기
    //       axios({
    //         url: `${EVENT_URL}/${eventId}`,
    //         method: "get",
    //       })
    //         .then((eventResponse) => {
    //           console.log("이벤트 상세 정보 가져오기 성공! 🙂");
    //           // console.log("이벤트 정보:", eventResponse.data);

    //           const eventData = eventResponse.data;

    //           // 날짜 포맷팅
    //           const isoDate = eventData.eventDate;
    //           const dateObj = new Date(isoDate);
    //           const formattedDate = `${dateObj.getFullYear()}-${String(
    //             dateObj.getMonth() + 1
    //           ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;

    //           // participationDetail에 이벤트 데이터 병합
    //           participationDetail.value = {
    //             ...participationDetail.value,
    //             eventDate: formattedDate,
    //             eventName: eventData.eventName,
    //             sport: eventData.sport,
    //             city: eventData.city,
    //           };

    //           console.log("병합된 참여 상세 정보: ", participationDetail.value);
              
    //         })
    //         .catch((error) => {
    //           console.error("이벤트 상세 정보 가져오기 실패 😞", error);
    //         });
    //     })
    //     .catch((error) => {
    //       console.error("참여 상세 정보 가져오기 실패 😞", error);
    //     });
    // };

    const participation = ref({});

    return { participationList, getParticipationList, registParticipation, participation, participationDetail, getParticipationDetail  }
  })
  