module.exports = app => {
   app.post("/validarToken", app.api.autenticacao.validarToken) //publico
   app.post("/validarUsuarioAdm", app.api.autenticacao.validarUsuarioADM) //publico
   app.post("/autenticacao", app.api.autenticacao.entrar) //publico

   app.route("/cadastro_funcionarios")
      .get(app.api.funcionarios.get)
      .post(app.api.funcionarios.save)
   app.route("/cadastro_funcionarios/:id")
      .put(app.api.funcionarios.save)
      .delete(app.api.funcionarios.remove)

   app.route("/cadastro_clientes")
      .get(app.api.clientes.get)
      .post(app.api.clientes.save)
   app.route("/cadastro_clientes/:id")
      .put(app.api.clientes.save)
      .delete(app.api.clientes.remove)

   app.route("/cadastro_fornecedores")
      .get(app.api.fornecedores.get)
      .post(app.api.fornecedores.save)
   app.route("/cadastro_fornecedores/:id")
      .put(app.api.fornecedores.save)
      .delete(app.api.fornecedores.remove)

   app.route("/cadastro_mercadorias")
      .get(app.api.mercadorias.get)
      .post(app.api.mercadorias.save)
   app.route("/cadastro_mercadorias/:id")
      .get(app.api.mercadorias.getByID)
      .put(app.api.mercadorias.save)
      .delete(app.api.mercadorias.remove)

   app.route("/cadastro_mercadorias_mercadoria_fornecedor/:id")
      .get(app.api.mercadorias.getFornecedoreMercadoria)

   app.route("/cadastro_grupos")
      .get(app.api.auxiliares.getGrupo)
      .post(app.api.auxiliares.saveGrupo)
   app.route("/cadastro_grupos/:id")
      .put(app.api.auxiliares.saveGrupo)
      .delete(app.api.auxiliares.removeGrupo)

   app.route("/cadastro_extras")
      .get(app.api.auxiliares.getExtra)
      .post(app.api.auxiliares.saveExtra)
   app.route("/cadastro_extras/:id")
      .put(app.api.auxiliares.saveExtra)
      .delete(app.api.auxiliares.removeExtra)

   app.route("/cadastro_unidades")
      .get(app.api.auxiliares.getUnidade)
      .post(app.api.auxiliares.saveUnidade)
   app.route("/cadastro_unidades/:id")
      .put(app.api.auxiliares.saveUnidade)
      .delete(app.api.auxiliares.removeUnidade)

   /* CADASTRO DE COMPRAS */
   app.route("/cadastro_compras")
      .get(app.api.importarCompras.get)
      .post(app.api.importarCompras.saveXML)
   app.route("/cadastro_compras/:id")
      .put(app.api.importarCompras.saveXML)
      .delete(app.api.importarCompras.saveXML)

   /* UTILZIADO PARA REFENCIAR A MERCADORIA JA CADSATRADA NO SISTEMA NA HORA DA COMPRA */
   app.route("/cadastro_compras_mercadoria_from_db")
      .get(app.api.importarCompras.getMercadoriasFromDB)

   app.route("/cadastro_compras_mercadorias/:id")
      .get(app.api.importarCompras.getMercadorias)

}
