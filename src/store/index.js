import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //variables que estan vacias que van a hacer llenadas con las mutaciones
    usuario:null,
    error:null
  },
  mutations: {
    //recibe la informacion de la actions y cambian llenand el objeto usuario
    setUsuario(state,payload){
      state.usuario = payload
    },

    //recibe algun error de action 
    setError(state,payload){
      state.error = payload
    }
  },
  actions: {
    //metodo de firebase que recibe dos paramentros por eso se crea la variable usuario
    crearUsuario({commit},usuario){
      auth.createUserWithEmailAndPassword(usuario.email,usuario.password)
      //si funciona
        .then(res => {
          console.log(res)
          //se crea un usuario para recibir los objetos de firebase
          const usuarioCreado={
            email: res.user.email,
            uid : res.user.uid
          }
          //manda la informacion al metodo usuarioCreado
          commit('setUsuario',usuarioCreado)
        })
        //manda la informacion al metodo setError
        .catch(error =>{
          console.log(error)
          commit('setError',error)
        })

    }
  },
  modules: {
  }
})
