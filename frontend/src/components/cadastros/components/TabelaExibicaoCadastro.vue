<template>
  <div>
    <!-- PAGINADOR -->
    <div class="row-paginador">
      <b-form-group label-for="perPageSelect">
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          aling="left"
          size="md"
          :options="pageOptions"
        ></b-form-select>
      </b-form-group>

      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="end"
        size="md"
      ></b-pagination>
    </div>
    <!-- TABELA -->
    <b-table
      class="mt-0 pt-0"
      bordered
      show-empty
      small
      :items="dataCadastros"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :filterIgnoredFields="filterIgnored"
      @filtered="onFiltered"
      @row-dblclicked="carregarTelaEdicao"
      tbody-tr-class="linhaTabela"
      emptyFilteredText="Não foi encontrado nenhum registro para os filtros informados!"
    >
      <!-- CADASTRO DE CLIENTES -->
      <template v-slot:cell(nome)="row">
        <div v-if="row.item.codigo_fornecedor || row.item.codigo_cliente">
          {{ row.item.nome }} <br />
          <p class="css-razao-social" v-if="row.item.razao_social">
            ({{ row.item.razao_social }})
          </p>
        </div>
        <div v-else>{{ row.item.nome }} <br /></div>
      </template>
      <template v-slot:cell(documento)="row">
        <div class="text-centralizado">{{ row.item.documento }}</div>
      </template>
      <template v-slot:cell(status)="row">
        <div
          v-if="row.item.status == 'Ativo'"
          class="text-success text-centralizado"
        >
          {{ row.item.status }}
        </div>
        <div v-else class="text-danger text-centralizado">
          {{ row.item.status }}
        </div>
      </template>
      <!-- ############################################## -->
    </b-table>
  </div>
</template>

<script>
export default {
  name: "TabelaExibicaoCadastro",
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
    carregarTelaEdicao(item) {
      this.$root.$emit("carregaRegistro", item, "save");
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
.row-paginador {
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 5px;
  margin: 0px;
  padding: 0px;
  height: 50px;
  margin-top: 35px;
}
.css-razao-social {
  font-size: 11px;
  padding: 0px;
  margin: 0px;
  color: rgb(170, 169, 168);
}
.linhaTabela {
  /* background-color: blue; */
  font-size: 15px;
  height: 45px;
  max-width: 100%;
  color: rgb(0, 0, 0);
  border: 2px solid #dee2e6;
  -webkit-touch-callout: none; /* iPhone OS, Safari */
  -webkit-user-select: none; /* Chrome, Safari 3 */
  -khtml-user-select: none; /* Safari 2 */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  user-select: none; /* Possível implementação no futuro */
  cursor: pointer;
}
.linhaTabela td div {
  height: 45px;
  overflow: hidden;
  display: flex;
}
.linhaTabela:hover {
  background-color: rgb(202, 202, 195);
}

.text-centralizado {
  display: flex;
  margin: 0px;
  padding: 0px;
  align-items: center;
  justify-content: center;
}
</style>