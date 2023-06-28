<template>
  <div>
    <div class="divInfoCadastroMercadoria"></div>

    <b-row v-if="this.$mq == 'sm'">
      <b-col cols="12" md="3" lg="3">
        <b-form-group
          label="Código interno*"
          label-form="form-mercadoria-codigo-interno"
        >
          <b-input-group size="lg">
            <b-form-input
              :class="{
                'is-invalid': state(
                  mercadoria.codigo_interno.toString().length == 0
                ),
              }"
              autocomplete="off"
              id="form-mercadoria-codigo-interno"
              type="text"
              v-model="mercadoria.codigo_interno"
              maxlength="15"
              required
              :readonly="mode === 'remove'"
            />
            <b-input-group-append>
              <b-button
                @click="gerarCodigoInterno()"
                :disabled="mode === 'remove'"
                size="md"
              >
                <i class="fa fa-refresh fa-lg"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="12" lg="6">
        <b-form-group
          size="lg"
          label="Nome do produto*"
          label-form="form-mercadoria-mercadoria"
        >
          <b-input-group size="lg">
            <b-form-input
              :class="{
                'is-invalid': state(mercadoria.mercadoria.length == 0),
              }"
              autocomplete="off"
              id="form-mercadoria-mercadoria"
              type="text"
              v-model="mercadoria.mercadoria"
              maxlength="120"
              required
              :readonly="mode === 'remove'"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="3" lg="3">
        <b-form-group
          label="Código de barra"
          label-form="form-mercadoria-codigo-barras"
        >
          <b-input-group size="lg">
            <b-form-input
              autocomplete="off"
              id="form-mercadoria-codigo-barras"
              type="text"
              v-model="mercadoria.codigo_barras"
              required
              :readonly="mode === 'remove'"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6" lg="4">
        <b-form-group
          label="Grupo do produto"
          label-form="form-mercadoria-grupo"
        >
          <b-input-group size="lg">
            <b-form-select
              id="form-mercadoria-grupo"
              v-model="mercadoria.grupo_produto"
              :options="dataGrupos"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6" lg="4">
        <b-form-group label="Marca" label-form="form-mercadoria-marca">
          <b-input-group size="lg">
            <b-form-select
              id="form-mercadoria-marca"
              v-model="mercadoria.marca_produto"
              :options="dataGrupos"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6" lg="4">
        <b-form-group
          label="Status(Mercadoria disponíveis para venda?)"
          label-form="form-mercadoria-status"
        >
          <b-input-group size="lg">
            <b-form-select
              id="form-mercadoria-status"
              v-model="mercadoria.status_produto"
              :options="['Ativa', 'Desativada']"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col cols="4">
        <b-form-group
          label="Código interno*"
          label-form="form-mercadoria-codigo-interno"
        >
          <b-input-group>
            <b-form-input
              :class="{
                'is-invalid': state(
                  mercadoria.codigo_interno.toString().length == 0
                ),
              }"
              autocomplete="off"
              id="form-mercadoria-codigo-interno"
              type="text"
              v-model="mercadoria.codigo_interno"
              maxlength="15"
              required
              :readonly="mode === 'remove'"
            />
            <b-input-group-append>
              <b-button
                @click="gerarCodigoInterno()"
                :disabled="mode === 'remove'"
                size="sm"
              >
                <i class="fa fa-refresh fa-lg"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="8">
        <b-form-group
          size="lg"
          label="Nome do produto*"
          label-form="form-mercadoria-mercadoria"
        >
          <b-input-group>
            <b-form-input
              :class="{
                'is-invalid': state(mercadoria.mercadoria.length == 0),
              }"
              autocomplete="off"
              id="form-mercadoria-mercadoria"
              type="text"
              v-model="mercadoria.mercadoria"
              maxlength="120"
              required
              :readonly="mode === 'remove'"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Código de barra"
          label-form="form-mercadoria-codigo-barras"
        >
          <b-input-group>
            <b-form-input
              autocomplete="off"
              id="form-mercadoria-codigo-barras"
              type="text"
              v-model="mercadoria.codigo_barras"
              required
              :readonly="mode === 'remove'"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Grupo do produto"
          label-form="form-mercadoria-grupo"
        >
          <b-input-group>
            <b-form-select
              id="form-mercadoria-grupo"
              v-model="mercadoria.grupo_produto"
              :options="dataGrupos"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group label="Marca" label-form="form-mercadoria-marca">
          <b-input-group>
            <b-form-select
              id="form-mercadoria-marca"
              v-model="mercadoria.marca_produto"
              :options="dataGrupos"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Status(Mercadoria disponíveis para venda?)"
          label-form="form-mercadoria-status"
        >
          <b-input-group>
            <b-form-select
              id="form-mercadoria-status"
              v-model="mercadoria.status_produto"
              :options="['Ativa', 'Desativada']"
              size="sm"
              required
              :disabled="mode === 'remove'"
            ></b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/../global";
import axios from "axios";

export default {
  name: "DadosGerais",
  props: ["mercadoria", "mode"],
  data() {
    return {
      dataGrupos: [],
      codigoSorteados: [],
    };
  },
  methods: {
    state(elemento) {
      return elemento;
    },
    gerarCodigoInterno() {
      const valorMaximo = 999999;
      const valorMinimo = 900000;

      let sugestao = Math.floor(
        Math.random() * (valorMaximo - valorMinimo + 1) + valorMinimo
      );

      while (this.codigoSorteados.indexOf(sugestao) >= 0) {
        // Enquanto o numero já existir, escolher outro
        sugestao = Math.floor(
          Math.random() * (valorMaximo - valorMinimo + 1) + valorMinimo
        );
      }
      this.codigoSorteados.push(sugestao); // adicionar este numero à array de numeros codigoSorteados para futura referência
      return (this.mercadoria.codigo_interno = sugestao); // devolver o numero único
    },
    loadGrupos() {
      const url = `${baseApiUrl}/cadastro_grupos`;
      axios
        .get(url)
        .then((res) => {
          res.data.forEach((element) => {
            this.dataGrupos.push(element.nome);
          });
        })
        .catch(showError);
    },
  },
  created() {
    this.loadGrupos();
  },
};
</script>

<style>
</style>