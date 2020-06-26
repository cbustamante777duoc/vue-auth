<template>
    <div>
        <h1>registro de usuarios</h1>
        <form >
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
             <button type="submit">Registra usuario</button>
        </form>
    </div>
</template>

<script>
export default {
    name:'Registro',
    data() {
        return {
            email:'',
            pass1:'',
            pass2:''
        }
    },
}
</script>