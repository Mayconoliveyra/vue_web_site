exports.up = function (knex) {
        return knex.schema.createTable("cadastro_compras_duplicatas", table => {
                table.increments("codigo_duplicata").primary()
                table.integer("id_compra").unsigned().notNull().references("codigo_compra").inTable("cadastro_compras_cabecalho")

                table.string("vencimento").notNull()
                table.string("numero_duplicata").notNull()
                table.float("valor_parcela").notNull()

                table.string("forma_pagamento")
                table.string("observação")
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("cadastro_compras_duplicatas")
};
