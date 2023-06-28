<template>
  <b-container fluid class="cadastro-extras">
    <TituloCadastro
      icon="fa fa-list-alt fa-lg"
      titulo="Cadastro de campos extras"
      @criarNovoCadastro="reset(), modeNavegar('save')"
      @cancelarCadastro="reset(), modeNavegar()"
      :mode="mode"
    />
    <b-form v-if="mode !== null" class="form-cadastros">
      <h5><i class="fa fa-list-alt mr-1"></i> Dados gerais</h5>
      <div class="divInfoCadastroAuxiliares">
        <InforDropdownCadastro
          :dataInfor_codigo="extra.codigo_extra"
          :dataInfor_alterado="extra.alterado_em"
          :dataInfor_cadastrado="extra.cadastrado_em"
        />
      </div>
      <input
        type="hidden"
        id="form-extra-codigo"
        v-model="extra.codigo_extra"
      />
      <b-row>
        <b-col cols="12" md="6">
          <b-form-group label="Nome*" label-form="form-extra-nome">
            <b-form-input
              id="form-extra-nome"
              :class="{ 'is-invalid': state(!extra.nome.length > 0) }"
              type="text"
              autocomplete="off"
              v-model="extra.nome"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="Descrição" label-form="form-extra-descricao">
            <b-form-input
              id="form-extra-descricao"
              type="text"
              autocomplete="off"
              v-model="extra.descricao"
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
              <b-form-checkbox class="pr-4" value="codigo_extra"
                >Código</b-form-checkbox
              >
              <b-form-checkbox class="pr-4" value="nome">Nome</b-form-checkbox>
              <b-form-checkbox value="descricao">Descricão</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <TabelaExibicaoCadastro
        :dataCadastros="dataExtras"
        :totalRows="dataExtras.length"
        :fields="fieldsextras"
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
  name: "CadastroExtras",
  data() {
    return {
      mode: null,
      extra: {},
      dataExtras: [],
      filterOn: [],
      filterIgnored: ["cadastrado_em", "alterado_em"],
      fieldsextras: [
        {
          key: "codigo_extra",
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
          key: "descricao",
          label: "Descrição",
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
        this.extra = {
          nome: "",
        };
      }
      this.mode = mode;
    },
    // SÓ FAZ UMA NOVA REQUISIÇÃO AO BACKEND SE EXCLUIR UM REGISTRO OU EDITAR "atualizaData"
    reset(mode = null) {
      this.extra = {};
      this.modeNavegar();
      if (mode === "atualizaData") {
        this.dataExtras = [];
        this.loadExtras();
      }
    },
    loadExtra(extra, mode = null) {
      if (extra.codigo_extra) {
        this.mode = mode;
        this.extra = { ...extra };
      }
    },
    loadExtras() {
      const url = `${baseApiUrl}/cadastro_extras`;
      axios
        .get(url)
        .then((res) => {
          this.dataExtras = res.data;
        })
        .catch(showError);
    },
    save() {
      try {
        this.existOuErro(this.extra.nome, "Preencha o [Nome].");
      } catch (error) {
        showError(error);
        return;
      }

      const extraModelo = {
        codigo_extra: this.extra.codigo_extra,
        nome: this.extra.nome,
        descricao: this.extra.descricao,
      };
      const method = this.extra.codigo_extra ? "put" : "post";
      const id = this.extra.codigo_extra ? `${this.extra.codigo_extra}` : "";
      const url = `${baseApiUrl}/cadastro_extras/${id}`;
      axios[method](url, extraModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
    remove() {
      const id = this.extra.codigo_extra;
      const url = `${baseApiUrl}/cadastro_extras/${id}`;
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
    this.loadExtras();
    // AO CLICAR NO BOTÃO DE ALTERAR OU EXCLUIR NA "TabelaExibicaoCadastro", ESSA FUNÇÃO É EXECUTADA
    this.$root.$on("carregaRegistro", (registro, mode) => {
      this.loadExtra(registro, mode);
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