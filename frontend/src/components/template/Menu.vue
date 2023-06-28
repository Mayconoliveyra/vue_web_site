<template>
  <aside class="menu" v-show="isMenuVisible">
    <header>
      <img src="@/assets/logo.png" alt="Logo" />
    </header>
    <ul>
      <li>
        <router-link to="/" href> <i class="fa fa-home"></i>Home </router-link>
      </li>
      <li>
        <router-link to="/" href>
          <i class="fa fa-truck"></i>Entregas
        </router-link>
      </li>
      <li>
        <router-link to="/" href>
          <i class="fa fa-line-chart"></i>Relatórios
        </router-link>
      </li>
      <li>
        <router-link to="/" href>
          <i class="fa fa-list-alt"></i>Contas a Pagar
        </router-link>
      </li>
      <li>
        <router-link to="/" href>
          <i class="fa fa-list-alt"></i>Contas a Receber
        </router-link>
      </li>
      <li @click="toggleCadastros">
        <router-link to href class="cadastros-btn">
          <i class="fa fa-newspaper-o"></i>Cadastros
          <i class="fa fa-angle-double-down fa-lg ml-2"></i>
        </router-link>
        <ul v-if="cadastrosMenuVisible">
          <li @click="toggleMenu">
            <router-link to="/cadastro_clientes">
              <i class="fa fa-users"></i>Clientes
            </router-link>
          </li>
          <li @click="toggleMenu">
            <router-link to="/cadastro_fornecedores">
              <i class="fa fa-truck"></i>Fornecedores
            </router-link>
          </li>
          <li @click="toggleMenu">
            <router-link to="/cadastro_funcionarios">
              <i class="fa fa-user-o"></i>Funcionários
            </router-link>
          </li>
          <li @click="toggleMenu">
            <router-link to="/cadastro_fornecedores">
              <i class="fa fa-empire"></i>Permissões
            </router-link>
          </li>
        </ul>
      </li>
      <li @click="toggleProdutos">
        <router-link to href class="cadastros-btn">
          <i class="fa fa-barcode"></i>Produtos
          <i class="fa fa-angle-double-down fa-lg ml-2"></i>
        </router-link>
        <ul v-if="produtosMenuVisible">
          <li @click="toggleMenu">
            <router-link to="/cadastro_mercadorias">
              <i class="fa fa-cube"></i>Gerenciar produtos
            </router-link>
          </li>
          <li @click="toggleMenu">
            <router-link to="/cadastro_auxiliares">
              <i class="fa fa-file-text-o"></i>Opções auxiliares
            </router-link>
          </li>
        </ul>
      </li>
      <li @click="toggleEstoque">
        <router-link to href class="cadastros-btn">
          <i class="fa fa-cubes"></i>Estoque
          <i class="fa fa-angle-double-down fa-lg ml-2"></i>
        </router-link>
        <ul v-if="estoqueMenuVisible">
          <li @click="toggleMenu">
            <router-link to="/">
              <i class="fa fa-external-link"></i>Movimentações
            </router-link>
          </li>
          <li @click="toggleMenu">
            <router-link to="/">
              <i class="fa fa-arrows-alt"></i>Ajustes
            </router-link>
          </li>
          <li @click="toggleMenu">
            <router-link to="/cadastro_compras">
              <i class="fa fa-shopping-basket"></i>Compras
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Menu",
  computed: mapState([
    "isMenuVisible",
    "cadastrosMenuVisible",
    "produtosMenuVisible",
    "estoqueMenuVisible",
  ]),
  methods: {
    toggleCadastros() {
      this.$store.commit("toggleCadastros");
    },
    toggleProdutos() {
      this.$store.commit("toggleProdutos");
    },
    toggleEstoque() {
      this.$store.commit("toggleEstoque");
    },
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>

<style>
.menu header {
  height: 44px;
  background-color: #063146;
}
.menu header img {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 27px;
  width: 100%;
  height: 100%;
}

.menu {
  grid-area: menu;
  display: flex;
  flex-direction: column;

  flex-wrap: wrap;
  list-style: none;
  text-decoration: none;
  width: 100%;
  height: 100%;
  background-color: #042331;
  border-right: 2px solid #031923;
}

.menu ul li {
  line-height: 60px;
  border-bottom: 2px solid #ffffff1a;
}

.menu ul li a {
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 600;
  padding-left: 21px;
  color: rgba(255, 255, 255, 0.836);

  box-sizing: border-box;

  border-left: 2px solid transparent;
  transition: 0.5s;
}

.menu ul li:hover > a {
  /*  padding-left: 35px; */
  font-size: 16px;
  color: rgb(255, 255, 255);
  text-decoration: none;
  border-left-color: #00ffff;
}

.menu ul a i {
  margin-right: 13px;
}

.menu ul li ul {
  display: flex;
  flex-direction: column;
}

.menu ul li ul li {
  padding-left: 25px;
  display: flex;
  flex-direction: column;
  line-height: 40px;
  border-top: none;
  border-bottom: none;
}

.menu ul li ul li a {
  font-size: 14.5px;
  padding-left: 15px;
  border-top: solid 1px rgb(77, 77, 91);
  transition: 0.1s;
}
</style>