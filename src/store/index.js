import Vue from "vue";
import Vuex from "vuex";
import { auth, db } from "../firebase";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    tareas: [],
    tarea: {nombre: '', id: ''}
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
    //recibe las tareas que llegan de la db
    setTareas(state, payload) {
      state.tareas = payload;
    },
    //metodo encargado de editar tarea
    setTarea(state, payload){
      state.tarea = payload
    },
    setEliminarTarea(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload)
    }
  },
  actions: {
    eliminarTarea({ commit, state }, id) {
      db.collection(state.usuario.email).doc(id).delete()
        .then(() => {
          commit('setEliminarTarea', id)
        })
        .catch(error => console.log(error))
    },
    agregarTarea({ commit, state }, nombreTarea) {
      db.collection(state.usuario.email).add({
        nombre: nombreTarea
      })
        .then(doc => {
          router.push({ name: 'Inicio' })
        })
        .catch(error => console.log(error))
    },

    getTarea({ commit, state }, id) {
      db.collection(state.usuario.email).doc(id).get()
        .then(doc => {
          let tarea = doc.data()
          tarea.id = doc.id
          commit('setTarea', tarea)
        })
        .catch(error => console.log(error))
    },

    editarTarea({ commit, state }, tarea) {
      db.collection(state.usuario.email).doc(tarea.id).update({
        nombre: tarea.nombre
      })
        .then(() => {
          router.push({ name: 'Inicio' })
        })
        .catch(error => console.log(error))
    },

    getTareas({ commit, state }) {
      const tareas = [];
      db.collection(state.usuario.email)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            console.log(doc.id);
            console.log(doc.data());
            let tarea = doc.data();
            tarea.id = doc.id;
            tareas.push(tarea);
          });
          commit("setTareas", tareas);
        });
    },

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

          db.collection(res.user.email)
            .add({
              nombre: "tarea de ejemplo",
            })
            .then((doc) => {
              //manda la informacion al metodo usuarioCreado
              commit("setUsuario", usuarioCreado);
              //luego que se agrega el usuario se manda a la ruta de inicio
              router.push("/");
            })
            .catch((error) => console.log(error));
        })
        //manda la informacion al metodo setError
        .catch((error) => {
          console.log(error);
          commit("setError", error);
        });
    },

    ingresoUsuario({ commit }, usuario) {
      auth
        .signInWithEmailAndPassword(usuario.email, usuario.password)
        .then((res) => {
          console.log(res);
          const usuario = {
            email: res.user.email,
            uid: res.user.uid,
          };
          commit("setUsuario", usuario);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          commit("setError", error);
        });
    },
    cerrarSesion({ commit }) {
      auth.signOut().then(() => {
        router.push("/login");
      });
    },
    detectarUsuario({ commit }, usuario) {
      commit("setUsuario", usuario);
    },
  },
  getters: {
    existeUsuario(state) {
      if (state.usuario === null) {
        //cuando NO exista un usuario retorna un false
        return false;
      } else {
        //cuando exista un usuario retorna un true
        return true;
      }
    },
  },
  modules: {},
});
