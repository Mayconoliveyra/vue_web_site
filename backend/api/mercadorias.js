module.exports = app => {
    const { existeOuErro, naoExisteNoBancoOuErro, existeNoBancoOuErro } = app.api.validador

    const save = async (req, res) => {
        const mercadoriaBody = { ...req.body }
        if (req.params.id) mercadoriaBody.codigo_mercadoria = req.params.id
        mercadoriaBody.campos_extras = JSON.stringify(mercadoriaBody.campos_extras)
        /* Array que guarda todos os id do fornecedor e codigo da mercadoria para autoimportação */
        const arrayFornecedoresMercadoria = []

        try {
            existeOuErro(mercadoriaBody.mercadoria, "Preencha o [Nome do produto].")
            existeOuErro(mercadoriaBody.codigo_interno, "Preencha o [Código interno].")
            existeOuErro(mercadoriaBody.unidade_medida, "Preencha a [Unidade de medida].")
            existeOuErro(mercadoriaBody.valor_custo, "Preencha o [Valor de custo].")
            existeOuErro(mercadoriaBody.grupo_produto, "Preencha o [Grupo do produto].")

            /* CONSULTA ID DO GRUPO */
            const grupoFromDB = await existeNoBancoOuErro("grupos_produtos", "nome", mercadoriaBody.grupo_produto, "[Grupo do produto] não encontrado.")
            mercadoriaBody.id_grupo_produto = grupoFromDB.codigo_grupo
            delete mercadoriaBody.grupo_produto

            /* CONSULTA ID DA UNIDADE MEDIDA */
            const unidadeFromDB = await existeNoBancoOuErro("unidades_medidas", "sigla", mercadoriaBody.unidade_medida, "[Unidade medida] não encontrada.")
            mercadoriaBody.id_unidade_medida = unidadeFromDB.codigo_unidade
            delete mercadoriaBody.unidade_medida

            if (!mercadoriaBody.codigo_mercadoria) {
                await naoExisteNoBancoOuErro("cadastro_mercadorias", "mercadoria", mercadoriaBody.mercadoria, "Já existe cadastro com o [Nome do produto] informado!.")
                await naoExisteNoBancoOuErro("cadastro_mercadorias", "codigo_interno", mercadoriaBody.codigo_interno, "Já existe cadastro com o [Código interno] informado!.")
                if (mercadoriaBody.codigo_barras) {
                    await naoExisteNoBancoOuErro("cadastro_mercadorias", "codigo_barras", mercadoriaBody.codigo_barras, "Já existe cadastro com o [Código de barra] informado!.")
                }
            }

            /* Valida se os nomes de fornecedores informados são validos e consulta o codigo do fornecedor */
            mercadoriaBody.fornecedores.forEach(async element => {
                try {
                    const fornecedorFromDB = await existeNoBancoOuErro("cadastro_fornecedores", "nome", element.nome_fantasia, "Não foi possível encontrar o [Fornecedor] informado!.<br/> Verifique se você preencheu o nome corretamente na aba [Fornecedores].")
                    arrayFornecedoresMercadoria.push({ id_mercadoria: mercadoriaBody.codigo_mercadoria, id_fornecedor: fornecedorFromDB.codigo_fornecedor, codigo_mercadoria_fornecedor: element.codigo_mercadoria_fornecedor, cnpj_fornecedor: fornecedorFromDB.cpf_cnpj, quantidade_converter: element.quantidade_converter })
                } catch (msg) {
                    return res.status(400).send(msg)
                }
            });
            delete mercadoriaBody.fornecedores

            // SE O FOR ALTERAR VALIDA SE NÃO JA TEM CADASTRADO
            if (mercadoriaBody.codigo_mercadoria) {
                const mercadoriaFromDB = await app.db("cadastro_mercadorias").where({ codigo_mercadoria: mercadoriaBody.codigo_mercadoria }).first()
                /* nome */
                if (mercadoriaFromDB.mercadoria != mercadoriaBody.mercadoria) {
                    await naoExisteNoBancoOuErro("cadastro_mercadorias", "mercadoria", mercadoriaBody.mercadoria, "Já existe cadastro com o [Nome do produto] informado!.")
                }
                /* Código interno */
                if (mercadoriaFromDB.codigo_interno != mercadoriaBody.codigo_interno) {
                    await naoExisteNoBancoOuErro("cadastro_mercadorias", "codigo_interno", mercadoriaBody.codigo_interno, "Já existe cadastro com o [Código interno] informado!.")
                }
                /* Código barras */
                if (mercadoriaFromDB.codigo_barras != mercadoriaBody.codigo_barras) {
                    await naoExisteNoBancoOuErro("cadastro_mercadorias", "codigo_barras", mercadoriaBody.codigo_barras, "Já existe cadastro com o [Código de barra] informado!.")
                }
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }
        try {
            app.db.transaction(async trans => {
                if (mercadoriaBody.codigo_mercadoria) {
                    mercadoriaBody.alterado_em = app.db.fn.now()
                    await trans("cadastro_mercadorias")
                        .update(mercadoriaBody)
                        .where({ codigo_mercadoria: mercadoriaBody.codigo_mercadoria })

                    await trans("memoria_auto_import_mercadoria_compra")
                        .delete()
                        .where({ id_mercadoria: mercadoriaBody.codigo_mercadoria })

                    await trans("memoria_auto_import_mercadoria_compra")
                        .insert(arrayFornecedoresMercadoria)

                } else {
                    mercadoriaBody.cadastrado_em = app.db.fn.now()
                    await trans("cadastro_mercadorias")
                        .insert(mercadoriaBody)
                }
            })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } catch (msg) {
            return res.status(500).send(msg)
        }
    }

    const remove = async (req, res) => {
        const codigoParams = req.params.id;
        try {
            const mercadoriaFromDB = await app.db("cadastro_mercadorias")
                .where({ codigo_mercadoria: codigoParams }).first()
            existeOuErro(mercadoriaFromDB, "Mercadoria não encontrada!.")
            if (mercadoriaFromDB) {
                app.db.transaction(async trans => {
                    await trans("memoria_auto_import_mercadoria_compra")
                        .delete()
                        .where({ id_mercadoria: codigoParams })
                    await trans("cadastro_mercadorias")
                        .delete()
                        .where({ codigo_mercadoria: codigoParams })
                })
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send("O registro não pode ser excluído por possuir dependentes."))
            }
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db
            .table("cadastro_mercadorias")
            .select("grupos_produtos.nome as grupo_produto",
                "unidades_medidas.sigla as unidade_medida",
                "cadastro_mercadorias.codigo_mercadoria",
                "cadastro_mercadorias.mercadoria",
                "cadastro_mercadorias.codigo_interno",
                "cadastro_mercadorias.codigo_barras",
                "cadastro_mercadorias.estoque_minimo",
                "cadastro_mercadorias.estoque_atual",
                "cadastro_mercadorias.produto_ativo",
                "cadastro_mercadorias.valor_custo",
                "cadastro_mercadorias.preco_venda",
                "cadastro_mercadorias.cadastrado_em",
                "cadastro_mercadorias.alterado_em")
            .innerJoin("grupos_produtos", "grupos_produtos.codigo_grupo", "cadastro_mercadorias.id_grupo_produto")
            .innerJoin("unidades_medidas", "unidades_medidas.codigo_unidade", "cadastro_mercadorias.id_unidade_medida")
            .orderBy('cadastro_mercadorias.codigo_mercadoria', 'asc')
            .then(mercadorias => {
                for (let i = 0; mercadorias.length > i; ++i) {
                    mercadorias[i].mercadoria = `${mercadorias[i].codigo_mercadoria}#${mercadorias[i].mercadoria}`
                }
                res.json(mercadorias)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByID = (req, res) => {
        const codigoParams = req.params.id;
        app.db
            .table("cadastro_mercadorias")
            .select("grupos_produtos.nome as grupo_produto", "unidades_medidas.sigla as unidade_medida", "cadastro_mercadorias.codigo_mercadoria", "cadastro_mercadorias.mercadoria", "cadastro_mercadorias.codigo_interno",
                "cadastro_mercadorias.codigo_barras", "cadastro_mercadorias.movimenta_estoque",
                "cadastro_mercadorias.variacoes", "cadastro_mercadorias.composicao", "cadastro_mercadorias.estoque_minimo",
                "cadastro_mercadorias.estoque_maximo", "cadastro_mercadorias.estoque_atual", "cadastro_mercadorias.peso", "cadastro_mercadorias.largura",
                "cadastro_mercadorias.altura", "cadastro_mercadorias.comprimento", "cadastro_mercadorias.produto_ativo",
                "cadastro_mercadorias.produto_ativo", "cadastro_mercadorias.comissao", "cadastro_mercadorias.campos_extras", "cadastro_mercadorias.descricao",
                "cadastro_mercadorias.valor_custo", "cadastro_mercadorias.valor_despesas", "cadastro_mercadorias.valor_outras_despesas",
                "cadastro_mercadorias.valor_custo_final", "cadastro_mercadorias.preco_venda", "cadastro_mercadorias.preco_venda_f1",
                "cadastro_mercadorias.preco_venda_f2", "cadastro_mercadorias.preco_venda_f3", "cadastro_mercadorias.margem_venda",
                "cadastro_mercadorias.margem_venda_f1", "cadastro_mercadorias.margem_venda_f2", "cadastro_mercadorias.margem_venda_f3",
                "cadastro_mercadorias.cadastrado_em", "cadastro_mercadorias.alterado_em")
            .innerJoin("grupos_produtos", "grupos_produtos.codigo_grupo", "cadastro_mercadorias.id_grupo_produto")
            .innerJoin("unidades_medidas", "unidades_medidas.codigo_unidade", "cadastro_mercadorias.id_unidade_medida")
            .where({ codigo_mercadoria: codigoParams })
            .then(mercadorias => res.json(mercadorias))
            .catch(err => res.status(500).send(err))
    }

    const getFornecedoreMercadoria = (req, res) => {
        const codigoParams = req.params.id;
        app.db
            .table("memoria_auto_import_mercadoria_compra")
            .select("cadastro_fornecedores.nome as nome_fantasia ", "codigo_mercadoria_fornecedor", "quantidade_converter")
            .innerJoin("cadastro_fornecedores", "cadastro_fornecedores.codigo_fornecedor", "memoria_auto_import_mercadoria_compra.id_fornecedor")
            .where({ id_mercadoria: codigoParams })
            .then(mercadorias => res.json(mercadorias))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getByID, remove, getFornecedoreMercadoria }
}
