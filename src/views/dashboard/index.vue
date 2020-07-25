<template>
  <div>
    <layout-base>
      <template v-slot:menu>
        <v-row dense>
          <v-col col="12" sm="12" md="2" lg="2" xl="2">
            <v-select
              v-model="Env"
              outlined
              dense
              label="Environment"
              :items="ambiente"
              item-text="nome"
              item-value="id"
            ></v-select>
          </v-col>

          <v-col col="12" sm="12" md="2" lg="2" xl="2">
            <v-select
              v-model="Order"
              outlined
              dense
              label="Order"
              :items="ordenacao"
              item-text="nome"
              item-value="id"
            ></v-select>
          </v-col>

          <!-- <v-col col="12" sm="12" md="2" lg="2" xl="2">
            <v-select outlined dense label="Busca" :items="busca" item-text="nome" item-value="id"></v-select>
          </v-col>-->

          <v-col col="12" sm="12" md="8" lg="8" xl="8">
            <v-text-field outlined dense label="Search" v-model="Search" append-icon="mdi-magnify"></v-text-field>
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
                <span>Unarchive All</span>
              </v-tooltip>
            </v-btn>
            <v-btn icon @click="Arquivar">
              <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <v-icon v-on="on">mdi-file-cabinet</v-icon>
                </template>
                <span>To File</span>
              </v-tooltip>
            </v-btn>
            <v-btn icon @click="Delete">
              <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <v-icon v-on="on">mdi-file-remove-outline</v-icon>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </v-btn>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-col col="12" sm="12" md="12" lg="12" xl="12">
              <v-data-table
                :headers="headers"
                :items="ListaOcorrencias"
                :items-per-page="itensPerPage"
                item-key="id"
                dense
                show-select
                :loading="isLoading"
                class="elevation-2"
              >
                <template v-slot:header.data-table-select>
                  <v-checkbox
                    :value="selected.length == ListaOcorrencias.length"
                    @click.stop="(selected.length == ListaOcorrencias.length ? selected.splice(0) : selected = ListaOcorrencias.map(m => m))"
                  ></v-checkbox>
                </template>
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-for="item in items" :key="item.id">
                      <td>
                        <v-checkbox
                          :value="selected.some(s => s == item)"
                          @click.stop="(selected.some(s => s == item) ? selected = selected.filter(f => f != item) : selected.push(item))"
                        ></v-checkbox>
                      </td>
                      <td>
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon small @click="Open(item)" v-on="on">mdi-file-eye-outline</v-icon>
                          </template>
                          <span>Open</span>
                        </v-tooltip>
                      </td>
                      <td align="center">{{ item.level }}</td>
                      <td align="center">{{ item.description }}</td>
                      <td align="center">{{ item.frequency }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="(dialog = false, Detail = DetailB)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title></v-toolbar-title>
                  </v-toolbar>

                  <v-card-title>
                    <h2>{{ dialog ? `Erro in ${Detail.origin} at ${Detail.created_at.split('T')[0].replace(/-/g, '/')} - ${Detail.created_at.split('T')[1].split('.')[0]}` : '' }}</h2>
                  </v-card-title>
                  <v-card-text>
                    <v-col cols="12" style>
                      <v-row dense>
                        <v-col sm="12" md="6" lg="6" xl="6">
                          <h3>Title</h3>
                          <p>{{ dialog ? Detail.level : '' }}</p>
                        </v-col>
                        <v-col sm="12" md="6" lg="6" xl="6">
                          <h3>Error Level</h3>
                          <p>{{ dialog ? Detail.level : '' }}</p>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col sm="12" md="6" lg="6" xl="6">
                          <h3>Details</h3>
                          <p>{{ dialog ? Detail.description : '' }}</p>
                        </v-col>
                        <v-col sm="12" md="6" lg="6" xl="6">
                          <h3>Token</h3>
                          <p>{{ token }}</p>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card-text>
                </v-card>
              </v-dialog>
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
import LogDetail from "@/core/models/Entities/LogDetail";
import LogService from "@/core/services/Log/LogService";

@Component
export default class Dashboard extends Vue {
  // eslint-disable-next-line
  public debounce: any;
  public dialog = false;
  public selected = [];
  public singleSelect = false;
  public itensPerPage = 10;
  public isLoading = true;
  public Search = "";
  public Env = 1;
  public Order = 1;
  public ambiente = [
    { id: 1, nome: "Production" },
    { id: 2, nome: "Homologation" },
    { id: 3, nome: "Development" },
  ];
  public ordenacao = [
    { id: 1, nome: "Level" },
    { id: 2, nome: "Frequency" },
  ];
  public busca = [
    { id: 1, nome: "Level" },
    { id: 2, nome: "Descriprion" },
    { id: 3, nome: "Origin" },
  ];
  public headers = [
    { text: "", value: "", sortable: false },
    { text: "Level", value: "level" },
    { text: "Log", value: "description" },
    { text: "Events", value: "frequency" },
  ];
  public ListaOcorrencias = [];

  @Watch("Search")
  Searched(newValue: any, oldValue: any) {
    // console.log('novo: ', newValue, '| antigo: ', oldValue);
    this.SearchFor(newValue);
  }

  public Detail!: LogDetail;
  public DetailB = new LogDetail(false);
  public token = "";

  console(item: any) {
    console.log(item);
  }

  Arquivar() {
    LogService.ToArchive(this.selected).then(
      (res) => {
        console.log(res);
        this.LoadPrimary(true);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async DesarquivarTodos() {
    await LogService.ToPrimaryAll().then(
      (res) => {
        this.LoadPrimary(true);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  Delete() {
    console.log(this.selected);
    LogService.Delete(this.selected).then(
      (res) => {
        console.log(res);
        this.$swal("Sucesso!", "Ação efetuada com sucesso!", "success");
        this.LoadPrimary(true);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  SearchFor(valor: string) {
    if (valor == "" || valor == undefined || valor.length == 0) {
      this.LoadPrimary(true);
      return;
    }

    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      const nameEnv = this.ambiente.filter((f) => f.id == this.Env)[0].nome;
      const nameOrder = this.ordenacao.filter((f) => f.id == this.Order)[0]
        .nome;

      LogService.SearchFor(nameEnv, nameOrder, valor).then(
        (res) => {
          // console.log(res);
          this.ListaOcorrencias = res.data;
          this.ListaOcorrencias.length > 0
            ? this.$swal(
                "Busca Efetuada!",
                "Ação efetuda com sucesso!",
                "success"
              )
            : this.$swal(
                "Busca Efetuada!",
                "Nenhum registro encontrado",
                "info"
              );
        },
        (err) => {
          console.log(err.response);
        }
      );
    }, 1000);
  }

  LoadPrimary(lazy = false) {
    LogService.GetAll().then(
      (res) => {
        lazy
          ? setTimeout(() => (this.ListaOcorrencias = res.data), 1000)
          : (this.ListaOcorrencias = res.data);
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

  Open(item: any) {
    LogService.Get(item).then(
      (res) => {
        this.Detail = new LogDetail(res.data);
        this.dialog = true;
        this.token = localStorage.token.split(".")[0];
      },
      (err) => {
        console.log(err.response);
      }
    );
  }

  mounted() {
    this.LoadPrimary(true);
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