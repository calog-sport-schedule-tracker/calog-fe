import { createRouter, createWebHistory } from 'vue-router'
import CalendarView from '@/views/CalendarView.vue'
import ParticipationListView from '@/views/ParticipationListView.vue'
import LoginView from '@/views/LoginView.vue'
import JoinView from '@/views/JoinView.vue'
import ThumbnailView from '@/views/ThumbnailView.vue'
import EventRegistView from '@/views/EventRegistView.vue'
import ParticipationDetailView from '@/views/ParticipationDetailView.vue'
import ParticipationUpdateView from '@/views/ParticipationUpdateView.vue'

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
        path: '/list',
        name: 'list',
        component: ParticipationListView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
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
