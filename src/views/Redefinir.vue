<template>
  <!-- <div class="container">
    <div class="login">
      <div class="inputs">
        <h2>Login</h2>
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="senha" placeholder="Senha" />
      </div>
      <div class="botao">
        <button @click="Logar(email, senha)">Login</button>
        <div class="links">
          <router-link to="/redefinirsenha">Esqueci a senha | </router-link>
          <a href="/redefinirsenha">Esqueci a senha | </a>
          <a href="/cadastro">Cadastre-se</a>
        </div>
      </div>
    </div>
  </div>-->
  <v-container class="fill-height fundo" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="centerAll elevation-12" width="50vw">
          <v-card-title>
            <span class="horizontalCenter">
              <strong>Redefinir senha</strong>
            </span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-col sm="12" md="12" lg="12" cl="12">
                <v-text-field
                  type="text"
                  v-model="email"
                  outlined
                  dense
                  label="Email"
                  append-icon="mdi-email"
                  :rules="[rules.email]"
                ></v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  outlined
                  dense
                  label="Senha"
                  append-icon="mdi-form-textbox-password"
                  :disabled="!SecondStep"
                  :rules="[rules.senha]"
                ></v-text-field>
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large @click="Recuperar()">Recuperar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserService from "../core/services/UserService/UserService";

@Component
export default class Login extends Vue {
  public email = "";
  public password = "";
  public id = 0;
  public SecondStep = false;

  public valid = true;
  public rules = {
    email(email: string) {
      if (email == "") return "Campo requerido.";
      if (email.length < 10) return "Tamanho inválido.";

      return true;
    },
    senha(senha: string) {
      if (senha.length == 0) return "Campo requerido";
      if (senha.length < 3) return "Tamanho mínimo deve ser 3 caracteres";

      return true;
    },
  };

  Recuperar() {
    //Primeira etapa
    if (this.password == "") {
      UserService.FirstStepRecover(this.email).then(
        (res) => {
          if (res.data.email == this.email) {
            console.log(res.data);
            this.SecondStep = true;
            this.id = res.data.id;
            this.$swal(
              "Encontramos seu cadastro!",
              "Digite a nova senha.",
              "info"
            );
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
      //Segunda etapa
    } else {
      UserService.SecondStepRecover(this.id, this.password).then(
        (res) => {
          this.$swal(
            "Senha recuperada com sucesso! Segue abaixo seus novos dados.",
            `Email: ${res.data.email} - Senha: ${res.data.password}.`,
            "info"
          );

          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        },
        (err) => {
          console.log(err.response);
        }
      );
    }
  }
}
</script>

<style scoped>
button,
input {
  outline-style: none;
}
a {
  text-decoration: none;
}

.fundo {
  /* background-color: blue; */
  height: 100vh;
}

.centerAll {
  margin: auto auto;
}

.verticalCenter {
  margin: auto 0;
}

.horizontalCenter {
  margin: 0 auto;
}

/* .container {
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
} */
</style>