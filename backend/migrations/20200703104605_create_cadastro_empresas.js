exports.up = function (knex) {
    return knex.schema.createTable("cadastro_empresas", table => {
        table.increments("codigo_empresa").primary()
        table.string("pessoa", 15).notNull().defaultTo("Selecione")
        table.string("ativo", 8).notNull().defaultTo("Ativo")
        table.string("empresa").notNull().unique()
        table.string("fantasia").notNull().unique()
        table.string("razao_social")
        table.string("email")
        table.string("cpf_cnpj").unique()
        table.string("tipo_contribuinte", 19)
        table.string("inscricao_estadual")
        table.string("inscricao_municipal")
        table.string("contato_comercial")
        table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
        table.timestamp("alterado_em")
    }).then(function () {
        return knex("cadastro_empresas").insert([
            {
                pessoa: "Pessoa física",
                empresa: "MATRIZ",
                fantasia: "CAZIMI CONSTRUÇÃO",
                razao_social: "CAZIMI CONSTRUÇÃO LTDA"
            },
            {
                pessoa: "Pessoa física",
                empresa: "FILIAL 1",
                fantasia: "CAZIMI CONSTRUÇÃO FILIAL 1",
                razao_social: "FILIAL CAZIMI CONSTRUÇÃO"
            },
        ])
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_empresas")
};
