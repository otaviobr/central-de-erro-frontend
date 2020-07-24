<template>
  <div class="container">
    <header app>
      <!-- <p>Central de Erros</p> -->
      <!-- <img
        src="https://cdn.imgbin.com/13/2/13/imgbin-computer-icons-user-profile-material-design-profile-t3uPh00b5QqRAKD0qSh6PQ15E.jpg"
        alt="Logo usuário"
        height="50px"
      /> -->
    </header>
    <nav app>
      <slot name="nav"></slot>
    </nav>
    <div class="menu">
      <slot name="menu"></slot>
    </div>

    <main app>
      <slot name="main">main</slot>
    </main>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LayoutBaseDashboard extends Vue {}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100vw;
  margin-top: 3vw;
  background-color: rgb(250, 250, 250);
  /* border: 1px solid black; */
}

header {
  display: flex;
  flex-direction: row;
  padding: 0vw 2vw;
  justify-content: space-between;
  align-items: center;
}
.menu{
  margin: 2vh 0vh;
}
</style>