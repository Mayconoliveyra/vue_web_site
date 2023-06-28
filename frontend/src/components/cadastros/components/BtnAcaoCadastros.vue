<template>
  <div class="row-btn-cadastro">
    <hr />
    <b-button
      variant="success"
      v-if="mode === 'save'"
      @click="$emit('salvarRegistro')"
    >
      Salvar<i class="pl-3 fa fa-check-circle fa-lg" aria-hidden="true"></i>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "BtnAcaoCadastros",
  props: ["mode"],
  emits: ["salvarRegistro"],
};
</script>

<style scoped>
.row-btn-cadastro {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 10px;
}
.row-btn-cadastro button {
  width: 100%;
  height: 45px;
}
</style>