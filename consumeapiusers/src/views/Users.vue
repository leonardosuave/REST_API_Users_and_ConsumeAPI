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
                <button class="button is-danger">Deletar</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div> 
    </div>  

  </div>
  
</template>

<script>
import axios from 'axios'

export default {
    //Created é o primeiro método chamado na aplicação
    created() {
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
        console.log('Olá')
    },

    data() {
        return {
            users: []    
        }
    }
}
</script>

<style>

</style>