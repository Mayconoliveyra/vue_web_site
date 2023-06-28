<template>
  <b-container fluid class="cadastro-fornecedores">
    <TituloCadastro
      icon="fa fa-truck fa-lg"
      titulo="Cadastro de fornecedores"
      @criarNovoCadastro="reset(), modeNavegar('save')"
      @cancelarCadastro="reset(), modeNavegar()"
      :mode="mode"
    />

    <b-form v-if="mode !== null" class="form-cadastros">
      <h5><i class="fa fa-list-alt mr-1"></i> Dados gerais</h5>
      <InforDropdownCadastro
        :dataInfor_codigo="fornecedor.codigo_fornecedor"
        :dataInfor_alterado="fornecedor.alterado_em"
        :dataInfor_cadastrado="fornecedor.cadastrado_em"
      />
      <input
        type="hidden"
        id="form-fornecedor-codigo"
        v-model="fornecedor.codigo_fornecedor"
      />
      <!-- INFORMAÇÕES BASICAS -->
      <b-row>
        <b-col cols="12" md="6" lg="2">
          <b-form-group
            label="Tipo de fornecedor"
            label-form="form-fornecedor-pessoa"
          >
            <b-form-select
              id="form-fornecedor-pessoa"
              v-model="fornecedor.pessoa"
              :options="[
                'Selecione',
                'Pessoa física',
                'Pessoa jurídica',
                'Estrangeiro',
              ]"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="2">
          <b-form-group label="Situação" label-form="form-fornecedor-status">
            <b-form-select
              id="form-fornecedor-status"
              v-model="fornecedor.ativo"
              :options="['Ativo', 'Inativo']"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-form-group
            label="Nome fantasia*"
            label-form="form-fornecedor-nome"
          >
            <b-form-input
              id="form-fornecedor-nome"
              type="text"
              autocomplete="off"
              v-model="fornecedor.nome"
              required
              :readonly="mode === 'remove'"
              :class="{ 'is-invalid': state(!fornecedor.nome.length > 0) }"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Razão social" label-form="form-fornecedor-razao">
            <b-form-input
              id="form-fornecedor-razao"
              type="text"
              autocomplete="off"
              v-model="fornecedor.razao_social"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="2">
          <b-form-group
            label="Telefone comercial"
            label-form="form-fornecedor-contato-comercial"
          >
            <b-form-input
              id="form-fornecedor-contato-comercial"
              type="text"
              autocomplete="off"
              v-model="fornecedor.contato_comercial"
              required
              :readonly="mode === 'remove'"
              v-mask="'(##) ####-####'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="2">
          <b-form-group
            label="Telefone celular"
            label-form="form-fornecedor-contato-celular"
          >
            <b-form-input
              id="form-fornecedor-contato-celular"
              type="text"
              autocomplete="off"
              v-model="fornecedor.contato_celular"
              required
              :readonly="mode === 'remove'"
              v-mask="'(##) #.####-####'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="5">
          <b-form-group
            label="E-mail"
            label-form="form-fornecedor-contato-email"
          >
            <b-form-input
              id="form-fornecedor-contato-email"
              type="text"
              autocomplete="off"
              v-model="fornecedor.email"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Responsável"
            label-form="form-fornecedor-responsavel"
          >
            <b-form-input
              id="form-fornecedor-responsavel"
              type="text"
              autocomplete="off"
              v-model="fornecedor.responsavel"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- INFORMAÇÕES AVANÇADAS TIPO fornecedor=  PESSOA JURIDICA-->
      <b-row v-if="fornecedor.pessoa == 'Pessoa jurídica'">
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="CNPJ" label-form="form-fornecedor-cnpj">
            <b-input-group>
              <b-form-input
                id="form-fornecedor-cnpj"
                type="text"
                autocomplete="off"
                v-model="fornecedor.cpf_cnpj"
                required
                :readonly="mode === 'remove'"
                v-mask="'##.###.###/####-##'"
              />
              <b-input-group-append>
                <b-button
                  @click="consultarCNPJ(fornecedor.cpf_cnpj)"
                  :disabled="mode === 'remove'"
                  size="sm"
                  type="button"
                  ><i class="fa fa-search fa-lg" aria-hidden="true"></i
                ></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Tipo de contribuinte"
            label-form="form-fornecedor-tipo-contribuinte"
          >
            <b-form-select
              id="form-fornecedor-tipo-contribuinte"
              v-model="fornecedor.tipo_contribuinte"
              :options="[
                'Selecione',
                'Contribuinte ICMS',
                'Contribuinte ISENTO',
                'Não contribuinte',
              ]"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Inscrição estadual"
            label-form="form-fornecedor-ie"
          >
            <b-form-input
              id="form-fornecedor-ie"
              type="text"
              autocomplete="off"
              v-model="fornecedor.inscricao_estadual"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Inscrição municipal"
            label-form="form-fornecedor-im"
          >
            <b-form-input
              id="form-fornecedor-im"
              type="text"
              autocomplete="off"
              v-model="fornecedor.inscricao_municipal"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- INFORMAÇÕES AVANÇADAS  TIPO fornecedor= PESSOA FISICA-->
      <b-row v-if="fornecedor.pessoa == 'Pessoa física'">
        <b-col cols="12" md="6" lg="2">
          <b-form-group label="CPF" label-form="form-fornecedor-cpf">
            <b-form-input
              id="form-fornecedor-cpf"
              type="text"
              autocomplete="off"
              v-model="fornecedor.cpf_cnpj"
              required
              :readonly="mode === 'remove'"
              v-mask="'###.###.###-##'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="2">
          <b-form-group label="RG" label-form="form-fornecedor-rg">
            <b-form-input
              id="form-fornecedor-rg"
              type="text"
              autocomplete="off"
              v-model="fornecedor.rg"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Tipo de contribuinte"
            label-form="form-fornecedor-tipo-contribuinte"
          >
            <b-form-select
              id="form-fornecedor-tipo-contribuinte"
              v-model="fornecedor.tipo_contribuinte"
              :options="[
                'Selecione',
                'Contribuinte ICMS',
                'Contribuinte ISENTO',
                'Não contribuinte',
              ]"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Inscrição estadual"
            label-form="form-fornecedor-ie"
          >
            <b-form-input
              id="form-fornecedor-ie"
              type="text"
              autocomplete="off"
              v-model="fornecedor.inscricao_estadual"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="2">
          <b-form-group
            label="Inscrição municipal"
            label-form="form-fornecedor-im"
          >
            <b-form-input
              id="form-fornecedor-im"
              type="text"
              autocomplete="off"
              v-model="fornecedor.inscricao_municipal"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- INFORMAÇÕES AVANÇADAS  TIPO fornecedor= PESSOA ESTRANGEIRO-->
      <b-row v-if="fornecedor.pessoa == 'Estrangeiro'">
        <b-col sm="6" lg="2">
          <b-form-group
            label="Documento"
            label-form="form-fornecedor-documento"
          >
            <b-form-input
              id="form-fornecedor-documento"
              type="number"
              autocomplete="off"
              required
              v-model="fornecedor.cpf_cnpj"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="2">
          <b-form-group label="RG" label-form="form-fornecedor-rg">
            <b-form-input
              id="form-fornecedor-rg"
              type="text"
              autocomplete="off"
              v-model="fornecedor.rg"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Tipo de contribuinte"
            label-form="form-fornecedor-tipo-contribuinte"
          >
            <b-form-select
              id="form-fornecedor-tipo-contribuinte"
              v-model="fornecedor.tipo_contribuinte"
              :options="[
                'Selecione',
                'Contribuinte ICMS',
                'Contribuinte ISENTO',
                'Não contribuinte',
              ]"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Inscrição estadual"
            label-form="form-fornecedor-ie"
          >
            <b-form-input
              id="form-fornecedor-ie"
              type="text"
              autocomplete="off"
              v-model="fornecedor.inscricao_estadual"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="2">
          <b-form-group
            label="Inscrição municipal"
            label-form="form-fornecedor-im"
          >
            <b-form-input
              id="form-fornecedor-im"
              type="text"
              autocomplete="off"
              v-model="fornecedor.inscricao_municipal"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- ENDEREÇOS -->
      <b-row>
        <b-col sm="12" class="mt-2 d-flex">
          <h5 class="mr-2">
            <i class="fa fa-map-marker mr-1" aria-hidden="true"></i> Endereços
          </h5>
          <b-button
            @click="addEndereco()"
            :disabled="mode === 'remove'"
            class="btn_CamposExtras"
            type="button"
            variant="primary"
          >
            Adicionar
          </b-button>
        </b-col>
      </b-row>
      <div class="border rounded-lg p-1">
        <b-row v-for="(endereco, k) in dataEnderecos" :key="k">
          <b-col v-if="k >= 1" cols="12"> <hr class="m-0 mb-1" /> </b-col>
          <b-col cols="12" class="d-flex">
            <div class="flex-grow-1 mr-5" />
            <b-button
              @click="removeEndereco(k)"
              :disabled="mode === 'remove'"
              class="btn_CamposExtras"
              size="sm"
              type="button"
              variant="danger"
            >
              Excluir
            </b-button>
          </b-col>
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              label="Tipo"
              :label-form="'form-fornecedor-tipo-endeco-' + k"
            >
              <b-form-select
                :id="'form-fornecedor-tipo-endeco-' + k"
                v-model="endereco.tipo"
                :options="[
                  'Selecione',
                  'Comercial',
                  'Residencial',
                  'Entrega',
                  'Outros',
                ]"
                size="sm"
                required
                :disabled="mode === 'remove'"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="3">
            <b-form-group label="CEP" :label-form="'form-fornecedor-cep-' + k">
              <b-input-group>
                <b-form-input
                  :id="'form-fornecedor-cep-' + k"
                  type="text"
                  autocomplete="off"
                  v-model="endereco.cep"
                  required
                  :readonly="mode === 'remove'"
                  v-mask="'#####-###'"
                />
                <b-input-group-append>
                  <b-button
                    @click="consultarCEP(endereco.cep, k)"
                    :disabled="mode === 'remove'"
                    size="sm"
                    type="button"
                    ><i class="fa fa-search fa-lg" aria-hidden="true"></i
                  ></b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="5">
            <b-form-group
              label="Logradouro"
              :label-form="'form-fornecedor-rua-' + k"
            >
              <b-form-input
                :id="'form-fornecedor-rua-' + k"
                type="text"
                autocomplete="off"
                v-model="endereco.logradouro"
                required
                :readonly="mode === 'remove'"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              label="Número"
              :label-form="'form-fornecedor-numero-' + k"
            >
              <b-form-input
                :id="'form-fornecedor-numero-' + k"
                type="text"
                autocomplete="off"
                v-model="endereco.numero"
                required
                :readonly="mode === 'remove'"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="12" lg="6">
            <b-form-group
              label="Complemento"
              :label-form="'form-fornecedor-complemento-' + k"
            >
              <b-form-input
                :id="'form-fornecedor-complemento-' + k"
                type="text"
                autocomplete="off"
                v-model="endereco.complemento"
                required
                :readonly="mode === 'remove'"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              label="Bairro"
              :label-form="'form-fornecedor-bairro-' + k"
            >
              <b-form-input
                :id="'form-fornecedor-bairro-' + k"
                type="text"
                autocomplete="off"
                v-model="endereco.bairro"
                required
                :readonly="mode === 'remove'"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              label="Cidade/UF"
              :label-form="'form-fornecedor-cidade-uf-' + k"
            >
              <b-form-input
                :id="'form-fornecedor-cidade-uf-' + k"
                type="text"
                autocomplete="off"
                v-model="endereco.cidade_uf"
                required
                :readonly="mode === 'remove'"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <!-- CONTATOS -->
      <b-row>
        <b-col sm="12" class="mt-4 d-flex">
          <h5 class="mr-2">
            <i class="fa fa-address-card-o mr-1" aria-hidden="true"></i>
            Contatos
          </h5>
          <b-button
            @click="addContato()"
            class="btn_CamposExtras"
            type="button"
            variant="primary"
            :disabled="mode === 'remove'"
          >
            Adicionar
          </b-button>
        </b-col>
      </b-row>
      <div class="border rounded-lg p-1">
        <b-row v-for="(contato, k) in dataContatos" :key="k">
          <b-col v-if="k >= 1" cols="12"> <hr class="m-0 mb-1" /> </b-col>
          <b-col cols="12" class="d-flex">
            <div class="flex-grow-1 mr-5" />
            <b-button
              @click="removeContato(k)"
              class="btn_CamposExtras"
              size="sm"
              type="button"
              variant="danger"
              :disabled="mode === 'remove'"
            >
              Excluir
            </b-button>
          </b-col>
          <b-col cols="12" md="4" lg="3">
            <b-form-group
              label="Tipo"
              :label-form="'form-fornecedor-contato-tipo-' + k"
            >
              <b-form-select
                :id="'form-fornecedor-contato-tipo-' + k"
                v-model="contato.tipo"
                :options="[
                  'Selecione',
                  'Telefone celular',
                  'Telefone fixo',
                  'E-mail',
                  'WhatsApp',
                  'Facebook',
                  'Instagram',
                  'Outros',
                ]"
                size="sm"
                required
                :disabled="mode === 'remove'"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="8" lg="4">
            <b-form-group
              label="Nome"
              :label-form="'form-fornecedor-contato-nome-' + k"
            >
              <b-form-input
                :id="'form-fornecedor-contato-nome-' + k"
                type="text"
                autocomplete="off"
                v-model="contato.nome"
                required
                :readonly="mode === 'remove'"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="12" lg="5">
            <b-form-group
              label="Contato"
              :label-form="'form-fornecedor-contato-contato-' + k"
            >
              <b-form-input
                :id="'form-fornecedor-contato-contato-' + k"
                type="text"
                autocomplete="off"
                v-model="contato.contato"
                required
                :readonly="mode === 'remove'"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Observação"
              :label-form="'form-fornecedor-contato-observacao-' + k"
            >
              <b-form-input
                :id="'form-fornecedor-contato-observacao-' + k"
                type="text"
                autocomplete="off"
                v-model="contato.observacao"
                required
                :readonly="mode === 'remove'"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <!-- OBERSEVAÇÃO -->
      <b-row>
        <b-col sm="12" class="mt-2">
          <h5>
            <i class="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>
            Observações
          </h5>
        </b-col>
        <b-col cols="12">
          <b-form-group label-form="form-fornecedor-observacao">
            <b-form-textarea
              id="form-fornecedor-observacao"
              autocomplete="off"
              rows="4"
              v-model="fornecedor.observacao"
              :disabled="mode === 'remove'"
            ></b-form-textarea>
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
    <div v-show="mode == null">
      <InputPesquisaCadastro />
      <!-- FILTROS  -->
      <b-row class="mt-3">
        <b-col cols="12" align="center">
          <b-form-group>
            <b-form-checkbox-group size="lg" v-model="filterOn" switches>
              <b-form-checkbox class="pr-4" value="codigo_fornecedor"
                >Código</b-form-checkbox
              >
              <b-form-checkbox class="pr-4" value="nome"
                >Fantasia</b-form-checkbox
              >
              <b-form-checkbox class="pr-4" value="razao_social"
                >Razão</b-form-checkbox
              >
              <b-form-checkbox value="cpf_cnpj">CPF/CNPJ</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <TabelaExibicaoCadastro
        :dataCadastros="dataFornecedores"
        :totalRows="dataFornecedores.length"
        :fields="fieldsFornecedores"
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
import InforDropdownCadastro from "../components/InforDropdownCadastro";
import { baseApiUrl, showError } from "@/../global";
import axios from "axios";

export default {
  components: {
    TituloCadastro,
    InputPesquisaCadastro,
    TabelaExibicaoCadastro,
    BtnAcaoCadastros,
    InforDropdownCadastro,
  },
  name: "CadastroFornecedores",
  data() {
    return {
      mode: null,
      fornecedor: {},
      dataFornecedores: [],
      dataEnderecos: [{}],
      dataContatos: [{}],
      filterOn: [],
      filterIgnored: ["cadastrado_em", "alterado_em", "deletado_em"],
      fieldsFornecedores: [
        {
          key: "codigo_fornecedor",
          label: "Código",
          sortable: true,
          sortDirection: "asc",
          class: "text-center",
        },
        {
          key: "nome",
          label: "Nome fantasia",
          sortDirection: "asc",
          sortable: true,
        },
        {
          key: "cpf_cnpj",
          label: "CPF/CNPJ",
          sortable: true,
          formatter: (value) => {
            if (String(value).length == 14) {
              return value.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                "$1.$2.$3/$4-$5"
              );
            }
            if (String(value).length == 11) {
              return value.replace(
                /^(\d{3})(\d{3})(\d{3})(\d{2})/,
                "$1.$2.$3-$4"
              );
            } else {
              return value;
            }
          },
        },
        {
          key: "responsavel",
          label: "Responsável",
          sortable: true,
        },
        {
          key: "ativo",
          label: "Status",
          sortable: true,
          class: "text-center",
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
        this.fornecedor = {
          pessoa: "Selecione",
          nome: "",
          ativo: "Ativo",
          tipo_contribuinte: "Selecione",
        };
      }
      this.mode = mode;
    },
    // SÓ FAZ UMA NOVA REQUISIÇÃO AO BACKEND SE EXCLUIR UM REGISTRO OU EDITAR "atualizaData"
    reset(mode = null) {
      this.fornecedor = {};
      this.dataEnderecos = [{ tipo: "Selecione" }];
      this.dataContatos = [{ tipo: "Selecione" }];
      this.modeNavegar();
      if (mode === "atualizaData") {
        this.dataFornecedores = [];
        this.loadFornecedores();
      }
    },
    loadfornecedor(fornecedor, mode = null) {
      if (fornecedor.codigo_fornecedor) {
        this.mode = mode;
        this.fornecedor = { ...fornecedor };
        this.dataEnderecos = fornecedor.enderecos;
        this.dataContatos = fornecedor.contatos;
      }
    },
    loadFornecedores() {
      const url = `${baseApiUrl}/cadastro_fornecedores`;

      axios
        .get(url)
        .then((res) => {
          this.dataFornecedores = res.data;
        })
        .catch(showError);
    },
    save() {
      try {
        this.existOuErro(this.fornecedor.nome, "Preencha o [Nome fantasia].");
      } catch (error) {
        showError(error);
        return;
      }

      const fornecedorModelo = {
        codigo_fornecedor: this.fornecedor.codigo_fornecedor,
        pessoa: this.fornecedor.pessoa,
        ativo: this.fornecedor.ativo,
        nome: this.fornecedor.nome,
        razao_social: this.fornecedor.razao_social,
        email: this.fornecedor.email,
        responsavel: this.fornecedor.responsavel,
        cpf_cnpj: this.fornecedor.cpf_cnpj,
        tipo_contribuinte: this.fornecedor.tipo_contribuinte,
        inscricao_estadual: this.fornecedor.inscricao_estadual,
        inscricao_municipal: this.fornecedor.inscricao_municipal,
        rg: this.fornecedor.rg,
        contato_comercial: this.fornecedor.contato_comercial,
        contato_celular: this.fornecedor.contato_celular,
        observacao: this.fornecedor.observacao,
        enderecos: this.dataEnderecos,
        contatos: this.dataContatos,
        cadastrado_em: this.fornecedor.cadastrado_em,
        alterado_em: this.fornecedor.alterado_em,
        deletado_em: this.fornecedor.deletado_em,
      };

      const method = this.fornecedor.codigo_fornecedor ? "put" : "post";
      const id = this.fornecedor.codigo_fornecedor
        ? `${this.fornecedor.codigo_fornecedor}`
        : "";
      const url = `${baseApiUrl}/cadastro_fornecedores/${id}`;
      axios[method](url, fornecedorModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
    remove() {
      const id = this.fornecedor.codigo_fornecedor;
      const url = `${baseApiUrl}/cadastro_fornecedores/${id}`;
      axios
        .delete(url)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
    addEndereco() {
      this.dataEnderecos.push({ tipo: "Selecione" });
    },
    removeEndereco(index) {
      if (this.dataEnderecos.length > 1) {
        this.dataEnderecos.splice(index, 1);
      }
    },
    addContato() {
      this.dataContatos.push({ tipo: "Selecione" });
    },
    removeContato(index) {
      this.dataContatos.splice(index, 1);
    },
    state(elemento) {
      return elemento;
    },
    existOuErro(valor, msg) {
      if (!valor.toString().trim().length > 0) {
        throw msg;
      }
    },
    consultarCEP(cep, IDcep) {
      if (cep) {
        const url = `https://cors-anywhere.herokuapp.com/www.viacep.com.br/ws/${cep}/json/`;
        axios
          .get(url)
          .then((res) => {
            this.dataEnderecos[IDcep].logradouro = res.data.logradouro;
            this.dataEnderecos[IDcep].complemento = res.data.complemento;
            this.dataEnderecos[IDcep].bairro = res.data.bairro;
            this.dataEnderecos[
              IDcep
            ].cidade_uf = `${res.data.localidade} (${res.data.uf})`;
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
            this.fornecedor.nome = res.data.fantasia
              ? res.data.fantasia
              : res.data.nome;
            this.fornecedor.razao_social = res.data.nome;
            this.fornecedor.contato_comercial = res.data.telefone;
            this.fornecedor.email = res.data.email;
            this.fornecedor.nascimento = res.data.abertura;

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
    },
    formateSoNumero(value) {
      if (!value) return value;
      if (Array.isArray(value) && value.length === 0) return value;
      if (typeof value === "string" && !value.trim()) return value;
      return value.replace(/[^\d]+/g, "");
    },
  },
  created() {
    this.loadFornecedores();
    // AO CLICAR NO BOTÃO DE ALTERAR OU EXCLUIR NA "TabelaExibicaoCadastro", ESSA FUNÇÃO É EXECUTADA
    this.$root.$on("carregaRegistro", (registro, mode) => {
      this.loadfornecedor(registro, mode);
    });
  },
};
</script>

<style scoped>
</style>