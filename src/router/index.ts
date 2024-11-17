import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeIndex from '@/views/HomeIndex.vue';
import HomeOrder from '@/views/HomeOrder.vue';
import HomeHelp from '@/views/HomeHelp.vue';
import MyLogin from '@/views/MyLogin.vue';
import MyRegister from '@/views/MyRegister.vue';
import MyCenter from '@/views/MyCenter.vue';
import GoodsDetails from '@/views/GoodsDetails.vue';
import HomeGoods from '@/views/HomeGoods.vue';
import GoodsList from '@/views/GoodsList.vue';
import PlayDetails from '@/views/PlayDetails.vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/home/home-goods'
  // },
  {
    path: '/',
    name: 'Home',
    component: HomeIndex,
    children: [
      {
        path: 'home-goods',
        name: 'HomeGoods',
        component: HomeGoods,
      },
      {
        path: 'goods-list/:id',
        name: 'GoodsList',
        component: GoodsList,
      }
    ]
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
  {
    path: '/my-center',
    name: 'MyCenter',
    component: MyCenter,
  },
  {
    path: '/goods-details/:id',
    name: 'GoodsDetails',
    component: GoodsDetails,
  },
  {
    path: '/play-details/:orderNumber',
    name: 'PlayDetails',
    component: PlayDetails,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
