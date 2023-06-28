<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h5><i class="fa fa-truck mr-1"></i> Fornecedores</h5>
        <b-row class="border m-0">
          <b-col cols="6" class="border p-2 d-flex"
            >Fornecedor
            <b-button
              @click="addCamposMercadoriaFornecedor()"
              :disabled="mode === 'remove'"
              class="btn_CamposExtras"
              type="button"
              variant="primary"
            >
              Adicionar
            </b-button></b-col
          >
          <b-col cols="3" class="border p-2">Código do fornecedor</b-col>
          <b-col cols="2" class="border p-2">Qtd. converter</b-col>
          <b-col cols="1" class="border p-2">Delete</b-col>
        </b-row>
        <!-- FOR FORNECEDORES -->
        <b-row
          class="m-0"
          v-for="(fornecedor, k) in dataMercadoriaFornecedores"
          :key="k"
        >
          <b-col cols="6" class="border p-2">
            <b-form-input
              :class="{
                'is-invalid': !state(
                  dataFornecedores.includes(fornecedor.nome_fantasia)
                ),
              }"
              :id="'form-mercadoria-fornecedor-nome-' + k"
              autocomplete="off"
              type="text"
              v-model="fornecedor.nome_fantasia"
              required
              :readonly="mode === 'remove'"
              list="my-list-fornecedores"
              @blur="fornecedorValido(fornecedor, k)"
            />
            <span v-if="!dataFornecedores.includes(fornecedor.nome_fantasia)">
              <p class="text-danger">Fornecedor não encontrado.</p>
            </span>
            <b-form-datalist
              :options="dataFornecedores"
              id="my-list-fornecedores"
            >
            </b-form-datalist>
          </b-col>
          <b-col cols="3" class="border p-2">
            <b-form-input
              :class="{
                'is-invalid': state(
                  fornecedor.codigo_mercadoria_fornecedor.length == 0
                ),
              }"
              autocomplete="off"
              :id="
                'form-mercadoria-fornecedor-codigo-mercadoria-fornecedor-' + k
              "
              type="text"
              v-model="fornecedor.codigo_mercadoria_fornecedor"
              required
              :readonly="mode === 'remove'"
            />
          </b-col>
          <b-col cols="2" class="border p-2">
            <b-form-input
              :class="{
                'is-invalid': state(
                  fornecedor.quantidade_converter.length == 0
                ),
              }"
              autocomplete="off"
              :id="'form-mercadoria-fornecedor-qtd-converter-' + k"
              type="text"
              v-model="fornecedor.quantidade_converter"
              required
              :readonly="mode === 'remove'"
            />
          </b-col>
          <b-col cols="1" class="border p-2 pt-3">
            <b-button
              @click="removeCamposMercadoriaFornecedor(k)"
              :disabled="mode === 'remove'"
              class="btn_CamposExtras"
              size="sm"
              type="button"
              variant="danger"
            >
              Excluir
            </b-button>
          </b-col>
        </b-row>
        <b-row class="m-0" v-if="dataMercadoriaFornecedores.length == 0">
          <b-col cols="12" class="border pt-2 pb-2 text-info">
            Sugerimos que vincule um ou mais fornecedores a este produto, pois
            durante o cadastramento de compras e cotações é exigido que você
            vincule o fornecedor ao cadastro. Caso exista produtos vinculados a
            este fornecedor, o sistema irá importar automaticamente estes
            produtos facilitando o processo.
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/../global";
import axios from "axios";

export default {
  name: "Fornecedores",
  props: ["mercadoria", "dataMercadoriaFornecedores", "mode"],
  data() {
    return {
      dataFornecedores: [],
    };
  },
  methods: {
    loadFornecedores() {
      const url = `${baseApiUrl}/cadastro_fornecedores`;

      axios
        .get(url)
        .then((res) => {
          res.data.forEach((element) => {
            if (element.cpf_cnpj && element.cpf_cnpj.length === 14) {
              this.dataFornecedores.push(element.nome);
            }
          });
        })
        .catch(showError);
    },
    state(elemento) {
      return elemento;
    },
    addCamposMercadoriaFornecedor() {
      this.dataMercadoriaFornecedores.push({
        nome_fantasia: "",
        codigo_mercadoria_fornecedor: "",
        quantidade_converter: "",
      });
    },
    removeCamposMercadoriaFornecedor(index) {
      this.dataMercadoriaFornecedores.splice(index, 1);
    },
    fornecedorValido(fornecedor, key) {
      if (!this.dataFornecedores.includes(fornecedor.nome_fantasia)) {
        this.removeCamposMercadoriaFornecedor(key);
        showError(
          "O nome do fornecedor que você informou estava inválido, então foi removido."
        );
        return;
      }
    },
  },
  created() {
    this.loadFornecedores();
  },
};
</script>

<style>
</style>