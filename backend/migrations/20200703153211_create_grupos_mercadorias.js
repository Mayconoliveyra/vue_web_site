exports.up = function (knex) {
    return knex.schema.createTable("grupos_produtos", table => {
        table.increments("codigo_grupo").primary()
        table.string("nome").notNull().unique()
        table.integer("id_grupo_pai")
        table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
        table.timestamp("alterado_em")
    }).then(function () {
        return knex("grupos_produtos").insert([
            {
                nome: "Selecione",
            },
            {
                nome: "Alimentos",
            },
            {
                nome: "Bebidas",
            },
            {
                nome: "Cama, Mesa e Banho",
            },
            {
                nome: "Diversos",
            },
            {
                nome: "Eletrodomésticos",
            },
            {
                nome: "Eletrônicos",
            },
            {
                nome: "Informática",
            },
            {
                nome: "Móveis e Decoração",
            },
            {
                nome: "Telefonia",
            }
        ])
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("grupos_produtos")
};
