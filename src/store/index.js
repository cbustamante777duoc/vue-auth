import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../firebase";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
  },
  mutations: {
    //recibe la informacion de la actions y cambian llenand el objeto usuario
    setUsuario(state, payload) {
      state.usuario = payload;
    },

    //recibe algun error de action
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    //metodo de firebase que recibe dos paramentros por eso se crea la variable usuario
    crearUsuario({ commit }, usuario) {
      auth
        .createUserWithEmailAndPassword(usuario.email, usuario.password)
        //si funciona
        .then((res) => {
          console.log(res);
          //se crea un usuario para recibir los objetos de firebase
          const usuarioCreado = {
            email: res.user.email,
            uid: res.user.uid,
          };
          //manda la informacion al metodo usuarioCreado
          commit("setUsuario", usuarioCreado);
          //luego que se agrega el usuario se manda a la ruta de inicio
          router.push("/");
        })
        //manda la informacion al metodo setError
        .catch((error) => {
          console.log(error);
          commit("setError", error);
        });
    },
    ingresoUsuario({ commit }, usuario) {
      auth.signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(res => {
          console.log(res)
          const usuario = {
              email: res.user.email,
              uid: res.user.uid
          }
          commit('setUsuario', usuario)
          router.push('/')
        })
        .catch((error) => {
          console.log(error);
          commit("setError", error);
        })
    },
    cerrarSesion({commit}){
      auth.signOut()
        .then(()=>{
          router.push('/login')
        })
    },
    detectarUsuario({commit}, usuario){
      commit('setUsuario',usuario)
    }
  },
  getters:{
    existeUsuario(state){
      if (state.usuario === null) {
        //cuando NO exista un usuario retorna un false
        return false
        
      } else {
        //cuando exista un usuario retorna un true
        return true
        
      }
    }
  },
  modules: {},
});
