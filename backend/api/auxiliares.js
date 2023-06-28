const bcrypt = require("bcrypt-nodejs")

module.exports = app => {
        const { existeOuErro, naoExisteNoBancoOuErro } = app.api.validador
        /* GRUPO */
        const saveGrupo = async (req, res) => {
                const grupoBody = { ...req.body };
                if (req.params.id) grupoBody.codigo_grupo = req.params.id

                try {
                        existeOuErro(grupoBody.nome, "Preencha o [Grupo].");

                        if (!grupoBody.codigo_grupo) {
                                await naoExisteNoBancoOuErro("grupos_produtos", "nome", grupoBody.nome, "O [Grupo] já está em uso.")
                        } else {
                                const grupoFromDB = await app.db("grupos_produtos").where({ codigo_grupo: grupoBody.codigo_grupo }).first()
                                if (grupoFromDB.nome != grupoBody.nome) {
                                        await naoExisteNoBancoOuErro("grupos_produtos", "nome", grupoBody.nome, "O [Grupo] já está em uso.")
                                }
                        }
                        if (grupoBody.id_grupo_pai) {
                                const grupoFromDB = await app.db("grupos_produtos").where({ nome: grupoBody.id_grupo_pai }).first()
                                existeOuErro(grupoFromDB, "[Grupo pai] não encontrado.")
                                grupoBody.id_grupo_pai = grupoFromDB.codigo_grupo
                        } else {
                                grupoBody.id_grupo_pai = null
                        }
                } catch (msg) {
                        return res.status(400).send(msg)
                }

                try {
                        if (grupoBody.codigo_grupo) {
                                grupoBody.alterado_em = app.db.fn.now()
                                await app.db("grupos_produtos")
                                        .update(grupoBody)
                                        .where({ codigo_grupo: grupoBody.codigo_grupo })
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send(err))
                        } else {
                                grupoBody.cadastrado_em = app.db.fn.now()
                                await app.db("grupos_produtos")
                                        .insert(grupoBody)
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send(err))
                        }
                } catch (msg) {
                        return res.status(500).send(msg)
                }
        }
        const removeGrupo = async (req, res) => {
                const codigoParams = req.params.id;
                try {
                        const grupoFromDB = await app.db("grupos_produtos").where({ codigo_grupo: codigoParams }).first()
                        existeOuErro(grupoFromDB, "Grupo não foi encotrado!.")
                        await naoExisteNoBancoOuErro("grupos_produtos", "id_grupo_pai", codigoParams, "O registro não pode ser excluído por possuir dependentes.")
                        if (grupoFromDB) {
                                await app.db("grupos_produtos")
                                        .delete()
                                        .where({ codigo_grupo: codigoParams })
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send("O registro não pode ser excluído por possuir dependentes."))
                        }
                } catch (msg) {
                        res.status(400).send(msg)
                }
        }
        const getGrupo = (req, res) => {
                app.db("grupos_produtos")
                        .select()
                        .then(grupos => {
                                const dataGrupos = [];
                                grupos.forEach(element => {
                                        /* Percorre todo array e pega os códigos dos grupos pai e coloca o nome do grupo */
                                        if (element.id_grupo_pai) {
                                                let nomeGrupoPai = grupos.find(grupo => grupo.codigo_grupo == element.id_grupo_pai)
                                                element.id_grupo_pai = nomeGrupoPai.nome
                                                dataGrupos.push(element)
                                        } else {
                                                dataGrupos.push(element)
                                        }
                                });
                                res.json(dataGrupos)
                        })
                        .catch(err => res.status(500).send(err))
        }

        /* CAMPOS EXTRAS */
        const saveExtra = async (req, res) => {
                const extraBody = { ...req.body };
                if (req.params.id) extraBody.codigo_extra = req.params.id

                try {
                        existeOuErro(extraBody.nome, "Preencha o [Nome].");
                        if (!extraBody.codigo_extra) {
                                await naoExisteNoBancoOuErro("campos_extras", "nome", extraBody.nome, "O [Nome] já está em uso.")
                        } else {
                                const extraFromDB = await app.db("campos_extras").where({ codigo_extra: extraBody.codigo_extra }).first()
                                if (extraFromDB.nome != extraBody.nome) {
                                        await naoExisteNoBancoOuErro("campos_extras", "nome", extraBody.nome, "O [Nome] já está em uso.")
                                }
                        }
                } catch (msg) {
                        return res.status(400).send(msg)
                }

                try {
                        if (extraBody.codigo_extra) {
                                extraBody.alterado_em = app.db.fn.now()
                                await app.db("campos_extras")
                                        .update(extraBody)
                                        .where({ codigo_extra: extraBody.codigo_extra })
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send(err))
                        } else {
                                extraBody.cadastrado_em = app.db.fn.now()
                                await app.db("campos_extras")
                                        .insert(extraBody)
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send(err))
                        }
                } catch (msg) {
                        return res.status(500).send(msg)
                }
        }
        const removeExtra = async (req, res) => {
                const codigoParams = req.params.id;
                try {
                        const extraFromDB = await app.db("campos_extras").where({ codigo_extra: codigoParams }).first()
                        existeOuErro(extraFromDB, "Campo extra não foi encotrado!.")
                        if (extraFromDB) {
                                await app.db("campos_extras")
                                        .delete()
                                        .where({ codigo_extra: codigoParams })
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send("O registro não pode ser excluído por possuir dependentes."))
                        }
                } catch (msg) {
                        res.status(400).send(msg)
                }
        }
        const getExtra = (req, res) => {
                app.db("campos_extras")
                        .select()
                        .then(extra => { res.json(extra) })
                        .catch(err => res.status(500).send(err))
        }

        /* UNIDADES */
        const saveUnidade = async (req, res) => {
                const unidadeBody = { ...req.body };
                if (req.params.id) unidadeBody.codigo_unidade = req.params.id

                try {
                        existeOuErro(unidadeBody.nome, "Preencha o [Nome].");
                        existeOuErro(unidadeBody.sigla, "Preencha a [Sigla].");
                        if (!unidadeBody.codigo_unidade) {
                                await naoExisteNoBancoOuErro("unidades_medidas", "nome", unidadeBody.nome, "O [Nome] já está em uso.")
                                await naoExisteNoBancoOuErro("unidades_medidas", "sigla", unidadeBody.sigla, "A [Sigla] já está em uso.")
                        } else {
                                const extraFromDB = await app.db("unidades_medidas").where({ codigo_unidade: unidadeBody.codigo_unidade }).first()
                                if (extraFromDB.nome != unidadeBody.nome) {
                                        await naoExisteNoBancoOuErro("unidades_medidas", "nome", unidadeBody.nome, "O [Nome] já está em uso.")
                                }
                                if (extraFromDB.sigla != unidadeBody.sigla) {
                                        await naoExisteNoBancoOuErro("unidades_medidas", "sigla", unidadeBody.sigla, "A [Sigla] já está em uso.")
                                }
                        }
                } catch (msg) {
                        return res.status(400).send(msg)
                }

                try {
                        if (unidadeBody.codigo_unidade) {
                                unidadeBody.alterado_em = app.db.fn.now()
                                await app.db("unidades_medidas")
                                        .update(unidadeBody)
                                        .where({ codigo_unidade: unidadeBody.codigo_unidade })
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send(err))
                        } else {
                                unidadeBody.cadastrado_em = app.db.fn.now()
                                await app.db("unidades_medidas")
                                        .insert(unidadeBody)
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send(err))
                        }
                } catch (msg) {
                        return res.status(500).send(msg)
                }
        }
        const removeUnidade = async (req, res) => {
                const codigoParams = req.params.id;
                try {
                        const unidadeFromDB = await app.db("unidades_medidas").where({ codigo_unidade: codigoParams }).first()
                        existeOuErro(unidadeFromDB, "Unidade não encontrada!.")
                        if (unidadeFromDB) {
                                await app.db("unidades_medidas")
                                        .delete()
                                        .where({ codigo_unidade: codigoParams })
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send("O registro não pode ser excluído por possuir dependentes."))
                        }
                } catch (msg) {
                        res.status(400).send(msg)
                }
        }
        const getUnidade = (req, res) => {
                app.db("unidades_medidas")
                        .select()
                        .then(extra => { res.json(extra) })
                        .catch(err => res.status(500).send(err))
        }

        return { saveGrupo, getGrupo, removeGrupo, saveExtra, getExtra, removeExtra, saveUnidade, removeUnidade, getUnidade }
}