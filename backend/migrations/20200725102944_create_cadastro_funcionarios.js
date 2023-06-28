exports.up = async function (knex) {
        return knex.schema.createTable("cadastro_funcionarios", table => {
                table.increments("codigo_funcionario").primary()
                table.string("ativo", 8).notNull().defaultTo("Ativo")
                table.string("nome").notNull().unique()
                table.string("cpf")
                table.string("rg")
                table.string("nascimento", 10)
                table.string("sexo").defaultTo("Selecione")
                table.string("email")
                table.string("senha")
                table.string("cargo").defaultTo("Selecione").notNull()
                table.string("permissao").defaultTo("Selecione").notNull()
                table.decimal("comissao").defaultTo(0)
                table.decimal("maximo_desconto").defaultTo(0)
                table.text('observacao')
                table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
                table.timestamp("alterado_em")
        }).then(function () {
                return knex("cadastro_funcionarios").insert([
                        {
                                nome: "SoftWeb", email: "softweb@", senha: '$2a$10$oq1vflsW2DMOj4kiqImqluM6/FWAOIpJovPOA8MOWhuIOfHEiL0om'
                        }
                ])
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("cadastro_funcionarios")
};
