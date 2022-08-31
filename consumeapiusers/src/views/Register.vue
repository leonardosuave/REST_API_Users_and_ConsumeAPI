<template>
  <div>
    <h2>Registro de usuários</h2>
    <hr>

    <!--Para centralizar o campo do input através de colunas do bulma-->
    <div class="columns is-centered">
        <div class="column is-half">

            <!--Para exibir msg de erro do registro-->
            <div v-if="error != undefined">
                <div class="notification is-danger">
                    <p>{{error}}</p>
                </div>
            </div>

            <p>Nome</p>
            <input class="input" type="text" placeholder="Nome do usuário" v-model="name"><br>
            <p>Email</p>
            <input class="input" type="text" placeholder="email@email.com" v-model="email"><br>
            <p>Senha</p>
            <input class="input" type="text" placeholder="******" v-model="password"><br>
            <hr>
            <button class="button is-success" @click="register">Cadastrar</button>
        </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
    //Métodos
    data(){
        return {
            //Fazer um biding como v-model nos campos input e passar essas var
            name: '',
            password: '',
            email: '',

            //Vai receber msg de erro caso exista
            error: undefined
            
        }
    },
    methods: {
        register(){
            axios.post('http://localhost:3333/user', {
                name: this.name,
                password: this.password,
                email:this.email
            }).then(res => {
                console.log(res) //Apenas para não dar erro de pag por não utilizar o res.
                this.$router.push({name: 'Home'})
            }).catch(err => {
                //Para capturar a msg de erro
                const msgErro = err.response.data.erro
                this.error = msgErro
            })
        }
    }    

}
</script>

<style>

</style>