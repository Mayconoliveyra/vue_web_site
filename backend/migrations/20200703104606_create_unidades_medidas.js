
exports.up = function (knex) {
    return knex.schema.createTable("unidades_medidas", table => {
        table.increments("codigo_unidade").primary()
        table.string("nome").notNull().unique()
        table.string("sigla").notNull().unique()
        table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
        table.timestamp("alterado_em")
    }).then(function () {
        return knex("unidades_medidas").insert([
            {
                nome: "Unidade", sigla: "UN"
            },
            {
                nome: "Caixa", sigla: "CX"
            },
            {
                nome: "Litro", sigla: "LT"
            },
            {
                nome: "Metro Quadrado", sigla: "M²"
            },
            {
                nome: "Pacote", sigla: "PT"
            },
            {
                nome: "Quilograma", sigla: "KG"
            }
        ])
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("unidades_medidas")
};
