module.exports = app => {
    const { existeOuErro, naoExisteNoBancoOuErro, existeNoBancoOuErro, retornarID } = app.api.validador

    const save = async (req, res) => {
        const clienteBody = {
            documento,
            nome,
            numero_contato,
            email,
            nascimento,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade_uf,
            observacao,
            status,
            cadastrado_em,
            alterado_em,
        } = req.body
        if (req.params.id) clienteBody.codigo_cliente = req.params.id
        console.log(clienteBody)
        try {

            if (clienteBody.documento && !clienteBody.codigo_cliente) {
                await naoExisteNoBancoOuErro("cadastro_clientes", "documento", clienteBody.documento, "Já existe cadastro com o [Documento(CPF/CNPJ/RG)] informado!.")
            }

            // SE O CLIENTE FOR ALTERAR CNPJ/CPF VALIDA SE NAO JA TEM CADASTRADO
            if (clienteBody.codigo_cliente && clienteBody.documento) {
                const clienteFromDB = await app.db("cadastro_clientes").where({ codigo_cliente: clienteBody.codigo_cliente }).first()
                if (clienteFromDB.documento != clienteBody.documento) {
                    await naoExisteNoBancoOuErro("cadastro_clientes", "documento", clienteBody.documento, "Já existe cadastro com o [Documento(CPF/CNPJ/RG] informado!.")
                }
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (clienteBody.codigo_cliente) {
            clienteBody.alterado_em = app.db.fn.now()
            await app.db("cadastro_clientes")
                .update(clienteBody)
                .where({ codigo_cliente: clienteBody.codigo_cliente })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            clienteBody.cadastrado_em = app.db.fn.now()
            await app.db("cadastro_clientes")
                .insert(clienteBody)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const remove = async (req, res) => {
        const codigoParams = req.params.id;
        try {
            const clienteFromDB = await app.db("cadastro_clientes")
                .where({ codigo_cliente: codigoParams }).first()
            existeOuErro(clienteFromDB, "Cliente não foi encotrado!.")

            if (clienteFromDB) {
                await app.db("cadastro_clientes")
                    .delete()
                    .where({ codigo_cliente: codigoParams })
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send("O registro não pode ser excluído por possuir dependentes."))
            }
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db
            .table("cadastro_clientes")
            .select(
                "cadastro_clientes.codigo_cliente",
                "cadastro_clientes.documento",
                "cadastro_clientes.nome",
                "cadastro_clientes.numero_contato",
                "cadastro_clientes.email",
                "cadastro_clientes.nascimento",
                "cadastro_clientes.cep",
                "cadastro_clientes.logradouro",
                "cadastro_clientes.numero",
                "cadastro_clientes.complemento",
                "cadastro_clientes.bairro",
                "cadastro_clientes.cidade_uf",
                "cadastro_clientes.observacao",
                "cadastro_clientes.status",
                "cadastro_clientes.cadastrado_em",
                "cadastro_clientes.alterado_em")
            .orderBy('cadastro_clientes.codigo_cliente', 'asc')
            .then(clientes => res.json(clientes))
            .catch(err => res.status(500).send(err))
    }
    /* for (let i = 0; clientes.length > i; ++i) {
        clientes[i].nome = `${clientes[i].codigo_cliente}#${clientes[i].nome}`
        clientes[i].funcionario = `${clientes[i].codigo_funcionario}#${clientes[i].funcionario}`
    } */
    return { save, get, remove }
}
