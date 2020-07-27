<template>
  <div class="container">
    <div class="login">
      <h2>Cadastro</h2>
      <div class="inputs">
        <!-- <input type="text" v-model="email" placeholder="Email" /> -->
        <!-- <input type="password" v-model="senha" placeholder="Senha" /> -->
        <v-row dense>
          <v-col cols="12">
            <v-col sm="12" md="12" lg="12" xl="12">
              <v-text-field v-model="email" label="Email" outlined dense></v-text-field>
            </v-col>
            <v-col sm="12" md="12" lg="12" xl="12">
              <v-text-field type="password" v-model="password" label="Senha" outlined dense></v-text-field>
            </v-col>
          </v-col>
        </v-row>
      </div>
      <div class="botao">
        <v-btn
          @click="Cadastrar()"
          :disabled="email == '' || email.length < 9 || password == ''"
        >Cadastrar</v-btn>
        <!-- <a href>
          <span>Esqueci a senha</span>
        </a>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserService from "../core/services/UserService/UserService";

@Component
export default class Login extends Vue {
  public email = "otavio.v.santos@gmail.com";
  public password = "1234";

  Cadastrar() {
    UserService.NewUser(this.email, this.password).then(
      (res) => {
        if (res.data)
          this.$swal(
            "Sucesso!",
            `Usuário com o email ${res.data.email} criado com sucesso!`,
            "success"
          );

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      },
      (err) => {
        this.$swal("Erro!", "Email já cadastrado!", "error");
      }
    );
  }
}
</script>

<style scoped>
button,
input {
  outline-style: none;
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
  height: auto;
  padding: 35px;
  border: 1px solid black;
}
</style>