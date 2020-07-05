<template>
  <div class="container">
    <div class="login">
      <div class="inputs">
        <h2>Login</h2>
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="senha" placeholder="Senha" />
      </div>
      <div class="botao">
        <button @click="Logar(email, senha)">Login</button>
        <div class="links">
          <!-- <router-link to="/redefinirsenha">Esqueci a senha | </router-link> -->
          <a href="/redefinirsenha">Esqueci a senha | </a>
          <a href="/cadastro">Cadastre-se</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
export default class Login extends Vue {
  public email = "";
  public senha = "";

  Logar(email: string, senha: string) {
    console.log(email, senha);
  }
}
</script>

<style scoped>
button,
input {
  outline-style: none;
}
a{
    text-decoration: none;
}
.container {
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
  align-items: center;
}

.inputs > input {
  width: 500px;
  height: 30px;
}

.inputs > input:nth-child(3) {
  margin-top: 10px;
}

.links > a {
  color: rgb(0, 0, 0);
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
</style>