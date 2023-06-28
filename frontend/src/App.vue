<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible }">
    <Header />
    <Menu />
    <Loading v-if="validaToken" />
    <Content v-else />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, usuarioChave } from "../global";
import { mapState } from "vuex";
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";
import Loading from "./components/template/Loading";

export default {
  name: "App",
  components: {
    Header,
    Menu,
    Content,
    Loading,
  },
  data: function () {
    return {
      validaToken: true,
    };
  },

  methods: {
    async validadorToken() {
      this.validaToken = true;
      const json = localStorage.getItem(usuarioChave); //PEGA O TOKEN QUE ESTA ARMAZENADO NA PAGINA
      const userData = JSON.parse(json);

      this.$store.commit("setTokenFuncionario", {});
      // SE O TOKEN TIVER VAZIO  PAUSA A FUNÇÃO, POIS, NÃO E NECESSARIO VALIDAR NADA.
      if (!userData) {
        this.validaToken = false;
        this.$router.push({ path: "/autenticacao" });
        return;
      }
      const res = await axios.post(`${baseApiUrl}/validarToken`, userData); //VERIFICA SE O TOKEN AINDA É VALIDO

      if (res.data) {
        this.$store.commit("setTokenFuncionario", userData);
      } else {
        localStorage.removeItem(usuarioChave);
        this.$store.commit("setTokenFuncionario", {});
        this.$router.push({ path: "/autenticacao" });
      }
      this.validaToken = false;
    },
  },
  async created() {
    this.validadorToken();
  },
  computed: mapState(["isMenuVisible"]),
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
  margin: 0px;
  padding: 0px;
}

form .row input {
  font-size: 12px;
}

.tab-content {
  font-size: 13px;
}

#app {
  font-size: 12px;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 45px 1fr;
  grid-template-columns: 230px 1fr;
  grid-template-areas:
    "menu header"
    "menu content";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content";
}
</style>
