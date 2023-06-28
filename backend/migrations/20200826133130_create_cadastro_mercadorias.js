exports.up = function (knex) {
    return knex.schema.createTable("cadastro_mercadorias", table => {
        table.increments("codigo_mercadoria").primary()
        table.string("mercadoria").notNull().collate('utf8_unicode_ci').unique()
        table.string("codigo_interno").notNull().unique()
        table.string("codigo_barras").unique()
        table.integer("id_grupo_produto").unsigned().notNull().references("codigo_grupo").inTable("grupos_produtos").defaultTo(1)
        table.string("movimenta_estoque", 3).notNull().defaultTo("Sim")
        table.string("variacoes", 3).notNull().defaultTo("Não")
        table.string("composicao", 3).notNull().defaultTo("Não")
        table.integer("id_unidade_medida").unsigned().notNull().references("codigo_unidade").inTable("unidades_medidas").defaultTo(1)

        table.decimal("estoque_minimo", 65, 3).notNull().defaultTo(0)
        table.decimal("estoque_maximo", 65, 3).notNull().defaultTo(0)
        table.decimal("estoque_atual", 65, 3).notNull().defaultTo(0)

        table.decimal("peso", 65, 3).notNull().defaultTo(0)
        table.decimal("largura", 65, 3).notNull().defaultTo(0)
        table.decimal("altura", 65, 3).notNull().defaultTo(0)
        table.decimal("comprimento", 65, 3).notNull().defaultTo(0)

        table.boolean("produto_ativo", 1).notNull().defaultTo(1)
        table.decimal("comissao").notNull().defaultTo(0)

        table.text('descricao')

        table.float("valor_custo").notNull().defaultTo(0)
        table.float("valor_despesas").notNull().defaultTo(0)
        table.float("valor_outras_despesas").notNull().defaultTo(0)
        table.float("valor_custo_final").notNull().defaultTo(0)

        table.float("preco_venda").notNull().defaultTo(0)
        table.float("preco_venda_f1").notNull().defaultTo(0)
        table.float("preco_venda_f2").notNull().defaultTo(0)
        table.float("preco_venda_f3").notNull().defaultTo(0)

        table.float("margem_venda").notNull().defaultTo(0)
        table.float("margem_venda_f1").notNull().defaultTo(0)
        table.float("margem_venda_f2").notNull().defaultTo(0)
        table.float("margem_venda_f3").notNull().defaultTo(0)

        table.datetime('cadastrado_em').defaultTo(knex.fn.now())
        table.datetime("alterado_em")
    }).then(function () {
        return knex("cadastro_mercadorias").insert([
            { mercadoria: "BASE PISO G AZUL VERDE VERMELHO PRETO CONCRETO", codigo_interno: "AWE6W84DW8" },
            { mercadoria: "TERMOPAR J ROSCA MOVEL M6 X2MT M6X3,5XFIBRAX 2MTS FIBRAW C/TRANcaV", codigo_interno: "66W8D59E7" },
            { mercadoria: "4234/R3446 - BUCHA MOLA DIANT P/DIANT 62,5X18,3X96 CAPA MB ATEGO 712A2428", codigo_interno: "W6H9Y8M467" },
            { mercadoria: "SACO VALVOPLAC LAMINADO SA - IMPRESSO-MASSA CORRIDA LILAS 15 KG", codigo_interno: "W369R85Y5E88" },
        ])
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_mercadorias")
};
