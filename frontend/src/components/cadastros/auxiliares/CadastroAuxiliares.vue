<template>
  <b-container fluid class="cadastro-auxiliares mt-2">
    <b-row class="mb-2">
      <b-col cols="4">
        <b-button size="sm" class="w-100" @click="opcaoSelecionada = 'Grupo'">
          Grupo
        </b-button>
      </b-col>
      <b-col cols="4">
        <b-button size="sm" class="w-100" @click="opcaoSelecionada = 'Unidade'">
          Unidade
        </b-button>
      </b-col>
      <b-col cols="4">
        <b-button size="sm" class="w-100" @click="opcaoSelecionada = 'Extra'">
          Extra
        </b-button>
      </b-col>
    </b-row>
    <Grupos v-if="opcaoSelecionada === 'Grupo'" />
    <Unidades v-if="opcaoSelecionada === 'Unidade'" />
    <Extras v-if="opcaoSelecionada === 'Extra'" />
  </b-container>
</template>

<script>
import Grupos from "./components/Grupos";
import Unidades from "./components/Unidades";
import Extras from "./components/Extras";
export default {
  components: {
    Grupos,
    Unidades,
    Extras,
  },
  name: "CadastroAuxiliares",
  data() {
    return {
      opcaoSelecionada: "",
    };
  },
};
</script>

<style >
</style>