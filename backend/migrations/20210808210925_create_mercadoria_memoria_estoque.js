exports.up = function (knex) {
        return knex.schema.createTable("memoria_estoque", table => {
                table.increments("codigo_memoria").primary()
                table.integer("id_mercadoria").unsigned().notNull().references("codigo_mercadoria").inTable("cadastro_mercadorias")
                table.integer("quantidade").notNull()
                table.string("descrição").notNull()
                table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("memoria_estoque")
};
