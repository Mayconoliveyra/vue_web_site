<template>
  <b-container fluid class="cadastro-unidades">
    <TituloCadastro
      icon="fa fa-flask fa-lg"
      titulo="Cadastro de unidades"
      @criarNovoCadastro="reset(), modeNavegar('save')"
      @cancelarCadastro="reset(), modeNavegar()"
      :mode="mode"
    />
    <b-form v-if="mode !== null" class="form-cadastros">
      <h5><i class="fa fa-list-alt mr-1"></i> Dados gerais</h5>
      <div class="divInfoCadastroAuxiliares">
        <InforDropdownCadastro
          :dataInfor_codigo="unidade.codigo_unidade"
          :dataInfor_alterado="unidade.alterado_em"
          :dataInfor_cadastrado="unidade.cadastrado_em"
        />
      </div>
      <input
        type="hidden"
        id="form-unidade-codigo"
        v-model="unidade.codigo_unidade"
      />
      <b-row>
        <b-col cols="12" md="6">
          <b-form-group label="Nome*" label-form="form-unidade-nome">
            <b-form-input
              id="form-unidade-nome"
              :class="{ 'is-invalid': state(!unidade.nome.length > 0) }"
              type="text"
              autocomplete="off"
              v-model="unidade.nome"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="Sigla*" label-form="form-unidade-sigla">
            <b-form-input
              id="form-unidade-sigla"
              :class="{ 'is-invalid': state(!unidade.sigla.length > 0) }"
              type="text"
              autocomplete="off"
              v-model="unidade.sigla"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <BtnAcaoCadastros
        :mode="mode"
        @salvarRegistro="save()"
        @cancelarRegistro="reset()"
        @excluirRegistro="remove()"
      />
    </b-form>
    <div v-show="mode == null" class="mt-5">
      <InputPesquisaCadastro />
      <!-- FILTROS  -->
      <b-row class="mt-3">
        <b-col cols="12" align="center">
          <b-form-group>
            <b-form-checkbox-group size="lg" v-model="filterOn" switches>
              <b-form-checkbox class="pr-4" value="codigo_unidade"
                >Código</b-form-checkbox
              >
              <b-form-checkbox class="pr-4" value="nome">Nome</b-form-checkbox>
              <b-form-checkbox value="sigla">Sigla</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <TabelaExibicaoCadastro
        :dataCadastros="dataUnidades"
        :totalRows="dataUnidades.length"
        :fields="fieldsunidades"
        :filterOn="filterOn"
        :filterIgnored="filterIgnored"
      />
    </div>
  </b-container>
</template>

<script>
import InputPesquisaCadastro from "../../components/InputPesquisaCadastro";
import TabelaExibicaoCadastro from "../../components/TabelaExibicaoCadastro";
import BtnAcaoCadastros from "../../components/BtnAcaoCadastros";
import InforDropdownCadastro from "../../components/InforDropdownCadastro";
import { baseApiUrl, showError } from "@/../global";
import TituloCadastro from "../../components/TituloCadastro";
import axios from "axios";

export default {
  components: {
    InputPesquisaCadastro,
    TabelaExibicaoCadastro,
    BtnAcaoCadastros,
    InforDropdownCadastro,
    TituloCadastro,
  },
  name: "Cadastrounidades",
  data() {
    return {
      mode: null,
      unidade: {},
      dataUnidades: [],
      filterOn: [],
      filterIgnored: ["cadastrado_em", "alterado_em"],
      fieldsunidades: [
        {
          key: "codigo_unidade",
          label: "Código",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "nome",
          label: "Nome",
          sortDirection: "asc",
          sortable: true,
        },
        {
          key: "sigla",
          label: "Sigla",
          sortDirection: "asc",
          sortable: true,
        },
        {
          key: "actions",
          label: "Ações",
          class: "text-center",
        },
      ],
    };
  },
  methods: {
    modeNavegar(mode = null) {
      // SE O MODO FOR SALVAR, SETA OS CAMPOS PADRÃO NO FORMULARIO
      if (mode == "save") {
        this.unidade = {
          nome: "",
          sigla: "",
        };
      }
      this.mode = mode;
    },
    // SÓ FAZ UMA NOVA REQUISIÇÃO AO BACKEND SE EXCLUIR UM REGISTRO OU EDITAR "atualizaData"
    reset(mode = null) {
      this.unidade = {};
      this.modeNavegar();
      if (mode === "atualizaData") {
        this.dataUnidades = [];
        this.loadUnidades();
      }
    },
    loadUnidade(unidade, mode = null) {
      if (unidade.codigo_unidade) {
        this.mode = mode;
        this.unidade = { ...unidade };
      }
    },
    loadUnidades() {
      const url = `${baseApiUrl}/cadastro_unidades`;
      axios
        .get(url)
        .then((res) => {
          this.dataUnidades = res.data;
        })
        .catch(showError);
    },
    save() {
      try {
        this.existOuErro(this.unidade.nome, "Preencha o [Nome].");
        this.existOuErro(this.unidade.sigla, "Preencha a [Sigla].");
      } catch (error) {
        showError(error);
        return;
      }

      const unidadeModelo = {
        codigo_unidade: this.unidade.codigo_unidade,
        nome: this.unidade.nome,
        sigla: this.unidade.sigla,
      };
      const method = this.unidade.codigo_unidade ? "put" : "post";
      const id = this.unidade.codigo_unidade
        ? `${this.unidade.codigo_unidade}`
        : "";
      const url = `${baseApiUrl}/cadastro_unidades/${id}`;
      axios[method](url, unidadeModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
    remove() {
      const id = this.unidade.codigo_unidade;
      const url = `${baseApiUrl}/cadastro_unidades/${id}`;
      axios
        .delete(url)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
    state(elemento) {
      return elemento;
    },
    existOuErro(valor, msg) {
      if (!valor.toString().trim().length > 0) {
        throw msg;
      }
    },
  },
  created() {
    this.loadUnidades();
    // AO CLICAR NO BOTÃO DE ALTERAR OU EXCLUIR NA "TabelaExibicaoCadastro", ESSA FUNÇÃO É EXECUTADA
    this.$root.$on("carregaRegistro", (registro, mode) => {
      this.loadUnidade(registro, mode);
    });
  },
};
</script>

<style >
.divInfoCadastroAuxiliares {
  position: absolute;
  right: 12px;
  top: 40px;
}
</style>