<template>
  <b-container fluid class="cadastro-mercadorias">
    <TituloCadastro
      icon="fa fa-cube fa-lg"
      titulo="Produtos"
      @criarNovoCadastro="reset(), modeNavegar('save')"
      @cancelarCadastro="reset(), modeNavegar()"
      :mode="mode"
    />
    <b-form v-if="mode !== null">
      <input
        type="hidden"
        id="form-mercadoria-codigo"
        v-model="mercadoria.codigo_mercadoria"
      />
      <b-card no-body class="tbodyCard">
        <b-tabs card pills justified>
          <!-- ####################  DADOS  #################### -->
          <b-tab title="Dados" active class="p-2">
            <DadosGerais :mercadoria="mercadoria" :mode="mode" />
          </b-tab>
          <!-- #######################  ESTOQUE / VALORES  #################### -->
          <b-tab title="Estoque / Valores" class="p-2">
            <EstoqueValores
              :mercadoria="mercadoria"
              :dataCamposExtras="dataCamposExtras"
              :mode="mode"
            />
          </b-tab>
          <!-- ################################  FORNECEDORES  #################### -->
          <!--  <b-tab
            title="Fornecedores"
            :disabled="!mercadoria.codigo_mercadoria"
            v-if="mercadoria.codigo_mercadoria"
            class="p-2"
          >
            <Fornecedores
              :mercadoria="mercadoria"
              :dataMercadoriaFornecedores="dataMercadoriaFornecedores"
              :mode="mode"
            />
          </b-tab> -->
        </b-tabs>
      </b-card>
      <BtnAcaoCadastros
        :mode="mode"
        @salvarRegistro="save()"
        @cancelarRegistro="reset()"
        @excluirRegistro="remove()"
      />
    </b-form>

    <div v-show="mode == null">
      <InputPesquisaCadastro />
      <!-- FILTROS  -->
      <!--  <b-row class="mt-3">
        <b-col cols="12" align="center">
          <b-form-group>
            <b-form-checkbox-group size="lg" v-model="filterOn" switches>
              <b-form-checkbox class="pr-4" value="codigo_mercadoria"
                >Código</b-form-checkbox
              >
              <b-form-checkbox class="pr-4" value="mercadoria"
                >Nome</b-form-checkbox
              >
              <b-form-checkbox class="pr-4" value="grupo_produto"
                >Grupo</b-form-checkbox
              >
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row> -->
      <TabelaExibicaoCadastro
        :dataCadastros="dataMercadorias"
        :totalRows="dataMercadorias.length"
        :fields="fieldsMercadorias"
        :filterOn="filterOn"
        :filterIgnored="filterIgnored"
      />
    </div>
  </b-container>
</template>

<script>
import TituloCadastro from "../components/TituloCadastro";
import InputPesquisaCadastro from "../components/InputPesquisaCadastro";
import TabelaExibicaoCadastro from "../components/TabelaExibicaoCadastro";
import BtnAcaoCadastros from "../components/BtnAcaoCadastros";
import DadosGerais from "./components/DadosGerais";
import EstoqueValores from "./components/EstoqueValores";
/* import Fornecedores from "./components/Fornecedores"; */

import { baseApiUrl, showError } from "@/../global";
import axios from "axios";

export default {
  components: {
    TituloCadastro,
    InputPesquisaCadastro,
    TabelaExibicaoCadastro,
    BtnAcaoCadastros,
    DadosGerais,
    EstoqueValores,
  },
  name: "CadastroMercadorias",
  data() {
    return {
      mode: null,
      mercadoria: {},
      dataMercadorias: [],
      dataMercadoriaFornecedores: [],
      filterOn: [],
      filterIgnored: ["cadastrado_em", "alterado_em"],
      fieldsMercadorias: [
        /*    {
          key: "codigo_interno",
          label: "Cód. interno",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        }, */
        {
          key: "mercadoria",
          label: "Descrição",
          sortDirection: "asc",
          sortable: true,
        },
        {
          key: "preco_venda",
          label: "Preço",
          sortDirection: "asc",
          sortable: true,
          formatter: (valor) => {
            return (
              "R$ " +
              Number(valor)
                .toFixed(2)
                .replace(".", ",")
                .replace(/(\d)(?=(\d{3})+,)/g, "$1.")
            );
          },
        },
        {
          key: "estoque_atual",
          label: "Estoque",
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
        this.mercadoria = {
          mercadoria: "",
          codigo_interno: "",
          grupo_produto: "Selecione",
          marca_produto: "Selecione",
          unidade_medida: "UN",
          status_produto: "Ativa",
          produto_ativo: true,
          valor_custo: 0,
        };
      }
      this.mode = mode;
    },
    // SÓ FAZ UMA NOVA REQUISIÇÃO AO BACKEND SE EXCLUIR UM REGISTRO OU EDITAR "atualizaData"
    reset(mode = null) {
      this.mercadoria = {};
      this.dataCamposExtras = [];
      this.dataMercadoriaFornecedores = [];
      this.modeNavegar();
      if (mode === "atualizaData") {
        this.dataMercadorias = [];
        this.loadMercadorias();
      }
    },
    loadMercadoria(mercadoria, mode = null) {
      if (mercadoria.codigo_mercadoria) {
        /*  carrega os fornecedores vinculado a mecadoria */
        const id = mercadoria.codigo_mercadoria;
        const url = `${baseApiUrl}/cadastro_mercadorias_mercadoria_fornecedor/${id}`;
        axios
          .get(url)
          .then((res) => {
            this.dataMercadoriaFornecedores = res.data;
          })
          .catch(showError);

        this.mode = mode;
        this.mercadoria = { ...mercadoria };
        this.dataCamposExtras = mercadoria.campos_extras;
      }
    },
    loadMercadorias() {
      const url = `${baseApiUrl}/cadastro_mercadorias`;
      axios
        .get(url)
        .then((res) => {
          this.dataMercadorias = res.data;
        })
        .catch(showError);
    },
    save() {
      {
        /* VALIDAR CAMPOS */
        if (!this.mercadoria.mercadoria.trim())
          return showError("Preencha o [Nome do Produto].");
        if (!this.mercadoria.codigo_interno.toString().trim())
          return showError("Preencha o [Código interno].");
        if (!this.mercadoria.unidade_medida.trim())
          return showError("Preencha a [Unidade medida].");
        if (!this.mercadoria.valor_custo)
          return showError("Preencha a [Valor de custo].");
      }

      // REMOVE TODOS OS OS ELEMENTOS QUE ESTIVEREM DUPLICADOS NO ARRAY
      this.dataCamposExtras = this.dataCamposExtras.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
      }, Object.create(null));
      this.dataMercadoriaFornecedores = this.dataMercadoriaFornecedores.filter(
        function (a) {
          return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        },
        Object.create(null)
      );
      this.dataMercadoriaFornecedores = this.dataMercadoriaFornecedores.filter(
        (element) => {
          if (
            element.nome_fantasia == "" ||
            element.codigo_mercadoria_fornecedor == "" ||
            element.quantidade_converter == ""
          ) {
            false;
          } else {
            return true;
          }
        }
      );
      this.dataCamposExtras = this.dataCamposExtras.filter((element) => {
        if (element.conteudo == "" || element.descricao == "") {
          false;
        } else {
          return true;
        }
      });

      const mercadoriaModelo = {
        codigo_mercadoria: this.mercadoria.codigo_mercadoria,
        mercadoria: this.mercadoria.mercadoria,
        codigo_interno: this.mercadoria.codigo_interno.toString(),
        codigo_barras: this.mercadoria.codigo_barras,
        grupo_produto: this.mercadoria.grupo_produto,
        movimenta_estoque: this.mercadoria.movimenta_estoque,
        variacoes: this.mercadoria.variacoes,
        composicao: this.mercadoria.composicao,
        unidade_medida: this.mercadoria.unidade_medida,
        estoque_minimo: this.mercadoria.estoque_minimo,
        estoque_maximo: this.mercadoria.estoque_maximo,
        estoque_atual: this.mercadoria.estoque_atual,
        peso: this.mercadoria.peso,
        largura: this.mercadoria.largura,
        altura: this.mercadoria.altura,
        comprimento: this.mercadoria.comprimento,
        produto_ativo: this.mercadoria.produto_ativo,
        comissao: this.mercadoria.comissao,
        /* ARRAY COM CAMPOS EXTRAS */
        campos_extras: this.dataCamposExtras,
        descricao: this.mercadoria.descricao,
        valor_custo: this.mercadoria.valor_custo,
        valor_despesas: this.mercadoria.valor_despesas,
        valor_outras_despesas: this.mercadoria.valor_outras_despesas,
        valor_custo_final: this.mercadoria.valor_custo_final,

        /* PRECOS DE VENDA */
        preco_venda: this.mercadoria.preco_venda,
        preco_venda_f1: this.mercadoria.preco_venda_f1,
        preco_venda_f2: this.mercadoria.preco_venda_f2,
        preco_venda_f3: this.mercadoria.preco_venda_f3,
        margem_venda: this.mercadoria.margem_venda,
        margem_venda_f1: this.mercadoria.margem_venda_f1,
        margem_venda_f2: this.mercadoria.margem_venda_f2,
        margem_venda_f3: this.mercadoria.margem_venda_f3,

        cadastrado_em: this.mercadoria.cadastrado_em,
        alterado_em: this.mercadoria.alterado_em,

        /* ARRAY COM FONECEDORES */
        fornecedores: this.dataMercadoriaFornecedores,
      };

      const method = this.mercadoria.codigo_mercadoria ? "put" : "post";
      const id = this.mercadoria.codigo_mercadoria
        ? `${this.mercadoria.codigo_mercadoria}`
        : "";
      const url = `${baseApiUrl}/cadastro_mercadorias/${id}`;
      axios[method](url, mercadoriaModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
    remove() {
      const id = this.mercadoria.codigo_mercadoria;
      const url = `${baseApiUrl}/cadastro_mercadorias/${id}`;
      axios
        .delete(url)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
  },
  created() {
    this.loadMercadorias();
    // AO CLICAR NO BOTÃO DE ALTERAR OU EXCLUIR NA "TabelaExibicaoCadastro", ESSA FUNÇÃO É EXECUTADA
    this.$root.$on("carregaRegistro", (registro, mode) => {
      this.loadMercadoria(registro, mode);
    });
  },
};
</script>

<style>
.cadastro-mercadorias .nav-link {
  color: rgb(0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0.213);
  margin: 2px 2px;
}
.cadastro-mercadorias .tbodyCard {
  background-color: #f5f5f5;
}
</style>