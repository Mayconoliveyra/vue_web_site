exports.up = function (knex) {
        return knex.schema.createTable("memoria_auto_import_mercadoria_compra", table => {
                table.integer("id_mercadoria").unsigned().notNull().references("codigo_mercadoria").inTable("cadastro_mercadorias")
                table.integer("id_fornecedor").unsigned().notNull().references("codigo_fornecedor").inTable("cadastro_fornecedores")
                table.string("codigo_mercadoria_fornecedor").notNull()
                table.string("cnpj_fornecedor", 14)
                table.float("quantidade_converter").notNull().defaultTo(1)
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("memoria_auto_import_mercadoria_compra")
};
