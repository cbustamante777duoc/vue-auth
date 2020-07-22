import Vue from 'vue'
import VueRouter from 'vue-router'

import {auth} from '../firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/',
    name: 'Inicio',
    component: () => import(/* webpackChunkName: "inicio" */ '../views/Inicio.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//metodo que recore todas las rutas buscando rutas protegidas
router.beforeEach((to, from, next)=>{
  //pregunta si requiresAuth existe
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //verifica si existe un sesion abierta 
    const usuario = auth.currentUser

    console.log('usuario desde las rutas',usuario)

    //si no existe el usuario 
    if (!usuario) {
      //se manda a la ruta de login
      next({path:'/login'})
    }else{
      //si existe el usuario lo manda al inicio
      next()
    }
    
    

  }else{
    next()
  }
})

export default router
