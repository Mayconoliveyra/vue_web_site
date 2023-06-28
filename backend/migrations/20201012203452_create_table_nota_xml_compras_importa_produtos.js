exports.up = function (knex) {
    return knex.schema.createTable("nota_xml_compras_importa_produtos", table => {
        table.increments("id").primary()
        table.decimal("codigo_importacao_produto", 65, 0).notNull() // (tamanho maximo 74, 0 casa decimais) codigo de importação, gerado atraves do numero do cnpj do emitente + codigo do produto
        table.string("det_prod_ucom_entrada", 6).notNull()  // informar a unidade de comercialização do produto (Ex. pc, und, dz, kg, etc.). entrada
        table.decimal("conversao_qcom_sainda", 15, 2).notNull()  // quantidade saida
        table.string("conversao_ucom_sainda", 6).notNull()  // unidade saida
        table.string("cadastrado_em", 19) /*ex: 01/08/2020 11:45:18 */
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("nota_xml_compras_importa_produtos")
};
