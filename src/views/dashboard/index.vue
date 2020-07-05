<template>
  <div>
    <layout-base>
      <template v-slot:menu>
        <v-row dense>
          <v-col col="12" sm="12" md="3" lg="3" xl="3">
            <v-select outlined dense label="Ambiente" :items="ambiente" item-text="nome" item-value="id">
            </v-select>
          </v-col>

          <v-col col="12" sm="12" md="3" lg="3" xl="3">
            <v-select outlined dense label="Ordenacao" :items="ordenacao" item-text="nome" item-value="id">
            </v-select>
          </v-col>

          <v-col col="12" sm="12" md="3" lg="3" xl="3">
            <v-select outlined dense label="Busca" :items="busca" item-text="nome" item-value="id">
            </v-select>
          </v-col>

          <v-col col="12" sm="12" md="3" lg="3" xl="3">
              <v-text-field outlined dense label="Pesquisar"></v-text-field>
          </v-col>
        </v-row>
      </template>
      <template v-slot:main>
        <v-row dense>
          <v-col col="12" sm="12" md="2" lg="2" xl="2">
            <v-btn>Arquivar</v-btn>
          </v-col>
          <v-col col="12" sm="12" md="2" lg="2" xl="2">
            <v-btn>Apagar</v-btn>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-col col="12" sm="12" md="12" lg="12" xl="12">
              <v-data-table 
              v-model="selected" 
              :single-select="singleSelect" 
              :headers="headers" 
              :items="ocorrencias" 
              item-key="id"
              items-per-page="5"
              show-select 
              dense
              class="elevation-1">
              </v-data-table>
            </v-col>
          </v-col>
        </v-row>
      </template>
    </layout-base>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Dashboard extends Vue {
  public debounce: any;
  public selected = [];
  public singleSelect = false;
  public ambiente = [
    { id: 1, nome: "Produção" },
    { id: 2, nome: "Homologação" },
    { id: 3, nome: "Dev" }
  ];
  public ordenacao = [
    { id: 1, nome: "Level" },
    { id: 2, nome: "Frequência" }
  ];
  public busca = [
    { id: 1, nome: "Level" },
    { id: 2, nome: "Descrição" },
    { id: 3, nome: "Origem" }
  ];
  public headers = [
    {text: 'Level', value: 'level'},
    {text: 'Log', value: 'log'},
    {text: 'Events', value: 'events'},
  ];
  public ocorrencias = [
    {id: 1, level: 'Warning', log: 'Teste 1', events: 100},
    {id: 2, level: 'Warning', log: 'Teste 2', events: 100},
    {id: 3, level: 'Warning', log: 'Teste 3', events: 100},
    {id: 4, level: 'Warning', log: 'Teste 4', events: 100},
    {id: 5, level: 'Warning', log: 'Teste 5', events: 100},
    {id: 6, level: 'Warning', log: 'Teste 6', events: 100},
    {id: 7, level: 'Warning', log: 'Teste 7', events: 100},
    {id: 8, level: 'Warning', log: 'Teste 8', events: 100},
    {id: 9, level: 'Warning', log: 'Teste 9', events: 100},
    {id: 10, level: 'Warning', log: 'Teste 10', events: 100},
  ];

  buscar(valor: string) {
    if (valor == "" || valor == undefined || valor.length == 0) return;

    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      console.log(valor);
    }, 1000);
  }
}
</script>

<style scoped>
* {
  outline-style: none;
}
.nav {
  display: flex;
  margin: 0vw 2vw;
  flex-direction: row;
  justify-content: space-between;
}

.nav > input {
  width: 40vw;
}
.selects {
  display: flex;
  flex-direction: row;
}

.selects > select {
  /* width: 15vw;
  margin-right: 2vw; */
}

.tabela {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  /* border: 1px solid red; */
}

.cabecalho {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  height: 5vh;
  margin-bottom: 3vh;
  /* border: 1px solid blue; */
}

.corpo {
  width: 90%;
}

.registros {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  /* border: 1px solid green; */
}

/* Botão */
.botao {
  display: flex;
  flex-direction: row;
}

.botao > button {
  width: auto;
  max-width: 15vw;
  min-width: 7vw;
  height: 3vw;
  margin: 1vw 1vw;
  border-style: none;
  color: rgb(0, 0, 0);
  background-color: rgb(240, 240, 240);
  border-radius: 5px;
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