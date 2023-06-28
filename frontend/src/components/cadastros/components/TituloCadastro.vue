<template>
  <div class="titulo-cadastro">
    <span class="textTitle">
      <i v-if="icon" :class="icon"></i>
      {{ titulo }}
    </span>
    <b-button
      v-if="mode == null"
      variant="primary"
      size="md"
      @click="$emit('criarNovoCadastro')"
    >
      Novo Cadastro
      <i class="pl-2 fa fa-plus-circle fa-lg" aria-hidden="true"></i>
    </b-button>
    <b-button
      v-else
      variant="secondary"
      size="md"
      @click="$emit('cancelarCadastro')"
    >
      Cancelar
      <i class="pl-2 fa fa-times-circle fa-lg" aria-hidden="true"></i>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "TituloCadastro",
  props: ["icon", "titulo", "mode"],
  emits: ["criarNovoCadastro", "cancelarCadastro"],
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
  margin-bottom: 15px;
  padding: 5px;
  border-radius: 6px;
  box-shadow: 0 0.5rem 0.5rem rgb(0 0 0 /12%),
    inset 0 -1px 10px rgb(0 0 0 / 20%);
}

.titulo-cadastro .textTitle {
  margin-bottom: 6px;
  font-size: 24px;
}
</style>