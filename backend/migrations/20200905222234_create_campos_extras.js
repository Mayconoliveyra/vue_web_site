
exports.up = function (knex) {
    return knex.schema.createTable("campos_extras", table => {
        table.increments("codigo_extra").primary()
        table.string("nome").notNull().unique()
        table.string("descricao")
        table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
        table.timestamp("alterado_em")
    }).then(function () {
        return knex("campos_extras").insert([
            {
                nome: "Marca",
            },
            {
                nome: "Modelo",
            }
        ])
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("campos_extras")
};
