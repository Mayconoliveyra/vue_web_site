exports.up = function (knex) {
    return knex.schema.createTable("cadastro_clientes", table => {
        table.increments("codigo_cliente").primary()
        table.string("documento")
        table.string("nome").notNull()
        table.string("numero_contato")
        table.string("email")
        table.string("nascimento", 10)
        table.string("cep")
        table.string("logradouro")
        table.string("numero")
        table.string("complemento")
        table.string("bairro")
        table.string("cidade_uf")
        table.text('observacao')
        table.string("status", 8).notNull().defaultTo("Ativo")
        table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
        table.timestamp("alterado_em")
    }).then(function () {
        return knex("cadastro_clientes").insert([
            {
                nome: "CONSUMIDOR"
            },
            {
                documento: "11675174407", nome: "MAYCON DEYVID BRITO DE OLIVEIRA"
            },
            {
                nome: "Fátima e Valentina Eletrônica Ltda"
            },
            {
                nome: "MAYCON BRITO DE OLIVEIRA"
            },
            {
                nome: "jOÃO DA SILMA MELO OLIVEIRA"
            },
            {
                nome: "CAROL LIMA SANTOS"
            },
            {
                nome: "ZÉ PEBA"
            },
            {
                nome: "MARIA SILVA"
            },
            {
                nome: "JOAQUIM MELO BEZERRA"
            },
            {
                nome: "TOMAS BEZERRA MELO SANTOS OLIVEIRA"
            },
            {
                nome: "MARIA"
            }
        ])
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_clientes")
};
