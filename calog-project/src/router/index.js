import { createRouter, createWebHistory } from 'vue-router'
import CalendarView from '@/views/CalendarView.vue'
import EventDetailView from '@/views/EventDetailView.vue'
import ParticipationListView from '@/views/ParticipationListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
})

export default router
