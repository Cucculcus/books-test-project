import { createRouter, createWebHistory } from 'vue-router'

import TheBoard from '@/views/TheBoard.vue'
import BookComponent from '@/components/BookComponent.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: TheBoard },
    { path: '/book/:id', name: 'BookComponent', component: BookComponent },
  ],
})

export default router
