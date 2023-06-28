module.exports = app => {
    const { existeOuErro, naoExisteNoBancoOuErro, existeNoBancoOuErro } = app.api.validador

    const saveXML = async (req, res) => {
        const compraBody = {
            codigo_compra: req.body.codigo_compra,
            data_entrada: req.body.data_entrada,
            natureza_operacao: req.body.ide.ide_natope,
            serie_numero: `${req.body.ide.ide_serie}/${req.body.ide.ide_nnf}`,
            serie_nfe: req.body.ide.ide_serie,
            numero_nfe: req.body.ide.ide_nnf,
            data_emissao: req.body.ide.ide_dhemi,
            chave_acesso: req.body.protnfe.protnfe_chnfe,

            razao_social: req.body.emit.emit_xnome,
            fantasia: req.body.emit.emit_xfant,
            cnpj: req.body.emit.emit_cnpj,
            inscricao_estadual: req.body.emit.emit_ie,
            endereco: `${req.body.emit.emit_xlgr}, ${req.body.emit.emit_nro}`,
            numero_endereco: req.body.emit.emit_nro,
            bairro: req.body.emit.emit_xbairro,
            cidade_uf: `${req.body.emit.emit_xmun}/${req.body.emit.emit_uf}`,
            cidade: req.body.emit.emit_xmun,
            uf: req.body.emit.emit_uf,
            cep: req.body.emit.emit_cep,
            telefone: req.body.emit.emit_fone,
            id_fornecedor: req.body.fornecedor,

            trans_razao: req.body.transpo.transp_transporta_xnome,
            trans_cpf: req.body.transpo.transp_transporta_cpf,
            trans_cnpj: req.body.transpo.transp_transporta_cnpj,
            trans_inscricao_estadual: req.body.transpo.transp_transporta_ie,
            trans_endereco: req.body.transpo.transp_transporta_xender,
            trans_cidade_uf: `${req.body.transpo.transp_transporta_xmun}/${req.body.transpo.transp_transporta_uf}`,
            trans_cidade: req.body.transpo.transp_transporta_xmun,
            trans_uf: req.body.transpo.transp_transporta_uf,
            id_transportadora: req.body.transportadora,

            base_calculo_icm: req.body.total_vlrs_icms.total_vbc,
            valor_icms: req.body.total_vlrs_icms.total_vicms,
            base_calculo_st: req.body.total_vlrs_icms.total_vbcst,
            valor_icms_st: req.body.total_vlrs_icms.total_vst,
            total_outras_despesas: req.body.total_vlrs_icms.total_voutro,
            total_produtos: req.body.total_vlrs_icms.total_vprod,
            valor_frete: req.body.total_vlrs_icms.total_vfrete,
            desconto: req.body.total_vlrs_icms.total_vdesc,
            valor_ipi: req.body.total_vlrs_icms.total_vipi,
            peso_bruto_liquido: `${req.body.transpo.transp_vol_pesol ? req.body.transpo.transp_vol_pesol : 000} - ${req.body.transpo.transp_vol_pesob ? req.body.transpo.transp_vol_pesob : 000}`,
            peso_liquido: req.body.transpo.transp_vol_pesol,
            peso_bruto: req.body.transpo.transp_vol_pesob,
            total_nota: req.body.total_vlrs_icms.total_vnf,

            status: "Pendente",
            id_funcionario: req.body.funcionario,
            nota_xml_original_completa: req.body.notaOriginal,
        }
        if (req.params.id) compraBody.codigo_compra = req.params.id

        /*  console.log(req.body) */
        try {
            /* VALIDA SE VEIO DUPLICATAS NO XML SE TIVER SETA NO CABEÇALHO DA COMPRA O CABEÇALHO DAS DUPLICATAS */
            if (req.body.cobr && req.body.cobr.cobr_fat_nfat && req.body.cobr.cobr_fat_vliq && req.body.cobr.cobr_fat_vorig && req.body.cobr.dup) {
                compraBody.fatura_numero = req.body.cobr.cobr_fat_nfat
                compraBody.fatura_valor_liquido = req.body.cobr.cobr_fat_vliq
                compraBody.fatura_valor_original = req.body.cobr.cobr_fat_vorig
                compraBody.fatura_qtds_duplicatas = req.body.cobr.dup.length
                compraBody.fatura_json_duplicatas = JSON.stringify(req.body.cobr.dup)
            }
            existeOuErro(compraBody.chave_acesso, "Erro ao carregar [Chave de acesso].")
            await naoExisteNoBancoOuErro("cadastro_compras_cabecalho", "chave_acesso", compraBody.chave_acesso, "Esta NF-e já foi importada.")
            existeOuErro(compraBody.id_funcionario, "Erro ao carregar [Funcionario].")
            existeOuErro(compraBody.natureza_operacao, "Erro ao carregar [Natureza da operação].")
            existeOuErro(compraBody.serie_nfe, "Erro ao carregar [Série/NFe].")
            existeOuErro(compraBody.numero_nfe, "Erro ao carregar [Série/NFe].")
            existeOuErro(compraBody.data_emissao, "Erro ao carregar [Data da emissão].")

            existeOuErro(compraBody.razao_social, "Erro ao carregar [Razão social].")
            existeOuErro(compraBody.fantasia, "Erro ao carregar [Fantasia].")
            existeOuErro(compraBody.cnpj, "Erro ao carregar [CNPJ].")
            existeOuErro(compraBody.inscricao_estadual, "Erro ao carregar [Inscrição estadual].")
            existeOuErro(compraBody.endereco, "Erro ao carregar [Endereço].")
            existeOuErro(compraBody.bairro, "Erro ao carregar [Bairro].")
            existeOuErro(compraBody.cidade, "Erro ao carregar [Cidade/UF].")
            existeOuErro(compraBody.uf, "Erro ao carregar [Cidade/UF].")
            existeOuErro(compraBody.cep, "Erro ao carregar [CEP].")

            existeOuErro(compraBody.base_calculo_icm, "Erro ao carregar [Base de Cálculo de ICMS].")
            existeOuErro(compraBody.valor_icms, "Erro ao carregar [Valor do ICMS].")
            existeOuErro(compraBody.base_calculo_st, "Erro ao carregar [Base de Cálculo ST].")
            existeOuErro(compraBody.valor_icms_st, "Erro ao carregar [Valor do ICMS ST].")
            existeOuErro(compraBody.total_outras_despesas, "Erro ao carregar [Total de Outras Despesas].")
            existeOuErro(compraBody.total_produtos, "Erro ao carregar [Total dos produtos].")
            existeOuErro(compraBody.valor_frete, "Erro ao carregar [Valor do frete].")
            existeOuErro(compraBody.desconto, "Erro ao carregar [Desconto].")
            existeOuErro(compraBody.valor_ipi, "Erro ao carregar [Valor do IPI].")
            existeOuErro(compraBody.total_nota, "Erro ao carregar [Total da nota].")

            existeOuErro(compraBody.status, "Erro ao carregar [Status da nota].")
        } catch (msg) {
            return res.status(400).send(msg)
        }

        try {
            app.db.transaction(async trans => {
                compraBody.cadastrado_em = app.db.fn.now()
                await trans("cadastro_compras_cabecalho")
                    .insert(compraBody)
                    .returning('codigo_compra') /* RETORNA O ID DO CABEÇALHO CADASTRADO */
                    .then(async codigoCompra => {
                        const produtosNota = []; /* Array que vai guarda todos itens da nota para ser inserido todos de uma vez */
                        /*  PERCORRE TODOS OS ITENS DA NOTA EXECUTADO METODOS E VALIDAÇÃO */
                        for (let i = 0; req.body.det_produtos.length > i; i++) {
                            const modeloProduto = {
                                id_compra: codigoCompra[0],
                                codigo_mercadoria_fornecedor: req.body.det_produtos[i].det_prod_cprod,
                                descricao_produto: req.body.det_produtos[i].det_prod_xprod,
                                unidade: req.body.det_produtos[i].det_prod_ucom,
                                quantidade: req.body.det_produtos[i].det_prod_qcom,
                                valor_unitario: req.body.det_produtos[i].det_prod_vuncom,
                                valor_total: req.body.det_produtos[i].det_prod_vprod,
                                ncm: req.body.det_produtos[i].det_prod_ncm,
                                cfop: req.body.det_produtos[i].det_prod_cfop,
                                frete: req.body.det_produtos[i].det_prod_vfrete,
                                desconto: req.body.det_produtos[i].det_prod_vdesc,
                                icms_st: req.body.det_produtos[i].det_imposto_icms_vicmsst,
                                valor_ipi: req.body.det_produtos[i].det_imposto_ipitrib_vipi,
                                outras_despesas: req.body.det_produtos[i].det_prod_voutro,
                            }
                            existeOuErro(modeloProduto.codigo_mercadoria_fornecedor, "Erro ao carregar [Produtos > Código].")
                            existeOuErro(modeloProduto.descricao_produto, "Erro ao carregar [Produtos > Descrição do produto].")
                            existeOuErro(modeloProduto.unidade, "Erro ao carregar [Produtos > Unidade].")
                            existeOuErro(modeloProduto.quantidade, "Erro ao carregar [Produtos > Quant.].")
                            existeOuErro(modeloProduto.valor_unitario, "Erro ao carregar [Produtos > Vr. unitário].")
                            existeOuErro(modeloProduto.valor_total, "Erro ao carregar [Produtos > Vr. total].")
                            existeOuErro(modeloProduto.ncm, "Erro ao carregar [Produtos > NCM].")
                            existeOuErro(modeloProduto.cfop, "Erro ao carregar [Produtos > CFOP].")

                            produtosNota.push(modeloProduto) /* adiciona o item ao array de itens que vai ser salvo no banco de dados */
                        };

                        await trans("cadastro_compras_mercadorias")
                            .insert(produtosNota)
                    }
                    )
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
                    await trans("memoria_auto_import_mercadoria")
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
        /*   app.db
              .table("cadastro_compras_cabecalho")
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
              .orderBy('cadastro_mercadorias.codigo_mercadoria', 'asc')
              .then(mercadorias => res.json(mercadorias))
              .catch(err => res.status(500).send(err)) */
        app.db("cadastro_compras_cabecalho")
            .select()
            .then(compras => res.json(compras))
            .catch(err => res.status(500).send(err))

    }

    const getMercadorias = (req, res) => {
        const codigoParams = req.params.id;
        app.db
            .table("cadastro_compras_mercadorias")
            .select("cadastro_compras_mercadorias.*")
            .leftJoin("cadastro_compras_cabecalho", "cadastro_compras_cabecalho.codigo_compra", "cadastro_compras_mercadorias.id_compra")
            .where({ 'id_compra': codigoParams })
            .then(async mercadorias => {
                /* PERCORRE TODAS AS MERCADORIAS VERIFICANDO SE ELA JA TEM CADASTRO NO AUTO IMPORTE */
                /* SE A MERCADORIA TIVER AUTO IMPORT SETA OS VALORES DE VENDA E COMPRA ANTERIOR  */
                for (let i = 0; mercadorias.length > i; i++) {
                    const cabecalhoCompraFromDB = await existeNoBancoOuErro("cadastro_compras_cabecalho", "codigo_compra", codigoParams, "Cabeçalho não encontrado!")
                    const autoImportFromDB = await app.db("memoria_auto_import_mercadoria_compra").where({ cnpj_fornecedor: cabecalhoCompraFromDB.cnpj }).andWhere({ codigo_mercadoria_fornecedor: mercadorias[i].codigo_mercadoria_fornecedor }).first()
                    if (autoImportFromDB) {
                        mercadorias[i].id_mercadoria_referenciada = autoImportFromDB.id_mercadoria
                        mercadorias[i].quantidade_converter = autoImportFromDB.quantidade_converter
                        const mercadoriaFromDB = await app.db("cadastro_mercadorias").where({ codigo_mercadoria: autoImportFromDB.id_mercadoria }).first()
                        mercadorias[i].preco_venda = mercadoriaFromDB.preco_venda
                        mercadorias[i].preco_venda_f1 = mercadoriaFromDB.preco_venda_f1
                        mercadorias[i].preco_venda_f2 = mercadoriaFromDB.preco_venda_f2
                        mercadorias[i].preco_venda_f3 = mercadoriaFromDB.preco_venda_f3
                        mercadorias[i].valor_custo_anterior = mercadoriaFromDB.valor_custo
                        mercadorias[i].preco_venda_anterior = mercadoriaFromDB.preco_venda
                        mercadorias[i].preco_venda_f1_anterior = mercadoriaFromDB.preco_venda_f1
                        mercadorias[i].preco_venda_f2_anterior = mercadoriaFromDB.preco_venda_f2
                        mercadorias[i].preco_venda_f3_anterior = mercadoriaFromDB.preco_venda_f3

                        mercadorias[i].mercadoria_referenciada = mercadoriaFromDB.mercadoria
                        mercadorias[i].novo_naocadastrar_referenciar = "Referenciada"
                        mercadorias[i].codigo_mercadoria_referenciada = mercadoriaFromDB.codigo_mercadoria
                    }
                    mercadorias[i].novo_naocadastrar_referenciar = "Nova"
                }
                res.json(mercadorias)
                /*   console.log(mercadorias) */
            })

            .catch(err => res.status(500).send(err))
    }

    /* ULTIZADO PARA REFERENCIAS= CODIGO# DESCRIÇÃODAMERCADORIA |CODIGOINTERNO| */
    const getMercadoriasFromDB = (req, res) => {
        app.db
            .table("cadastro_mercadorias")
            .select("codigo_mercadoria", "mercadoria", "codigo_interno")
            .where({ produto_ativo: true })
            .orderBy('mercadoria', 'asc')
            .then(mercadorias => {
                const dataMercadoriaFormatada = []

                for (let i = 0; mercadorias.length > i; i++) {
                    dataMercadoriaFormatada.push(`#${mercadorias[i].codigo_mercadoria}# ${mercadorias[i].mercadoria} | ${mercadorias[i].codigo_interno} |`)
                }
                res.json(dataMercadoriaFormatada)
            }

            )
            .catch(err => res.status(500).send(err))
    }

    return { saveXML, get, remove, getMercadorias, getMercadoriasFromDB }
}
