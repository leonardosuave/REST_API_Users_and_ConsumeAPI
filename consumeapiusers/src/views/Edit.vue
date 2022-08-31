<template>
  <div>
    <h2>Edição de usuário</h2>
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
            <input class="input" type="text" placeholder="email@email.com" v-model="email">
        
            <hr>
            <button class="button is-success" @click="update">Editar</button>
        </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {

    created() {
        //cabeçalho de requisição
        const req = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        //Consumo da api que importa os dados do usuário a ser editado
        axios.get(`http://localhost:3333/user/${this.$route.params.id}`, req).then(res => {
            console.log(res)
            this.name = res.data.name
            this.email = res.data.email
            this.id = res.data.id

        }).catch(err => {
            console.log(err.response.data.erro)
            this.$router.push({name: 'Users'})
        })
    },

    //Métodos
    data(){
        return {
            //Fazer um biding como v-model nos campos input e passar essas var
            name: '',
            email: '',
            id: -1,
            nameEdit: '',
            emailEdit: '',

            //Vai receber msg de erro caso exista
            error: undefined  
        }
    },
    methods: {
        update(){

            //cabeçalho de requisição
            const req = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }            

            axios.put('http://localhost:3333/user',{
                name: this.name,
                email:this.email,
                id: this.id
            }, req).then(res => {
                console.log(res) //Apenas para não dar erro de pag por não utilizar o res.
                this.$router.push({name: 'Users'})
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