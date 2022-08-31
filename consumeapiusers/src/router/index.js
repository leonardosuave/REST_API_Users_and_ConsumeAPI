import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import axios from 'axios'

function AdminAuth(to, from, next) {

  //Essa lógica pode ser burlada pelo console do nav, podendo setar qualquer valor no token do localstorage e entao entrar no sistema sem ter conta com permissão.
  if(localStorage.getItem('token') != undefined){

    const req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    console.log(req)

    //Quando for post deve passar um dado -> {} antes do req
    axios.post('http://localhost:3333/validate', {}, req).then(res => {
      console.log(res)
      next()
    }).catch(err => {

      //Mensagem de erro caso não tenha permissão de acesso.
      console.log(err.response.data)
      next('/login')
    })
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
