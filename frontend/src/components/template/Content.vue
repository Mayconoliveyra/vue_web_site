<template>
  <div class="content">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style>
/* ESTILOS GLOBAIS */
.content {
  grid-area: content;
  background-color: #f5f5f5;
  padding: 4px;
}
.form-cadastros h5 {
  font-size: 18px;
}
.form-cadastros {
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 3px;
  border-radius: 7px;
  margin-bottom: 300px;
}
.form-cadastros input {
  padding: 3px !important;
}
.form-cadastros fieldset {
  font-size: 17px;
  color: rgb(1, 13, 106);
}
.form-cadastros .row {
  margin: 0px;
  padding: 0px;
}
.form-cadastros .row div {
  padding: 0px;
}
</style>