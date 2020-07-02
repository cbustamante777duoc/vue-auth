<template>
    <div>
        <h1>registro de usuarios</h1>
        <form @submit.prevent="crearUsuario({email:email, password:pass1})" >
            <input type="email"
             placeholder="ingrese su correo"
             v-model="email"
             >
             <input type="password"
             placeholder="ingrese su contraseña"
             v-model="pass1"
             >
             <input type="password"
             placeholder="ingrese su nuevamente "
             v-model="pass2"
             >
             <button type="submit" :disabled="!desactivar">Registra usuario</button>
        </form>
        <p>{{error}}</p>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    name:'Registro',
    data() {
        return {
            email:'',
            pass1:'',
            pass2:''
        }
    },
    created(){

    },
    methods:{
        ...mapActions(['crearUsuario'])
    },
    computed:{
        ...mapState(['error']),
        //metodo que desactiva el formulario si no son iguales los parametros
        desactivar(){
            return this.pass1 === this.pass2 && this.pass1.trim() !== ''
        }
    }
}
</script>