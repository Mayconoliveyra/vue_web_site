<template>
  <b-container fluid class="cadastro-compras">
    <TituloCadastroCompras
      icon="fa fa-cart-arrow-down fa-lg"
      titulo="Cadastro de compras"
      @importarXML="reset(), modeNavegar('ImportarXML')"
      @cancelarCadastro="reset(), modeNavegar()"
      :mode="mode"
    />
    <div v-if="mode == null">
      <InputPesquisaCompras />
      <!-- FILTROS  -->
      <b-row class="mt-3">
        <b-col cols="12" align="center">
          <b-form-group>
            <b-form-checkbox-group size="lg" v-model="filterOn" switches>
              <b-form-checkbox class="pr-4" value="codigo_compra"
                >Código</b-form-checkbox
              >
              <b-form-checkbox class="pr-4" value="razao_social"
                >Fornecedor</b-form-checkbox
              >
              <b-form-checkbox class="pr-4" value="numero_nfe"
                >Nº NF-e</b-form-checkbox
              >
              <b-form-checkbox value="chave_acesso"
                >Chave acesso</b-form-checkbox
              >
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <TabelaExibicaoCompras
        :dataCadastros="dataCompras"
        :totalRows="dataCompras.length"
        :fields="fieldscompras"
        :filterOn="filterOn"
        :filterIgnored="filterIgnored"
      />
    </div>

    <FormularioCompra v-if="mode == 'Compra'" :compra="compra" :mode="mode" />
    <ImportaNotaXML v-if="mode == 'ImportarXML'" :mode="mode" />
  </b-container>
</template>

<script>
import TituloCadastroCompras from "./componets/TituloCadastroCompras";
import TabelaExibicaoCompras from "./componets/TabelaExibicaoCompras";
import InputPesquisaCompras from "./componets/InputPesquisaCompras";
import FormularioCompra from "./FormularioCompra";
import ImportaNotaXML from "./ImportaNotaXML";

import { baseApiUrl, showError } from "@/../global";
import axios from "axios";
import moment from "moment";

export default {
  name: "CadastroCompras",
  components: {
    TituloCadastroCompras,
    TabelaExibicaoCompras,
    InputPesquisaCompras,
    FormularioCompra,
    ImportaNotaXML,
  },
  data() {
    return {
      mode: null,
      compra: {},
      dataCompras: [],
      datacompraFornecedores: [],
      dataProdutos: [],
      filterOn: [],
      filterIgnored: [
        "cadastrado_em",
        "alterado_em",
        "nota_xml_original_completa",
        "data_entrada",
        "data_emissao",
      ],
      fieldscompras: [
        {
          key: "codigo_compra",
          label: "Código",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "razao_social",
          label: "Fornecedor",
          sortDirection: "asc",
          sortable: true,
        },
        {
          key: "data_emissao",
          label: "Data de emissão",
          sortDirection: "asc",
          sortable: true,
          formatter: (valor) => {
            return moment(valor, "YYYY-MM-DD").format("DD/MM/YYYY");
          },
        },
        {
          key: "total_nota",
          label: "Valor(R$)",
          sortDirection: "asc",
          sortable: true,
          formatter: (valor) => {
            return Number(valor)
              .toFixed(2)
              .replace(".", ",")
              .replace(/(\d)(?=(\d{3})+,)/g, "$1.");
          },
        },
        {
          key: "numero_nfe",
          label: "NF-e",
          sortDirection: "asc",
          sortable: true,
        },
        {
          key: "status",
          label: "Situação",
          sortDirection: "asc",
          sortable: true,
        },
        {
          key: "actions",
          label: "Ações",
          class: "text-center css-btn-acao",
        },
      ],
    };
  },
  methods: {
    modeNavegar(mode = null) {
      this.mode = mode;
    },
    // SÓ FAZ UMA NOVA REQUISIÇÃO AO BACKEND SE EXCLUIR UM REGISTRO OU EDITAR "atualizaData"
    reset(mode = null) {
      this.compra = {};
      /* this.modeNavegar(); */
      if (mode === "atualizaData") {
        console.log("chamou");
        this.dataCompras = [];
        this.loadCompras();
      }
    },
    loadCompra(compra, mode = null) {
      if (compra.codigo_compra) {
        this.mode = mode;
        this.compra = { ...compra };
      }
    },
    loadCompras() {
      const url = `${baseApiUrl}/cadastro_compras`;
      axios
        .get(url)
        .then((res) => {
          this.dataCompras = res.data;
        })
        .catch(showError);
    },
  },
  created() {
    this.loadCompras();
    // AO CLICAR NO BOTÃO DE ALTERAR OU EXCLUIR NA "TabelaExibicaoCadastro", ESSA FUNÇÃO É EXECUTADA
    this.$root.$on("carregaRegistroCompra", (registro, mode) => {
      this.loadCompra(registro, mode);
    });

    /* AO IMPORTAR UMA NOVA NOTA ESSSA FUNÇÃO É CHAMADA PRA ATUALIZAR O DATA DAS COMPRAS  */
    this.$root.$on("atualizaDataCompras", () => {
      /*  SE O MODO DE NAVEGAÇÃO TIVER COMO 'ImportarXML' AI CLICAR NO BOTÃO DE CANCELAR ATUALIZA O DATA */
      if (this.mode === "ImportarXML") {
        this.loadCompras();
      }
    });
  },
};
</script>

<style >
.css-btn-acao {
  width: 150px;
}
</style>