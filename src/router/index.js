import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=> import('views/Home/Home')
const Fenlei=()=> import('views/Fenlei/Fenlei')
const Cart=()=> import('views/Cart/Cart')
const Profile=()=> import('views/Profile/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/fenlei',
    component:Fenlei
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
