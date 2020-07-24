<template>
  <div>
    <layout-base>
      <template v-slot:menu>
        <v-row dense>
          <v-col col="12" sm="12" md="2" lg="2" xl="2">
            <v-select
              outlined
              dense
              label="Ambiente"
              :items="ambiente"
              item-text="nome"
              item-value="id"
            ></v-select>
          </v-col>

          <v-col col="12" sm="12" md="2" lg="2" xl="2">
            <v-select
              outlined
              dense
              label="Ordenacao"
              :items="ordenacao"
              item-text="nome"
              item-value="id"
            ></v-select>
          </v-col>

          <v-col col="12" sm="12" md="2" lg="2" xl="2">
            <v-select outlined dense label="Busca" :items="busca" item-text="nome" item-value="id"></v-select>
          </v-col>

          <v-col col="12" sm="12" md="6" lg="6" xl="6">
            <v-text-field outlined dense label="Pesquisar" append-icon="mdi-magnify"></v-text-field>
          </v-col>
        </v-row>
      </template>
      <template v-slot:main>
        <v-row dense>
          <v-col col="12" sm="12" md="2" lg="2" xl="2">
            <v-btn icon @click="DesarquivarTodos">
              <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <v-icon v-on="on">mdi-file-cabinet</v-icon>
                </template>
                <span>Desarquivar</span>
              </v-tooltip>
            </v-btn>
            <v-btn icon @click="Arquivar">
              <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <v-icon v-on="on">mdi-file-cabinet</v-icon>
                </template>
                <span>Arquivar</span>
              </v-tooltip>
            </v-btn>
            <v-btn icon @click="Excluir">
              <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <v-icon v-on="on">mdi-file-remove-outline</v-icon>
                </template>
                <span>Excluir</span>
              </v-tooltip>
            </v-btn>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-col col="12" sm="12" md="12" lg="12" xl="12">
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="ListaOcorrencias"
                :items-per-page="itensPerPage"
                item-key="id"
                show-select
                dense
                :loading="isLoading"
                class="elevation-2"
              >
                <!-- <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-for="item in items" :key="item.id">
                      <td>
                        <v-checkbox
                        v-model="selected"
                        >

                        </v-checkbox>
                      </td>
                      <td>
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon small @click="Visualizar(item)" v-on="on">mdi-delete</v-icon>
                          </template>
                          <span>Excluir</span>
                        </v-tooltip>
                      </td>
                      <td>{{ item.id }}</td>
                      <td>{{ item.level }}</td>
                      <td>{{ item.description }}</td>
                      <td>{{ item.frequency }}</td>
                    </tr>
                  </tbody>
                </template>-->
              </v-data-table>
            </v-col>
          </v-col>
        </v-row>
      </template>
    </layout-base>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Log from "@/core/models/Entities/Log";
import LogService from "@/core/services/Log/LogService";

@Component
export default class Dashboard extends Vue {
  // eslint-disable-next-line
  public debounce: any;
  public selected = [];
  public singleSelect = false;
  public itensPerPage = 10;
  public isLoading = true;
  public ambiente = [
    { id: 1, nome: "Produção" },
    { id: 2, nome: "Homologação" },
    { id: 3, nome: "Dev" },
  ];
  public ordenacao = [
    { id: 1, nome: "Level" },
    { id: 2, nome: "Frequência" },
  ];
  public busca = [
    { id: 1, nome: "Level" },
    { id: 2, nome: "Descrição" },
    { id: 3, nome: "Origem" },
  ];
  public headers = [
    { text: "Id", value: "id" },
    { text: "Level", value: "level" },
    { text: "Log", value: "description" },
    { text: "Events", value: "frequency" },
  ];
  public ListaOcorrencias = [];

  // @Watch('selected')
  // Selected(novo: any, antigo: any){
  //   console.log('novo', novo);
  //   console.log('antigo', antigo);
  // }

  getOcorrencias() {
    const logs = [
      new Log(1, "Origin", "Warning", "Description", "Frequency", "Box"),
      new Log(2, "Origin", "Warning", "Description", "Frequency", "Box"),
      new Log(3, "Origin", "Warning", "Description", "Frequency", "Box"),
      new Log(4, "Origin", "Warning", "Description", "Frequency", "Box"),
      new Log(5, "Origin", "Warning", "Description", "Frequency", "Box"),
      new Log(6, "Origin", "Warning", "Description", "Frequency", "Box"),
      new Log(7, "Origin", "Warning", "Description", "Frequency", "Box"),
    ];
    return logs;
  }

  Arquivar() {
    LogService.Arquivar(this.selected).then(
      (res) => {
        console.log(res);
        this.CarregarPrimary(true);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async DesarquivarTodos() {
    await LogService.DesarquivarTodos().then(res => {
      this.CarregarPrimary(true);
    }, err => {
      console.log(err);
    });
  }
  
  Excluir() {
    LogService.Deletar(this.selected).then(res => {
      console.log(res);
      this.CarregarPrimary(true);
    }, err => {
      console.log(err);
    });
  }

  buscar(valor: string) {
    if (valor == "" || valor == undefined || valor.length == 0) return;

    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      console.log(valor);
    }, 1000);
  }

  CarregarPrimary(lazy = false) {
    LogService.ListarTodos().then(
      (res) => {
        lazy ? setTimeout(() => this.ListaOcorrencias = res.data, 1000) : this.ListaOcorrencias = res.data;
      },
      (err) => {
        console.log(err.response);
        this.$swal(
          "Erro!",
          err.response ? err.response.data.message : "Erro de conexão.",
          "error"
        );
      }
    );
  }

  mounted() {
    this.CarregarPrimary(true);
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

/* .selects > select {
   width: 15vw;
  margin-right: 2vw; 
} */

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