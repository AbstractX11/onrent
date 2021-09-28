import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: () => import('../views/Vehicles.vue') 
  },
  {
    path: '/houses',
    name: 'Houses',
    component:() => import('../views/Houses.vue') 
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import('../views/Rooms.vue') 
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue') 
  },
  {
    path: '/electronics',
    name: 'Electronics',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Electronics.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:() => import('../views/Login.vue') 
  },
  {
    path:'/signup',
    name:'Signup',
    component:() => import('../views/Signup.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

<<<<<<< HEAD
=======

>>>>>>> d7756c4 (little fixes)
export default router
