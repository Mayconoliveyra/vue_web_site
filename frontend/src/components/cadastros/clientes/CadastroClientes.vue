<template>
  <div class="cadastro-clientes">
    <TituloCadastro
      icon="fa fa-users fa-lg"
      titulo="Clientes"
      @criarNovoCadastro="reset(), modeNavegar('save')"
      @cancelarCadastro="reset(), modeNavegar()"
      :mode="mode"
    />

    <b-form v-if="mode !== null" class="form-cadastros">
      <input
        type="hidden"
        id="form-cliente-codigo"
        v-model="cliente.codigo_cliente"
      />
      <!-- INFORMAÇÕES BASICAS -->
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Documento(CPF/CNPJ/RG)"
            label-form="form-cliente-numero_documento"
          >
            <b-input-group size="lg">
              <b-form-input
                id="form-cliente-numero_documento"
                type="text"
                autocomplete="off"
                v-model="cliente.documento"
                required
                :readonly="mode === 'remove'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Nome*" label-form="form-cliente-nome">
            <b-input-group size="lg">
              <b-form-input
                id="form-cliente-nome"
                type="text"
                autocomplete="off"
                v-model="cliente.nome"
                required
                :readonly="mode === 'remove'"
                :class="{ 'is-invalid': inputVazio(cliente.nome) }"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Número de contato"
            label-form="form-cliente-numero-contato"
          >
            <b-input-group size="lg">
              <b-form-input
                id="form-cliente-numero-contato"
                type="text"
                autocomplete="off"
                v-model="cliente.numero_contato"
                required
                :readonly="mode === 'remove'"
                v-mask="'(##) #.####-####'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="E-mail" label-form="form-cliente-contato-email">
            <b-input-group size="lg">
              <b-form-input
                id="form-cliente-contato-email"
                type="text"
                autocomplete="off"
                v-model="cliente.email"
                required
                :readonly="mode === 'remove'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Nascimento" label-form="form-cliente-nascimento">
            <b-input-group size="lg">
              <b-form-input
                id="form-cliente-nascimento"
                type="text"
                autocomplete="off"
                v-model="cliente.nascimento"
                required
                :readonly="mode === 'remove'"
                v-mask="'##/##/####'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- ENDEREÇO -->
      <b-row>
        <b-col sm="12" class="mt-1 d-flex">
          <h5 class="pr-2">
            <i class="fa fa-map-marker pr-1" aria-hidden="true"></i> Endereço
          </h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group label="CEP" label-form="form-cliente-cep">
            <b-input-group>
              <b-input-group size="lg">
                <b-form-input
                  id="form-cliente-cep-"
                  type="text"
                  autocomplete="off"
                  v-model="cliente.cep"
                  required
                  :readonly="mode === 'remove'"
                  v-mask="'#####-###'"
                />
                <b-input-group-append>
                  <b-button
                    :disabled="mode === 'remove'"
                    size="sm"
                    type="button"
                    @click="consultarCEP(cliente.cep)"
                    ><i class="fa fa-search fa-lg" aria-hidden="true"></i
                  ></b-button>
                </b-input-group-append>
              </b-input-group>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Cidade/UF" label-form="form-cliente-cidade-uf">
            <b-input-group size="lg">
              <b-form-input
                id="form-cliente-cidade-uf"
                type="text"
                autocomplete="off"
                v-model="cliente.cidade_uf"
                required
                :readonly="mode === 'remove'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Bairro" label-form="form-cliente-bairro">
            <b-input-group size="lg">
              <b-form-input
                id="'form-cliente-bairro"
                type="text"
                autocomplete="off"
                v-model="cliente.bairro"
                required
                :readonly="mode === 'remove'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Rua" label-form="form-cliente-logradouro">
            <b-input-group size="lg">
              <b-form-input
                id="form-cliente-logradouro"
                type="text"
                autocomplete="off"
                v-model="cliente.logradouro"
                required
                :readonly="mode === 'remove'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Número" label-form="'form-cliente-numero">
            <b-input-group size="lg">
              <b-form-input
                id="form-cliente-numero"
                type="text"
                autocomplete="off"
                v-model="cliente.numero"
                required
                :readonly="mode === 'remove'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Complemento"
            label-form="form-cliente-complemento"
          >
            <b-input-group size="lg">
              <b-form-input
                id="form-cliente-complemento"
                type="text"
                autocomplete="off"
                v-model="cliente.complemento"
                required
                :readonly="mode === 'remove'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- OBERSEVAÇÃO -->
      <b-row>
        <b-col sm="12" class="mt-2">
          <h5>
            <i class="fa fa-pencil-square-o pr-1" aria-hidden="true"></i>
            Observações
          </h5>
        </b-col>
        <b-col cols="12">
          <b-form-group label-form="form-cliente-observacao">
            <b-form-textarea
              id="form-cliente-observacao"
              autocomplete="off"
              rows="4"
              v-model="cliente.observacao"
              :disabled="mode === 'remove'"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group label="Situação" label-form="form-cliente-status">
            <b-input-group size="lg">
              <b-form-select
                id="form-cliente-status"
                v-model="cliente.status"
                :options="['Ativo', 'Inativo']"
                required
                :disabled="mode === 'remove'"
              ></b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <BtnAcaoCadastros :mode="mode" @salvarRegistro="save()" />
    </b-form>
    <div v-show="mode == null">
      <InputPesquisaCadastro />
      <TabelaExibicaoCadastro
        :dataCadastros="dataClientes"
        :totalRows="dataClientes.length"
        :fields="fields"
        :filterOn="filterOn"
        :filterIgnored="filterIgnored"
      />
    </div>
  </div>
</template>

<script>
import TituloCadastro from "../components/TituloCadastro";
import InputPesquisaCadastro from "../components/InputPesquisaCadastro";
import TabelaExibicaoCadastro from "../components/TabelaExibicaoCadastro";
import BtnAcaoCadastros from "../components/BtnAcaoCadastros";
import { baseApiUrl, showError } from "@/../global";
import axios from "axios";

export default {
  components: {
    TituloCadastro,
    InputPesquisaCadastro,
    TabelaExibicaoCadastro,
    BtnAcaoCadastros,
  },
  name: "CadastroClientes",
  data() {
    return {
      mode: null,
      cliente: {},
      dataClientes: [],
      filterOn: [],
      filterIgnored: ["cadastrado_em", "alterado_em"],
      fields: [
        {
          key: "nome",
          label: "Nome",
          sortDirection: "asc",
          sortable: true,
        },
        {
          key: "documento",
          label: "Documento",
          sortable: true,
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          class: "text-center",
        },
      ],
    };
  },
  methods: {
    modeNavegar(mode = null) {
      // SE O MODO FOR SALVAR, SETA OS CAMPOS PADRÃO NO FORMULARIO
      if (mode == "save") {
        this.cliente = {
          nome: "",
          status: "Ativo",
        };
      }
      this.mode = mode;
    },
    // SÓ FAZ UMA NOVA REQUISIÇÃO AO BACKEND SE EXCLUIR UM REGISTRO OU EDITAR "atualizaData"
    reset(mode = null) {
      this.cliente = {};
      this.modeNavegar();
      if (mode === "atualizaData") {
        this.dataClientes = [];
        this.loadClientes();
      }
    },
    loadCliente(cliente, mode = null) {
      if (cliente.codigo_cliente) {
        this.mode = mode;
        this.cliente = { ...cliente };
      }
    },
    loadClientes() {
      const url = `${baseApiUrl}/cadastro_clientes`;
      axios
        .get(url)
        .then((res) => {
          this.dataClientes = res.data;
        })
        .catch(showError);
    },
    save() {
      try {
        this.existOuErro(this.cliente.nome, "Preencha o [Nome] do cliente.");
      } catch (error) {
        showError(error);
        return;
      }
      const clienteModelo = {
        codigo_cliente: this.cliente.codigo_cliente,
        documento: this.cliente.documento,
        nome: this.cliente.nome,
        numero_contato: this.cliente.numero_contato,
        email: this.cliente.email,
        nascimento: this.cliente.nascimento,
        cep: this.cliente.cep,
        logradouro: this.cliente.logradouro,
        numero: this.cliente.numero,
        complemento: this.cliente.complemento,
        bairro: this.cliente.bairro,
        cidade_uf: this.cliente.cidade_uf,
        observacao: this.cliente.observacao,
        status: this.cliente.status,
        cadastrado_em: this.cliente.cadastrado_em,
        alterado_em: this.cliente.alterado_em,
      };
      console.log(clienteModelo);
      const method = this.cliente.codigo_cliente ? "put" : "post";
      const id = this.cliente.codigo_cliente
        ? `${this.cliente.codigo_cliente}`
        : "";
      const url = `${baseApiUrl}/cadastro_clientes/${id}`;
      axios[method](url, clienteModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
    remove() {
      const id = this.cliente.codigo_cliente;
      const url = `${baseApiUrl}/cadastro_clientes/${id}`;
      axios
        .delete(url)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
    inputVazio(elemento) {
      if (elemento.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    existOuErro(valor, msg) {
      if (!valor.toString().trim().length > 0) {
        throw msg;
      }
    },
    /*  consultarCEP(cep) {
      if (cep) {
        const url = `https://cors-anywhere.herokuapp.com/www.viacep.com.br/ws/${cep}/json/`;
        axios
          .get(url)
          .then((res) => {
            this.cliente.logradouro = res.data.logradouro;
            this.cliente.complemento = res.data.complemento;
            this.cliente.bairro = res.data.bairro;
              this.cliente.cidade_uf = `${res.data.localidade} (${res.data.uf})`;
            this.$forceUpdate();
          })
          .catch(showError);
      }
    },
    consultarCNPJ(cnpj) {
      if (cnpj) {
        const url = `https://cors-anywhere.herokuapp.com/www.receitaws.com.br/v1/cnpj/${this.formateSoNumero(
          cnpj
        )}`;
        axios
          .get(url)
          .then((res) => {
            this.cliente.nome = res.data.fantasia
              ? res.data.fantasia
              : res.data.nome;
            this.cliente.razao_social = res.data.nome;
            this.cliente.contato_comercial = res.data.telefone;
            this.cliente.email = res.data.email;
            this.cliente.nascimento = res.data.abertura;

            this.dataEnderecos[0].cep = this.formateSoNumero(res.data.cep);
            this.dataEnderecos[0].logradouro = res.data.logradouro;
            this.dataEnderecos[0].complemento = res.data.complemento;
            this.dataEnderecos[0].bairro = res.data.bairro;
            this.dataEnderecos[0].numero = res.data.numero;
            this.dataEnderecos[0].cidade_uf = `${res.data.municipio} (${res.data.uf})`;
            this.$forceUpdate();
          })
          .catch(showError);
      }
    }, */
    formateSoNumero(value) {
      if (!value) return value;
      if (Array.isArray(value) && value.length === 0) return value;
      if (typeof value === "string" && !value.trim()) return value;
      return value.replace(/[^\d]+/g, "");
    },
  },
  created() {
    this.loadClientes();
    // AO CLICAR NO BOTÃO DE ALTERAR OU EXCLUIR NA "TabelaExibicaoCadastro", ESSA FUNÇÃO É EXECUTADA
    this.$root.$on("carregaRegistro", (registro, mode) => {
      this.loadCliente(registro, mode);
    });
  },
};
</script>

<style>
</style>