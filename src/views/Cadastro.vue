<template>
  <div class="container">
    <div class="login">
      <div class="inputs">
        <h2>Cadastro</h2>
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="senha" placeholder="Senha" />
      </div>
      <div class="botao">
        <button>Cadastrar</button>
        <!-- <a href>
          <span>Esqueci a senha</span>
        </a> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
export default class Login extends Vue{
    public email = '';
    public senha = '';

    Cadastrar(email: string, senha: string){
        if(email != '' && senha != ''){
            console.log(email, senha);
        }else{
            console.log('Algo deu errado');
        }
    }
}
</script>

<style scoped>
button, input {
  outline-style: none;
}
.container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20vh;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid black;
  height: auto;
  padding: 10px;
}

.inputs {
  display: flex;
  flex-direction: column;
}

.inputs > input {
  width: 500px;
  height: 30px;
}

.inputs > input:nth-child(3) {
  margin-top: 10px;
}

.botao {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.botao > button {
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
  border-style: none;
  color: rgb(0, 0, 0);
  background-color: rgb(240, 240, 240);
  border-radius: 7px;
  cursor: pointer;
}

.botao > button:hover {
  background-color: rgb(230, 230, 230);
  transition: background-color 100ms ease-in;
}

.botao > button:active {
  background-color: rgb(220, 220, 220);
  transition: background-color 10ms ease-in;
}

.botao > a {
  text-decoration: none;
  color: rgb(0, 0, 0);
}
</style>