module.exports = app => {
    const { existeOuErro, formateSoNumero, naoExisteNoBancoOuErro } = app.api.validador

    const save = async (req, res) => {
        const fornecedorBody = { ...req.body }
        if (req.params.id) fornecedorBody.codigo_fornecedor = req.params.id
        fornecedorBody.cpf_cnpj = formateSoNumero(fornecedorBody.cpf_cnpj)
        fornecedorBody.enderecos = JSON.stringify(fornecedorBody.enderecos)
        fornecedorBody.contatos = JSON.stringify(fornecedorBody.contatos)
        try {
            existeOuErro(fornecedorBody.nome, "Preencha o [Nome fantasia].")
            if (!fornecedorBody.codigo_fornecedor) {
                await naoExisteNoBancoOuErro("cadastro_fornecedores", "nome", fornecedorBody.nome, "Já existe cadastro com o [Nome fantasia] informado!.")
            }
            if (fornecedorBody.pessoa == "Selecione") {
                fornecedorBody.cpf_cnpj = null
                fornecedorBody.rg = null
                fornecedorBody.tipo_contribuinte = null
                fornecedorBody.inscricao_estadual = null
                fornecedorBody.inscricao_municipal = null
            }
            if (fornecedorBody.cpf_cnpj && fornecedorBody.pessoa != "Selecione" && !fornecedorBody.codigo_fornecedor) {
                await naoExisteNoBancoOuErro("cadastro_fornecedores", "cpf_cnpj", fornecedorBody.cpf_cnpj, "Já existe cadastro com o [CPF/CNPJ/Documento] informado!.")
            }

            // SE O CLIENTE FOR ALTERAR CNPJ/CPF OU NOME FANTASIA VALIDA SE NAO JA TEM CADASTRADO
            if (fornecedorBody.codigo_fornecedor) {
                const fornecedorFromDB = await app.db("cadastro_fornecedores").where({ codigo_fornecedor: fornecedorBody.codigo_fornecedor }).first()
                if (fornecedorFromDB.nome != fornecedorBody.nome) {
                    await naoExisteNoBancoOuErro("cadastro_fornecedores", "nome", fornecedorBody.nome, "Já existe cadastro com o [Nome fantasia] informado!.")
                }
                if (fornecedorBody.cpf_cnpj && fornecedorFromDB.cpf_cnpj != fornecedorBody.cpf_cnpj) {
                    await naoExisteNoBancoOuErro("cadastro_fornecedores", "cpf_cnpj", fornecedorBody.cpf_cnpj, "Já existe cadastro com o [CPF/CNPJ/Documento] informado!.")
                }
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (fornecedorBody.codigo_fornecedor) {
            fornecedorBody.alterado_em = app.db.fn.now()
            try {
                app.db.transaction(async trans => {
                    await trans("cadastro_fornecedores")
                        .update(fornecedorBody)
                        .where({ codigo_fornecedor: fornecedorBody.codigo_fornecedor })
                    /* ALTERAR O CNPJ NA TABELA DE AUTO IMPORTE DE COMPRA */
                    await trans("memoria_auto_import_mercadoria_compra")
                        .update({ cnpj_fornecedor: fornecedorBody.cpf_cnpj })
                        .where({ id_fornecedor: fornecedorBody.codigo_fornecedor })
                })
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            } catch (msg) {
                return res.status(500).send("Erro ao salvar fornecedor!. <br/>" + msg)
            }

        } else {
            fornecedorBody.cadastrado_em = app.db.fn.now()
            await app.db("cadastro_fornecedores")
                .insert(fornecedorBody)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const remove = async (req, res) => {
        const codigoParams = req.params.id;
        try {
            const fornecedorFromDB = await app.db("cadastro_fornecedores")
                .where({ codigo_fornecedor: codigoParams }).first()
            existeOuErro(fornecedorFromDB, "Fornecedor não encontrado!.")

            if (fornecedorFromDB) {
                await app.db("cadastro_fornecedores")
                    .delete()
                    .where({ codigo_fornecedor: codigoParams })
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send("O registro não pode ser excluído por possuir dependentes."))
            }
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db("cadastro_fornecedores")
            .select()
            .orderBy('codigo_fornecedor', 'desc')
            .then(fornecedores => res.json(fornecedores))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, remove }
}
