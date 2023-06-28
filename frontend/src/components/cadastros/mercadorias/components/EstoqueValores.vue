<template>
  <div>
    <b-row v-if="this.$mq == 'sm'">
      <b-col cols="12" md="3" lg="2">
        <b-form-group
          label="Unidade de medida"
          label-form="form-mercadoria-unidade"
        >
          <b-input-group size="lg">
            <b-form-select
              id="form-mercadoria-unidade"
              v-model="mercadoria.unidade_medida"
              :options="dataUnidades"
              size="sm"
              required
              :readonly="mode === 'remove'"
            ></b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="4" lg="4">
        <b-form-group
          label="Estoque atual"
          label-form="form-mercadoria-estoque-atual"
        >
          <b-input-group size="lg">
            <money
              autocomplete="off"
              class="form-control text-right"
              id="form-mercadoria-estoque-atual"
              type="text"
              v-model="mercadoria.estoque_atual"
              v-bind="mask3Casas"
              required
              :readonly="mode === 'remove'"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="4" lg="4">
        <b-form-group
          label="Estoque mínimo"
          label-form="form-mercadoria-estoque-minimo"
        >
          <b-input-group size="lg">
            <money
              autocomplete="off"
              class="form-control text-right"
              id="form-mercadoria-estoque-minimo"
              type="text"
              v-model="mercadoria.estoque_minimo"
              v-bind="mask3Casas"
              required
              :readonly="mode === 'remove'"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group
          label="Valor de custo*"
          label-form="form-mercadoria-valor-custo"
        >
          <b-input-group size="lg">
            <money
              :class="{
                'form-control': true,
                'is-invalid': state(mercadoria.valor_custo <= 0),
              }"
              autocomplete="off"
              id="form-mercadoria-valor-custo"
              type="text"
              v-model="mercadoria.valor_custo"
              v-bind="maskDinheiroRS"
              required
              :readonly="mode === 'remove'"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="8" class="pr-0">
        <b-form-group
          label="Preço de venda"
          label-form="form-mercadoria-valor-padrao"
        >
          <b-input-group size="lg">
            <money
              class="form-control"
              id="form-mercadoria-valor-padrao"
              type="text"
              v-model="mercadoria.preco_venda"
              @keyup.native="calcularMargemVenda()"
              v-bind="maskDinheiroRS"
              required
              :readonly="!mercadoria.valor_custo"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4" class="pl-1">
        <b-form-group label="Margem(%)" label-form="form-mercadoria-margem">
          <b-input-group size="lg">
            <money
              autocomplete="off"
              class="form-control text-right"
              id="form-mercadoria-margem"
              type="text"
              v-model="mercadoria.margem_venda"
              @keyup.native="calcularPrecoVenda()"
              required
              :readonly="!mercadoria.valor_custo"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col cols="4">
        <b-form-group
          label="Unidade de medida"
          label-form="form-mercadoria-unidade"
        >
          <b-input-group>
            <b-form-select
              id="form-mercadoria-unidade"
              v-model="mercadoria.unidade_medida"
              :options="dataUnidades"
              size="sm"
              required
              :readonly="mode === 'remove'"
            ></b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Estoque atual"
          label-form="form-mercadoria-estoque-atual"
        >
          <b-input-group>
            <money
              autocomplete="off"
              class="form-control text-right"
              id="form-mercadoria-estoque-atual"
              type="text"
              v-model="mercadoria.estoque_atual"
              v-bind="mask3Casas"
              required
              :readonly="mode === 'remove'"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Estoque mínimo"
          label-form="form-mercadoria-estoque-minimo"
        >
          <b-input-group>
            <money
              autocomplete="off"
              class="form-control text-right"
              id="form-mercadoria-estoque-minimo"
              type="text"
              v-model="mercadoria.estoque_minimo"
              v-bind="mask3Casas"
              required
              :readonly="mode === 'remove'"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group
          label="Valor de custo*"
          label-form="form-mercadoria-valor-custo"
        >
          <b-input-group>
            <money
              :class="{
                'form-control': true,
                'is-invalid': state(mercadoria.valor_custo <= 0),
              }"
              autocomplete="off"
              id="form-mercadoria-valor-custo"
              type="text"
              v-model="mercadoria.valor_custo"
              v-bind="maskDinheiroRS"
              required
              :readonly="mode === 'remove'"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="8" class="pr-0">
        <b-form-group
          label="Preço de venda"
          label-form="form-mercadoria-valor-padrao"
        >
          <b-input-group>
            <money
              class="form-control"
              id="form-mercadoria-valor-padrao"
              type="text"
              v-model="mercadoria.preco_venda"
              @keyup.native="calcularMargemVenda()"
              v-bind="maskDinheiroRS"
              required
              :readonly="!mercadoria.valor_custo"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4" class="pl-1">
        <b-form-group label="Margem(%)" label-form="form-mercadoria-margem">
          <b-input-group>
            <money
              autocomplete="off"
              class="form-control text-right"
              id="form-mercadoria-margem"
              type="text"
              v-model="mercadoria.margem_venda"
              @keyup.native="calcularPrecoVenda()"
              required
              :readonly="!mercadoria.valor_custo"
            />
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
  name: "EstoqueValores",
  props: ["mercadoria", "dataCamposExtras", "mode"],
  data() {
    return {
      dataUnidades: [],
      margem: 0,
      maskDinheiroRS: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        prefix: "R$  ",
        masked: false,
      },
      mask3Casas: {
        decimal: ",",
        thousands: ".",
        precision: 3,
        masked: false,
      },
    };
  },
  methods: {
    loadUnidades() {
      const url = `${baseApiUrl}/cadastro_unidades`;
      axios
        .get(url)
        .then((res) => {
          res.data.forEach((element) => {
            this.dataUnidades.push(element.sigla);
          });
        })
        .catch(showError);
    },
    calcularPrecoVenda() {
      this.mercadoria.preco_venda = Number(
        this.mercadoria.valor_custo * (this.mercadoria.margem_venda / 100) +
          this.mercadoria.valor_custo
      );
    },
    calcularMargemVenda() {
      this.mercadoria.margem_venda =
        ((this.mercadoria.valor_custo - this.mercadoria.preco_venda) /
          -this.mercadoria.valor_custo) *
        100;
    },
    state(elemento) {
      return elemento;
    },
  },
  created() {
    this.loadUnidades();
  },
};
</script>

<style>
.classCheckbosAtivo .custom-control-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 29px;
}
</style>