exports.up = function (knex) {
    return knex.schema.createTable("cadastro_fornecedores", table => {
        table.increments("codigo_fornecedor").primary()
        table.string("pessoa", 15).notNull().defaultTo("Selecione")
        table.string("ativo", 8).notNull().defaultTo("Ativo")
        table.string("nome").notNull().unique()
        table.string("razao_social")
        table.string("email")
        table.string("responsavel")
        table.string("cpf_cnpj").unique()
        table.string("tipo_contribuinte", 19)
        table.string("inscricao_estadual")
        table.string("inscricao_municipal")
        table.string("rg")
        table.string("nascimento", 10) // coluna usada apenas quando vai tranforma um fornecedor em cliente
        table.string("contato_comercial")
        table.string("contato_celular")
        table.integer("id_funcionario").notNull().defaultTo(1) // coluna usada apenas quando vai tranforma um fornecedor em cliente
        table.text('observacao')
        table.double("limite_credito").notNull().defaultTo(0) //coluna usada apenas quando vai tranforma um fornecedor em cliente
        table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
        table.timestamp("alterado_em")
    }).then(function () {
        return knex("cadastro_fornecedores").insert([
            {
                pessoa: "Pessoa física", nome: "CAZIMI CONSTRUÇÃO", razao_social: "FORNECEDOR JOÃO LIMA DA SILVA LTDA", limite_credito: 0
            },
            {
                pessoa: "Pessoa física", nome: "Fátima e Valentina Eletrônica Ltda", razao_social: "Fátima e Valentina Eletrônica Ltda", limite_credito: 0
            },
            {
                pessoa: "Pessoa física", nome: "SOFTCOM TECNOLOGIA LTDA", razao_social: "FORNECEDOR JOÃO LIMA DA SILVA LTDA2we", limite_credito: 0
            },
            {
                pessoa: "Pessoa física", nome: "AMAZOM LTDA", razao_social: "CONSUweweMIDOR3", limite_credito: 0
            },
            {
                pessoa: "Pessoa física", nome: "LOJAS AMERICAS", razao_social: "FORNECEDOR JOÃO LIMA DA SILVA LTDAwewe4", limite_credito: 0
            }
        ])
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_fornecedores")
};
