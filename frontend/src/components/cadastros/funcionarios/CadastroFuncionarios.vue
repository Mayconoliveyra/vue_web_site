<template>
  <b-container fluid class="cadastro-funcionarios">
    <TituloCadastro
      icon="fa fa-users fa-lg"
      titulo="Cadastro de funcionários"
      @criarNovoCadastro="reset(), modeNavegar('save')"
      @cancelarCadastro="reset(), modeNavegar()"
      :mode="mode"
    />

    <b-form v-if="mode !== null" class="form-cadastros">
      <h5><i class="fa fa-list-alt mr-1"></i> Dados gerais</h5>
      <InforDropdownCadastro
        :dataInfor_codigo="funcionario.codigo_funcionario"
        :dataInfor_alterado="funcionario.alterado_em"
        :dataInfor_cadastrado="funcionario.cadastrado_em"
      />
      <input
        type="hidden"
        id="form-funcionario-codigo"
        v-model="funcionario.codigo_funcionario"
      />
      <!-- INFORMAÇÕES BASICAS -->
      <b-row>
        <b-col cols="12" md="6" lg="2">
          <b-form-group label="Situação" label-form="form-funcionario-status">
            <b-form-select
              id="form-funcionario-status"
              v-model="funcionario.ativo"
              :options="['Ativo', 'Inativo']"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Nome*" label-form="form-funcionario-nome">
            <b-form-input
              id="form-funcionario-nome"
              :class="{ 'is-invalid': state(!funcionario.nome.length > 0) }"
              type="text"
              autocomplete="off"
              v-model="funcionario.nome"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="2">
          <b-form-group label="CPF" label-form="form-funcionario-cpf">
            <b-form-input
              id="form-funcionario-cpf"
              type="text"
              autocomplete="off"
              v-model="funcionario.cpf"
              required
              :readonly="mode === 'remove'"
              v-mask="'###.###.###-##'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="2">
          <b-form-group label="RG" label-form="form-funcionario-rg">
            <b-form-input
              id="form-funcionario-rg"
              type="text"
              autocomplete="off"
              v-model="funcionario.rg"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="2">
          <b-form-group
            label="Nascimento"
            label-form="form-funcionario-nascimento"
          >
            <b-form-input
              id="form-funcionario-nascimento"
              type="text"
              autocomplete="off"
              v-model="funcionario.nascimento"
              required
              :readonly="mode === 'remove'"
              v-mask="'##/##/####'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="Sexo" label-form="form-funcionario-sexo">
            <b-form-select
              id="form-funcionario-sexo"
              v-model="funcionario.sexo"
              :options="['Selecione', 'Masculino', 'Feminino']"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="5">
          <b-form-group
            label="E-mail"
            label-form="form-funcionario-contato-email"
          >
            <b-form-input
              id="form-funcionario-contato-email"
              type="text"
              autocomplete="off"
              v-model="funcionario.email"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-form-group
            v-if="mode == 'save' && funcionario.codigo_funcionario"
            label="Senha"
            label-form="form-funcionario-senha"
          >
            <b-input-group>
              <b-form-input
                id="form-funcionario-senha"
                type="password"
                autocomplete="off"
                v-model="funcionario.senha"
                required
                :readonly="funcionario.redefinirSenha !== true"
              />
              <b-input-group-append>
                <b-button class="btn-trocar-senha" size="sm">
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="funcionario.redefinirSenha"
                    name="checkbox-1"
                    size="lg"
                  >
                  </b-form-checkbox>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-form-group
            v-else
            label="Senha"
            label-form="form-funcionario-senha"
          >
            <b-form-input
              id="form-funcionario-senha"
              type="password"
              autocomplete="off"
              v-model="funcionario.senha"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Desconto(%)"
            label-form="form-funcionario-desconto"
          >
            <b-input-group>
              <money
                autocomplete="off"
                class="form-control"
                id="form-funcionario-desconto"
                type="text"
                v-model="funcionario.maximo_desconto"
                required
                :readonly="mode === 'remove'"
              />
              <b-input-group-append>
                <b-button size="sm" disabled class="bg-transparent">
                  <i class="fa fa-percent fa-sm text-dark"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Comissão(%)"
            label-form="form-funcionario-comissao"
          >
            <b-input-group>
              <money
                autocomplete="off"
                class="form-control"
                id="form-funcionario-comissao"
                type="text"
                v-model="funcionario.comissao"
                required
                :readonly="mode === 'remove'"
              />
              <b-input-group-append>
                <b-button size="sm" disabled class="bg-transparent">
                  <i class="fa fa-percent fa-sm text-dark"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="Cargo" label-form="form-funcionario-cargo">
            <b-form-input
              id="form-funcionario-cargo"
              type="text"
              autocomplete="off"
              v-model="funcionario.cargo"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            label="Permissão"
            label-form="form-funcionario-permissao"
          >
            <b-form-input
              id="form-funcionario-permissao"
              type="text"
              autocomplete="off"
              v-model="funcionario.permissao"
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
              :label-form="'form-funcionario-tipo-endeco-' + k"
            >
              <b-form-select
                :id="'form-funcionario-tipo-endeco-' + k"
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
            <b-form-group label="CEP" :label-form="'form-funcionario-cep-' + k">
              <b-input-group>
                <b-form-input
                  :id="'form-funcionario-cep-' + k"
                  type="text"
                  autocomplete="off"
                  v-model="endereco.cep"
                  required
                  :readonly="mode === 'remove'"
                  v-mask="'#####-###'"
                />
                <b-input-group-append>
                  <b-button
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
              :label-form="'form-funcionario-rua-' + k"
            >
              <b-form-input
                :id="'form-funcionario-rua-' + k"
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
              :label-form="'form-funcionario-numero-' + k"
            >
              <b-form-input
                :id="'form-funcionario-numero-' + k"
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
              :label-form="'form-funcionario-complemento-' + k"
            >
              <b-form-input
                :id="'form-funcionario-complemento-' + k"
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
              :label-form="'form-funcionario-bairro-' + k"
            >
              <b-form-input
                :id="'form-funcionario-bairro-' + k"
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
              :label-form="'form-funcionario-cidade-uf-' + k"
            >
              <b-form-input
                :id="'form-funcionario-cidade-uf-' + k"
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
              :label-form="'form-funcionario-contato-tipo-' + k"
            >
              <b-form-select
                :id="'form-funcionario-contato-tipo-' + k"
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
              :label-form="'form-funcionario-contato-nome-' + k"
            >
              <b-form-input
                :id="'form-funcionario-contato-nome-' + k"
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
              :label-form="'form-funcionario-contato-contato-' + k"
            >
              <b-form-input
                :id="'form-funcionario-contato-contato-' + k"
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
              :label-form="'form-funcionario-contato-observacao-' + k"
            >
              <b-form-input
                :id="'form-funcionario-contato-observacao-' + k"
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
          <b-form-group label-form="form-funcionario-observacao">
            <b-form-textarea
              id="form-funcionario-observacao"
              autocomplete="off"
              rows="4"
              v-model="funcionario.observacao"
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
              <b-form-checkbox class="pr-4" value="codigo_funcionario"
                >Código</b-form-checkbox
              >
              <b-form-checkbox class="pr-4" value="nome">Nome</b-form-checkbox>
              <b-form-checkbox value="cpf">CPF</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <TabelaExibicaoCadastro
        :dataCadastros="dataFuncionarios"
        :totalRows="dataFuncionarios.length"
        :fields="fieldsFuncionarios"
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
  name: "CadastroFuncionarios",
  data() {
    return {
      mode: null,
      funcionario: {},
      dataFuncionarios: [],
      dataEnderecos: [{}],
      dataContatos: [{}],
      filterOn: [],
      filterIgnored: ["cadastrado_em", "alterado_em", "senha"],
      fieldsFuncionarios: [
        {
          key: "codigo_funcionario",
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
          key: "cpf",
          label: "CPF",
          sortable: true,
          formatter: (value) => {
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
          key: "cargo",
          label: "Cargo",
          sortDirection: "asc",
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
        this.funcionario = {
          nome: "",
          ativo: "Ativo",
          maximo_desconto: 0,
          comissao: 0,
          cargo: "Selecione",
          permissao: "Selecione",
          sexo: "Selecione",
        };
      }
      this.mode = mode;
    },
    // SÓ FAZ UMA NOVA REQUISIÇÃO AO BACKEND SE EXCLUIR UM REGISTRO OU EDITAR "atualizaData"
    reset(mode = null) {
      this.funcionario = {};
      this.dataEnderecos = [{ tipo: "Selecione" }];
      this.dataContatos = [{ tipo: "Selecione" }];
      this.modeNavegar();
      if (mode === "atualizaData") {
        this.dataFuncionarios = [];
        this.loadFuncionarios();
      }
    },
    loadFuncionario(funcionario, mode = null) {
      this.mode = mode;
      this.funcionario = { ...funcionario };
      this.dataEnderecos = funcionario.enderecos;
      this.dataContatos = funcionario.contatos;
    },
    loadFuncionarios() {
      const url = `${baseApiUrl}/cadastro_funcionarios`;
      axios
        .get(url)
        .then((res) => {
          this.dataFuncionarios = res.data;
        })
        .catch(showError);
    },
    save() {
      try {
        this.existOuErro(this.funcionario.nome, "Preencha o [Nome].");
      } catch (error) {
        showError(error);
        return;
      }

      const funcionarioModelo = {
        codigo_funcionario: this.funcionario.codigo_funcionario,
        ativo: this.funcionario.ativo,
        nome: this.funcionario.nome,
        cpf: this.funcionario.cpf,
        rg: this.funcionario.rg,
        nascimento: this.funcionario.nascimento,
        sexo: this.funcionario.sexo,
        email: this.funcionario.email,
        senha: this.funcionario.senha,
        cargo: this.funcionario.cargo,
        permissao: this.funcionario.permissao,
        comissao: this.funcionario.comissao,
        maximo_desconto: this.funcionario.maximo_desconto,
        enderecos: this.dataEnderecos,
        contatos: this.dataContatos,
        cadastrado_em: this.funcionario.cadastrado_em,
        alterado_em: this.funcionario.alterado_em,
        deletado_em: this.funcionario.deletado_em,
        redefinirSenha: this.funcionario.redefinirSenha,
        observacao: this.funcionario.observacao,
      };
      const method = this.funcionario.codigo_funcionario ? "put" : "post";
      const id = this.funcionario.codigo_funcionario
        ? `${this.funcionario.codigo_funcionario}`
        : "";
      const url = `${baseApiUrl}/cadastro_funcionarios/${id}`;
      axios[method](url, funcionarioModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset("atualizaData");
        })
        .catch(showError);
    },
    remove() {
      const id = this.funcionario.codigo_funcionario;
      const url = `${baseApiUrl}/cadastro_funcionarios/${id}`;
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
      this.dataEnderecos.splice(index, 1);
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
  },
  created() {
    this.loadFuncionarios();
    // AO CLICAR NO BOTÃO DE ALTERAR OU EXCLUIR NA "TabelaExibicaoCadastro", ESSA FUNÇÃO É EXECUTADA
    this.$root.$on("carregaRegistro", (registro, mode) => {
      this.loadFuncionario(registro, mode);
    });
  },
};
</script>

<style >
.btn-trocar-senha {
  padding: 0px 0px 0px 8px;
  display: flex;
  justify-content: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
}
</style>