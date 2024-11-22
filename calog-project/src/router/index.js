import { createRouter, createWebHistory } from 'vue-router'
import CalendarView from '@/views/CalendarView.vue'
import EventDetailView from '@/views/EventDetailView.vue'
import ParticipationListView from '@/views/ParticipationListView.vue'
import LoginView from '@/views/LoginView.vue'
import JoinView from '@/views/JoinView.vue'
import ThumbnailView from '@/views/ThumbnailView.vue'
import EventRegistView from '@/views/EventRegistView.vue'

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
      path: '/detail',
      name: 'detail',
      component: EventDetailView,
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
  ],
})

export default router
