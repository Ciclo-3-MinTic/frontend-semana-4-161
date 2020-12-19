<template>
  <login-base
  @login='login'
  > </login-base>
</template>

<script>
import LoginBase from "../components/LoginBase.vue";
import axios from 'axios';
export default {
  name: "LoginAdmin",
  administrador:{
    email: 'admin@gmail.com',
    password: 'admin1234'

  },
  components: {
    LoginBase,
  },

   methods:{
        login(user, pass){
            
            axios.post('usuario/login',{email: user, password: pass})
            .then(respuesta =>{
                return respuesta.data;
            })
            .then(data =>{
                this.$store.dispatch("guardarToken",data.tokenReturn);
                this.$router.push({name: 'HomeAdmin'});
            })
            .catch(error =>{
                this.errorM=null;
                console.log(error.response.status);
                if (error.response.status==401){
                    
                    this.errorM='credenciales son incorrectas.';
                } 
                else if (error.response.status==404){
                    this.errorM='el usuario no existe';
                }
                else{
                    this.errorM='Ocurrió un error con el servidor.';
                }
            });
        }
    }
};
</script>


<style>
</style>