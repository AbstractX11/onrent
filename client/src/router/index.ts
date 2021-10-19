import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Pages/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: () => import('../views/Pages/Vehicles.vue') 
  },
  {
    path: '/houses',
    name: 'Houses',
    component:() => import('../views/Pages/Houses.vue') 
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import('../views/Pages/Rooms.vue') 
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
    component: () => import('../views/Pages/Electronics.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:() => import('../views/Users/login-route.vue') 
  },
  {
    path:'/signup',
    name:'Signup',
    component:() => import('../views/Users/signup-route.vue') 
  },
  {
    path:'/profile/:id',
    name:'Profile',
    component:() => import('../views/Profile.vue') 
  },
  {
    path:'/:type/product/:productid',
    name:'Product',
    component:() => import('../views/singleProduct.vue') 
  }
  //error404
  ,{
    path:'/:catchAll(.*)',
    name:'notFound',
    component:()=>import('../views/Errors/notFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
