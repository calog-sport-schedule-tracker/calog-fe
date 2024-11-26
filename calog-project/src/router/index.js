import { createRouter, createWebHistory } from 'vue-router'
import CalendarView from '@/views/CalendarView.vue'
import ParticipationListView from '@/views/ParticipationListView.vue'
import LoginView from '@/views/LoginView.vue'
import JoinView from '@/views/JoinView.vue'
import ThumbnailView from '@/views/ThumbnailView.vue'
import EventRegistView from '@/views/EventRegistView.vue'
import ParticipationDetailView from '@/views/ParticipationDetailView.vue'
import ParticipationUpdateView from '@/views/ParticipationUpdateView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'thumbnail',
      component: ThumbnailView,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
    },
    {
      path: '/favorites',
      name: 'FavoriteCalendar',
      component: () => import('@/views/FavoriteCalendarView.vue')
    },
    

    {
      path: '/list',
      name: 'list',
      component: ParticipationListView,
      beforeEnter: (to, from, next) => {
        const uStore = useUserStore();
        if (!uStore.userId) {
          alert("로그인이 필요합니다.");
          next({ name: 'login' });
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const uStore = useUserStore();
        if (uStore.userId) {
          if (confirm("이미 로그인되어 있습니다. 로그아웃하시겠습니까?")) {
            // 사용자가 '확인'을 눌렀을 때
            alert("로그아웃되었습니다.");
            uStore.userId = null; // 실제 로그아웃 처리를 위해 userId를 null로 설정
            next({ name: 'login' }); // 로그인 페이지로 리다이렉트
          } else {
            // 사용자가 '취소'를 누른 경우, 현재 페이지에 그대로 머무름
            next(false); // false를 전달하여 현재의 네비게이션을 취소
          }
        } else {
          next(); // 로그인이 되어 있지 않은 경우, 로그인 페이지로 계속 진행
        }
      }
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView,
    },
    {
      path: '/eventRegist',
      name: 'eventRegist',
      component: EventRegistView,
    },
    {
      path: '/participation/:id',
      name: 'participationDetail',
      component: ParticipationDetailView,
    },
    {
      path: '/participation-update/:id',
      name: 'participationUpdate',
      component: ParticipationUpdateView,
    },
  ],
})

export default router
