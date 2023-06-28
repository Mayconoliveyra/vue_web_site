<template>
  <b-container class="autenticacao_funcionarios">
    <b-row align-h="center" class="w-100">
      <b-col cols="12" md="8" lg="6" class="container_autenticar">
        <h2 class="text-center">Fazer login</h2>
        <b-form class="mt-5">
          <input
            id="autenticacao-codigo"
            type="hidden"
            v-model="funcionario.codigo_funcionario"
          />
          <b-form-group label="E-mail" label-form="autenticacao-email">
            <b-form-input
              id="autenticacao-email"
              type="email"
              v-model="funcionario.email"
              required
            />
          </b-form-group>
          <b-form-group label="Senha" label-form="autenticacao-senha">
            <b-form-input
              id="autenticacao-senha"
              type="password"
              v-model="funcionario.senha"
              required
            />
          </b-form-group>
          <div class="text-center">
            <b-button variant="primary" @click="entrar">Entrar</b-button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError, usuarioChave } from "../../../global";
export default {
  name: "AutenticacaoFuncionarios",
  data() {
    return {
      funcionario: {},
    };
  },
  methods: {
    entrar() {
      const entrarModelo = {
        email: this.funcionario.email,
        senha: this.funcionario.senha,
      };
      axios
        .post(`${baseApiUrl}/autenticacao`, entrarModelo)
        .then((res) => {
          this.$store.commit("setTokenFuncionario", res.data);
          localStorage.setItem(usuarioChave, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    reset() {
      this.funcionario = {};
    },
  },
};
</script>
 
<style scoped>
.autenticacao_funcionarios {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
}
.container_autenticar {
  margin-top: 15px;
  margin-bottom: 15px;
  border: solid 1px rgb(179, 177, 177);
  padding: 12px 20px;
  border-radius: 10px;
  max-height: 600px;
}
.container_autenticar button {
  width: 90%;
  margin: 10px;
}
</style>