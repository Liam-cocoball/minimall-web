import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeIndex from '@/views/HomeIndex.vue';
import HomeOrder from '@/views/HomeOrder.vue';
import HomeHelp from '@/views/HomeHelp.vue';
import MyLogin from '@/views/MyLogin.vue';
import MyRegister from '@/views/MyRegister.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeIndex,
  },
  {
    path: '/order',
    name: 'Order',
    component: HomeOrder,
  },
  {
    path: '/help',
    name: 'Help',
    component: HomeHelp,
  },
  {
    path: '/login',
    name: 'Login',
    component: MyLogin,
  },
  {
    path: '/register',
    name: 'Register',
    component: MyRegister,
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
