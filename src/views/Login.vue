<template>
    <div>
        <h1>acceso de usuario</h1>
        <form @submit.prevent="ingresoUsuario({email:email, password:pass})">
            <input
             type="email" 
             placeholder="ingrese email"
             v-model="email"
            >
            <input
             type="password" 
             placeholder="ingrese contraseña"
             v-model="pass"
            >
            <button type="submit">Acceder</button>
        </form>
        <p>{{error}}</p>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'


export default {
    name:'Login',
    data() {
        return {
            email:'',
            pass: ''
        }
    },
    methods: {
        ...mapActions(['ingresoUsuario'])
    },
    computed: {
        ...mapState(['error'])
    },
}
</script>