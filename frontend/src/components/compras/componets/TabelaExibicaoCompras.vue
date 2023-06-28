<template>
  <div class="tabela-exibicao-compra">
    <!-- PAGINADOR -->
    <b-row class="row-paginador mt-5">
      <b-form-group label-for="perPageSelect">
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          aling="left"
          size="sm"
          :options="pageOptions"
        ></b-form-select>
      </b-form-group>

      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="end"
        size="sm"
      ></b-pagination>
    </b-row>
    <!-- TABELA -->
    <b-table
      bordered
      show-empty
      striped
      :items="dataCadastros"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :filterIgnoredFields="filterIgnored"
      @filtered="onFiltered"
      emptyFilteredText="Não foi encontrado nenhum registro para os filtros informados!"
    >
      <template v-slot:cell(actions)="row">
        <b-button
          class="bg-success btn-table"
          size="sm mr-1 ml-1"
          @click="$root.$emit('carregaRegistroCompra', row.item, 'Compra')"
        >
          <i
            class="fa fa-shopping-basket text-dark font-weight-light"
            aria-hidden="true"
          ></i>
        </b-button>

        <b-button
          class="bg-primary btn-table"
          size="sm ml-1 mr-1"
          @click="$root.$emit('carregaRegistro', row.item, 'visualizar')"
        >
          <i
            class="fa fa-eye text-dark font-weight-light"
            aria-hidden="true"
          ></i>
        </b-button>
        <b-button
          class="bg-danger btn-table"
          size="sm ml-1 mr-1"
          @click="$root.$emit('carregaRegistro', row.item, 'remove')"
        >
          <i
            class="fa fa-trash text-dark font-weight-light"
            aria-hidden="true"
          ></i>
        </b-button>
      </template>
      <template v-slot:cell(razao_social)="row">
        {{ row.item.razao_social }} <br />
        <p class="css-nome-fantasia" v-if="row.item.razao_social">
          ({{ row.item.fantasia }})
        </p>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "TabelaExibicaoCadastroCompras",
  data() {
    return {
      perPage: 30,
      pageOptions: [10, 30, 50, 100, 200, 400],
      currentPage: 1,
      filter: null,
    };
  },
  props: ["dataCadastros", "fields", "filterOn", "filterIgnored", "totalRows"],
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  created() {
    this.$root.$on("emitFilterTable", (filter) => {
      this.filter = filter;
    });
  },
};
</script>

<style>
.tabela-exibicao-compra .row-paginador {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
}
.tabela-exibicao-compra .row-paginador > div {
  width: 115px;
}
.tabela-exibicao-compra .css-nome-fantasia {
  font-size: 10px;
  padding: 0px;
  margin: 0px;
  color: rgb(136, 136, 135);
}
.tabela-exibicao-compra .btn-table {
  margin-top: 4px;
  padding: 0px 8px;
}
</style>