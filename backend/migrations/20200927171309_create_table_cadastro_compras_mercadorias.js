exports.up = function (knex) {
    return knex.schema.createTable("cadastro_compras_mercadorias", table => {
        table.increments("codigo_mercadoria").primary()
        table.integer("id_compra").unsigned().notNull().references("codigo_compra").inTable("cadastro_compras_cabecalho")
        table.string("codigo_mercadoria_fornecedor").notNull()
        table.string("descricao_produto").notNull()
        table.string("unidade").notNull()
        table.float("quantidade").notNull()
        table.float("valor_unitario").notNull()
        table.float("valor_total").notNull()
        table.string("ncm").notNull()
        table.string("cfop").notNull()
        table.float("frete").notNull().defaultTo(0)
        table.float("desconto").notNull().defaultTo(0)
        table.float("icms_st").notNull().defaultTo(0)
        table.float("valor_ipi").notNull().defaultTo(0)
        table.float("outras_despesas").notNull().defaultTo(0)

        table.float("quantidade_converter").notNull().defaultTo(1)
/*         table.integer("id_mercadoria_referenciada").references("codigo_mercadoria").inTable("cadastro_mercadorias") */

        table.float("preco_venda").notNull().defaultTo(0)
        table.float("preco_venda_f1").notNull().defaultTo(0)
        table.float("preco_venda_f2").notNull().defaultTo(0)
        table.float("preco_venda_f3").notNull().defaultTo(0)

        table.float("valor_custo_anterior").notNull().defaultTo(0)
        table.float("preco_venda_anterior").notNull().defaultTo(0)
        table.float("preco_venda_f1_anterior").notNull().defaultTo(0)
        table.float("preco_venda_f2_anterior").notNull().defaultTo(0)
        table.float("preco_venda_f3_anterior").notNull().defaultTo(0)

        table.integer("codigo_mercadoria_referenciada") /* Se tiver nulo que dize que nao foi referenciada, logo tambem ela foi cadastrada no momento que confirmou a compra */
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_compras_mercadorias")
};
