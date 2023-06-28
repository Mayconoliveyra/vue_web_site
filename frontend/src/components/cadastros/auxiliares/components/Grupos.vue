<template>
  <b-container fluid class="cadastro-grupos">
    <TituloCadastro
      icon="fa fa-list-ul fa-lg"
      titulo="Cadastro de grupos"
      @criarNovoCadastro="reset(), modeNavegar('save')"
      @cancelarCadastro="reset(), modeNavegar()"
      :mode="mode"
    />
    <b-form v-if="mode !== null" class="form-cadastros">
      <h5><i class="fa fa-list-alt mr-1"></i> Dados gerais</h5>
      <div class="divInfoCadastroAuxiliares">
        <InforDropdownCadastro
          :dataInfor_codigo="grupo.codigo_grupo"
          :dataInfor_alterado="grupo.alterado_em"
          :dataInfor_cadastrado="grupo.cadastrado_em"
        />
      </div>
      <input
        type="hidden"
        id="form-grupo-codigo"
        v-model="grupo.codigo_grupo"
      />
      <b-row>
        <b-col cols="12" md="6">
          <b-form-group label="Grupo*" label-form="form-grupo-nome">
            <b-form-input
              id="form-grupo-nome"
              :class="{ 'is-invalid': state(!grupo.nome.length > 0) }"
              type="text"
              autocomplete="off"
              v-model="grupo.nome"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="Grupo pai" label-form="form-grupo-pai">
            <b-form-input
              :class="{
                'is-invalid': state(
                  !this.dataGruposPai.includes(grupo.id_grupo_pai) &
                    (grupo.id_grupo_pai != '') &
                    (grupo.id_grupo_pai != null)
                ),
              }"
              id="form-grupo-pai"
              autocomplete="off"
              type="search"
              v-model="grupo.id_grupo_pai"
              @blur="grupoPaiValido()"
              required
              :readonly="mode === 'remove'"
              list="my-list-grupos"
            />
            <b-form-datalist :options="dataGruposPai" id="my-list-grupos">
            </b-form-datalist>
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
              <b-form-checkbox class="pr-4" value="codigo_grupo"
                >Código</b-form-checkbox
              >
              <b-form-checkbox class="pr-4" value="nome">Grupo</b-form-checkbox>
              <b-form-checkbox value="id_grupo_pai">Grupo Pai</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <TabelaExibicaoCadastro
        :dataCadastros="dataGrupos"
        :totalRows="dataGrupos.length"
        :fields="fieldsgrupos"
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
  name: "Cadastrogrupos",
  data() {
    return {
      mode: null,
      grupo: {},
      dataGrupos: [],
      dataGruposPai: [],
      filterOn: [],
      filterIgnored: ["cadastrado_em", "alterado_em"],
      fieldsgrupos: [
        {
          key: "codigo_grupo",
          label: "Código",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "nome",
          label: "Grupo",
          sortDirection: "asc",
          sortable: true,
        },
        {
          key: "id_grupo_pai",
          label: "Grupo Pai",
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
        this.grupo = {
          nome: "",
          id_grupo_pai: "",
        };
      }
      this.mode = mode;
    },
    // SÓ FAZ UMA NOVA REQUISIÇÃO AO BACKEND SE EXCLUIR UM REGISTRO OU EDITAR "atualizaData"
    reset(mode = null) {
      this.grupo = {};
      this.modeNavegar();
      if (mode === "atualizaData") {
        this.dataGrupos = [];
        this.dataGruposPai = [];
        this.loadGrupos();
      }
    },
    loadGrupo(grupo, mode = null) {
      if (grupo.codigo_grupo) {
        this.mode = mode;
        this.grupo = { ...grupo };
      }
    },
    loadGrupos() {
      const url = `${baseApiUrl}/cadastro_grupos`;
      axios
        .get(url)
        .then((res) => {
          this.dataGrupos = res.data;
          res.data.forEach((element) => {
            this.dataGruposPai.push(element.nome);
          });
        })
        .catch(showError);
    },
    save() {
      try {
        this.existOuErro(this.grupo.nome, "Preencha o [Grupo].");
      } catch (error) {
        showError(error);
        return;
      }

      const grupoModelo = {
        codigo_grupo: this.grupo.codigo_grupo,
        nome: this.grupo.nome,
        id_grupo_pai: this.grupo.id_grupo_pai,
      };
      const method = this.grupo.codigo_grupo ? "put" : "post";
      const id = this.grupo.codigo_grupo ? `${this.grupo.codigo_grupo}` : "";
      const url = `${baseApiUrl}/cadastro_grupos/${id}`;
      axios[method](url, grupoModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
    remove() {
      const id = this.grupo.codigo_grupo;
      const url = `${baseApiUrl}/cadastro_grupos/${id}`;
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
    grupoPaiValido() {
      if (!this.dataGruposPai.includes(this.grupo.id_grupo_pai)) {
        this.grupo.id_grupo_pai = "";
        showError(
          "O nome do [Grupo pai] que você informou estava inválido, então foi removido."
        );
        return;
      }
    },
  },
  created() {
    this.loadGrupos();
    // AO CLICAR NO BOTÃO DE ALTERAR OU EXCLUIR NA "TabelaExibicaoCadastro", ESSA FUNÇÃO É EXECUTADA
    this.$root.$on("carregaRegistro", (registro, mode) => {
      this.loadGrupo(registro, mode);
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