import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { defineStore } from "pinia";

const REST_API_URL = `http://localhost:8080/api/user/1/participation`;
const EVENT_URL = `http://localhost:8080/api/event`;

export const useParticipationStore = defineStore("participation", () => {
  const participationList = ref([]);
  const participationDetail = ref({});
  const participation = ref({});

  // 1. 기본 참여 리스트 조회
  const getParticipationList = function () {
    axios({
      url: REST_API_URL,
      method: "get",
    })
      .then((response) => {
        console.log("getParticipation 가져오기 완료!🔥");

        participationList.value = response.data.map((item) => ({
          ...item,
          eventDate: null,
          eventName: null,
          city: null,
          sport: null,
        }));

        // 각 참여 데이터에 이벤트 데이터 병합
        participationList.value.forEach((participation, index) => {
          axios({
            url: `${EVENT_URL}/${participation.eventId}`,
            method: "get",
          })
            .then((eventResponse) => {
              console.log("event 정보도 추가됨! 🙂");
              const isoDate = eventResponse.data.eventDate;
              const dateObj = new Date(isoDate);
              const formattedDate = `${dateObj.getFullYear()}-${String(
                dateObj.getMonth() + 1
              ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;

              participationList.value[index] = {
                ...participation,
                sport: eventResponse.data.sport,
                eventDate: formattedDate,
                eventName: eventResponse.data.eventName,
                city: eventResponse.data.city,
              };
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

  /// 2. 필터링된 참여 리스트 조회
const fetchFilteredParticipationList = function (filters) {
  const { city, sport, eventDate } = filters;
  const cityParam = city ? `city=${city}` : "";
  const sportParam = sport ? `sport=${sport}` : "";
  const dateParam = eventDate ? `eventDate=${eventDate}` : "";

  let url = REST_API_URL;

  if (cityParam && sportParam && dateParam) {
    url = `${REST_API_URL}/sportDateCity?${sportParam}&${dateParam}&${cityParam}`;
  } else if (cityParam && sportParam) {
    url = `${REST_API_URL}/sportCity?${sportParam}&${cityParam}`;
  } else if (cityParam && dateParam) {
    url = `${REST_API_URL}/dateCity?${dateParam}&${cityParam}`;
  } else if (sportParam && dateParam) {
    url = `${REST_API_URL}/sportDate?${sportParam}&${dateParam}`;
  } else if (cityParam) {
    url = `${REST_API_URL}/city?${cityParam}`;
  } else if (sportParam) {
    url = `${REST_API_URL}/sport?${sportParam}`;
  } else if (dateParam) {
    url = `${REST_API_URL}/date?${dateParam}`;
  }

  axios
    .get(url)
    .then((response) => {
      console.log("필터링된 데이터 가져오기 성공! 🔥");

      // participationList 초기화 및 이벤트 정보 병합 준비
      participationList.value = response.data;

      const promises = participationList.value.map((participation, index) => {
        // eventId를 기반으로 이벤트 데이터 요청
        return axios
          .get(`${EVENT_URL}/${participation.eventId}`)
          .then((eventResponse) => {
            const isoDate = eventResponse.data.eventDate;
            const dateObj = new Date(isoDate);
            const formattedDate = `${dateObj.getFullYear()}-${String(
              dateObj.getMonth() + 1
            ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;

            // 이벤트 데이터 병합
            participationList.value[index] = {
              ...participation,
              sport: eventResponse.data.sport,
              eventDate: formattedDate,
              eventName: eventResponse.data.eventName,
              city: eventResponse.data.city,
            };
          })
          .catch((error) => {
            console.log(
              `이벤트 정보 추가 실패 - eventId: ${participation.eventId}`
            );
          });
      });

      // 모든 이벤트 정보 병합이 완료된 후 콘솔 출력
      Promise.all(promises).then(() => {
        console.log("병합된 participationList: ", participationList.value);
      });
    })
    .catch((error) => {
      console.log("필터링된 참여 리스트 가져오기 실패 😞", error);
    });
  };


  // 3. 참가 대회 등록
  const registParticipation = function (participation) {
    axios({
      url: `http://localhost:8080/api/participation`,
      method: "post",
      data: participation,
    })
      .then(() => {
        console.log("참가대회 등록 완료!");
        router.push({ name: "list" });
      })
      .catch(() => {
        console.log("참가대회 등록 실패 😞");
      });
  };

  // 4. 대회 상세 정보 조회
  const getParticipationDetail = function (id) {
    axios({
      url: `${REST_API_URL}/${id}`,
      method: "get",
    })
      .then((response) => {
        console.log("참여 상세 정보 가져오기 성공! 🔥");

        participationDetail.value = response.data;
        const eventId = response.data.eventId;

        if (!eventId) {
          console.error("eventId가 존재하지 않습니다.");
          return;
        }

        return axios.get(`${EVENT_URL}/${eventId}`);
      })
      .then((eventResponse) => {
        console.log("이벤트 상세 정보 가져오기 성공! 🙂");

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
        console.error("참여 상세 정보 가져오기 실패 😞", error);
      });
  };

  return {
    participationList,
    getParticipationList,
    fetchFilteredParticipationList,
    registParticipation,
    participation,
    participationDetail,
    getParticipationDetail,
  };
});
