import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../components/auth/auth'
import Home from '../components/home'
import { AuthHelper } from '../helpers/auth-helper';


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter : AuthHelper.authenticate
    }
  ]
})

export default router
