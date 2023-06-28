exports.up = function (knex) {
    return knex.schema.createTable("cadastro_compras_cabecalho", table => {
        table.increments("codigo_compra").primary()
        table.datetime("data_entrada").defaultTo(knex.fn.now())

        table.string("natureza_operacao").notNull()
        table.string("serie_numero").notNull()
        table.string("serie_nfe").notNull()
        table.string("numero_nfe").notNull()
        table.datetime("data_emissao").notNull()
        table.string("chave_acesso").notNull().unique()

        table.string("razao_social").notNull()
        table.string("fantasia").notNull()
        table.string("cnpj").notNull()
        table.string("inscricao_estadual").notNull()
        table.string("endereco").notNull()
        table.string("numero_endereco").notNull()
        table.string("bairro").notNull()
        table.string("cidade_uf").notNull()
        table.string("cidade").notNull()
        table.string("uf").notNull()
        table.string("cep").notNull()
        table.string("telefone").notNull()
        table.integer("id_fornecedor").notNull().defaultTo(1)

        table.string("trans_razao")
        table.string("trans_cpf")
        table.string("trans_cnpj")
        table.string("trans_inscricao_estadual")
        table.string("trans_endereco")
        table.string("trans_cidade_uf")
        table.string("trans_cidade")
        table.string("trans_uf")
        table.integer("id_transportadora").notNull().defaultTo(1)

        table.float("base_calculo_icm").notNull()
        table.float("valor_icms").notNull()
        table.float("base_calculo_st").notNull()
        table.float("valor_icms_st").notNull()
        table.float("total_outras_despesas").notNull()
        table.float("total_produtos").notNull()
        table.float("valor_frete").notNull()
        table.float("desconto").notNull()
        table.float("valor_ipi").notNull()
        table.string("peso_bruto_liquido")
        table.float("peso_liquido")
        table.float("peso_bruto")
        table.float("total_nota").notNull()

        /* CABEÇALHO DAS DUPLICATAS */
        table.string("fatura_numero")
        table.float("fatura_valor_liquido")
        table.float("fatura_valor_original")
        table.integer("fatura_qtds_duplicatas")
        table.text("fatura_json_duplicatas").notNull().defaultTo("[]")

        table.string("status").notNull() // status da nfe - se ja foi compra ou esta pedente

        table.integer("id_funcionario").unsigned().notNull().references("codigo_funcionario").inTable("cadastro_funcionarios")
        table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
        table.timestamp("alterado_em")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_compras_cabecalho")
};
