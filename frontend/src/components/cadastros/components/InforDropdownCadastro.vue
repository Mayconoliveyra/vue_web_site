<template>
  <div class="info_alterado_cadastrado" v-if="dataInfor_codigo">
    <i class="fa fa-info-circle" aria-hidden="true"></i>
    <div class="info-dropdown-content">
      <div>Registro: {{ dataInfor_codigo }}</div>
      <div>Cadastrado em:</div>
      <div>{{ formatDataBR(dataInfor_cadastrado) }}</div>
      <div v-if="dataInfor_alterado">Alterado em:</div>
      <div v-if="dataInfor_alterado">
        {{ formatDataBR(dataInfor_alterado) }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "InforDropdownCadastro",
  props: ["dataInfor_codigo", "dataInfor_alterado", "dataInfor_cadastrado"],
  methods: {
    formatDataBR(date) {
      return moment(date, "YYYY-MM-DD hh:mm:ss")
        .subtract({ hours: 3 })
        .format("DD/MM/YYYY HH:mm:ss");
    },
  },
};
</script>

<style scoped>
.info_alterado_cadastrado {
  position: absolute;
  right: 26px;
  top: 131px;
  font-size: 22px;
  cursor: pointer;
  color: rgb(95, 91, 91);
}
.info-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: #ffffff;
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 8px;
  z-index: 1;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-content: center;
  border-radius: 7px;
  flex-direction: column;
  flex-wrap: wrap;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.info_alterado_cadastrado:hover .info-dropdown-content {
  visibility: visible;
  opacity: 1;
}
</style>