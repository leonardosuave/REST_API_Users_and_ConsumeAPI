<template>

  <div>

    <div class="columns is-centered">
      <div class="column is-half">

        <h1>Painel administrativo </h1>

        <table class="table">  
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{user.name}}</td>
              <td>{{user.email}}</td>
              <td v-if="user.role == 0">Usuário comum</td>
              <td v-else-if="user.role == 1">Admin</td>
              <td>
                <button class="button is-success">Editar</button> | 
                <button class="button is-danger" @click="showModalUser(user.id)">Deletar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!--Modal do bulma -->
        <div :class="{modal: true, 'is-active': showModal}">
          <div class="modal-background"></div>
            <div class="modal-content">
              
              <!--Card do bulma. Dentro do Modal pode add qualquer coisa-->
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    Você quer realmente deletar este usuário?
                  </p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <p>Bla Bla Bla</p>
                  </div>
                </div>
                <footer class="card-footer">
                  <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                  <a href="#" class="card-footer-item" @click="deleteUser()">Sim, quero deletar!</a>
                </footer>
              </div>

            </div>
          <button class="modal-close is-large" aria-label="close" @click="hideModal"></button>
        </div>

      </div> 
    </div>  

  </div>
  
</template>

<script>
import axios from 'axios'

export default {
    //Created é o primeiro método chamado na aplicação
    created() {

      //Devido a rota trabalhar com o middleware de autenticação de token de acesso
        const req = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('http://localhost:3333/users',req).then(res => {
            console.log(res)
            this.users = res.data    

        }).catch(err => {
            console.log(err)
        })
    },

    //Cria variáveis utilizadas em outras funções e métodos com this.
    data() {
        return {
            users: [],
            showModal: false,
            deleteUserId: -1 // pq n existe id de usuário -1, ent define como padrão
        }
    },

    //Métodos para interação com modal e deleção de usuários
    methods: {
      hideModal() {
        this.showModal = false        
      },
      showModalUser(id) {
        this.deleteUserId = id
        this.showModal = true
      },
      deleteUser() {

        //cabeçalho de requisição
        const req = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        axios.delete(`http://localhost:3333/user/${this.deleteUserId}`,req).then(res => {
          console.log(res)
          this.showModal = false

          //Refaz a requisição de importar os usuários cadastrados e atualiza a página 
          axios.get('http://localhost:3333/users',req).then(res => {
            console.log(res)
            this.users = res.data    

          }).catch(err => {
            console.log(err)
          })

          //Método de atualização mais rápido
          // window.location.reload()

        }).catch(err => {
          console.log(err)
          this.showModal = false
        })
      }
    }
}
</script>

<style>

</style>