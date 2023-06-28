<template>
  <b-container fluid class="titulo-cadastro">
    <span class="textTitle">
      <i v-if="icon" :class="icon"></i>
      {{ titulo }}
    </span>
    <div v-if="mode == null">
      <b-button class="css-btn-add-xml" size="md" @click="$emit('importarXML')">
        Notas de compras
        <i class="ml-2 fa fa-file-code-o fa-lg" aria-hidden="true"></i>
      </b-button>
    </div>

    <b-button
      v-else
      variant="secondary"
      size="md"
      @click="
        $root.$emit('atualizaDataCompras');
        $emit('cancelarCadastro');
      "
    >
      Cancelar ação
      <i class="ml-2 fa fa-times-circle fa-lg" aria-hidden="true"></i>
    </b-button>
  </b-container>
</template>

<script>
export default {
  name: "TituloCadastroCompras",
  props: ["icon", "titulo", "mode"],
  emits: ["importarXML", "cancelarCadastro"],
};
</script>

<style scoped>
.titulo-cadastro {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: solid 1px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin-top: 5px;
  margin-bottom: 25px;
  padding: 5px;
  border-radius: 6px;
  box-shadow: 0 0.5rem 0.5rem rgb(0 0 0 /12%),
    inset 0 -1px 10px rgb(0 0 0 / 20%);
}

.titulo-cadastro .textTitle {
  margin-bottom: 6px;
  font-size: 24px;
}
.css-btn-add-compra {
  background-color: rgb(5, 112, 57);
}
.css-btn-add-xml {
  background-color: rgb(128, 34, 62);
}
</style>