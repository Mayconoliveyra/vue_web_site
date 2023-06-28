const bcrypt = require("bcrypt-nodejs")

module.exports = app => {
        const { existeOuErro, formateSoNumero, naoExisteNoBancoOuErro } = app.api.validador

        const cryptografarSenha = senha => {
                const salt = bcrypt.genSaltSync(10)
                return bcrypt.hashSync(senha, salt)
        }
        
        const save = async (req, res) => {
                const funcionarioBody = { ...req.body };
                if (req.params.id) funcionarioBody.codigo_funcionario = req.params.id
                funcionarioBody.cpf = formateSoNumero(funcionarioBody.cpf)
                funcionarioBody.enderecos = JSON.stringify(funcionarioBody.enderecos)
                funcionarioBody.contatos = JSON.stringify(funcionarioBody.contatos)
                if (funcionarioBody.email) funcionarioBody.email = funcionarioBody.email.toLowerCase()

                try {
                        existeOuErro(funcionarioBody.nome, "Preencha o [Nome] do funcionário.");

                        if (!funcionarioBody.codigo_funcionario) {
                                await naoExisteNoBancoOuErro("cadastro_funcionarios", "nome", funcionarioBody.nome, "O [Nome] já está em uso.")
                                if (funcionarioBody.email) {
                                        await naoExisteNoBancoOuErro("cadastro_funcionarios", "email", funcionarioBody.email, "O [E-MAIL] já está em uso.")
                                }
                        } else {
                                const funcionarioFromDB = await app.db("cadastro_funcionarios").where({ codigo_funcionario: funcionarioBody.codigo_funcionario }).first()
                                if (funcionarioFromDB.nome != funcionarioBody.nome) {
                                        await naoExisteNoBancoOuErro("cadastro_funcionarios", "nome", funcionarioBody.nome, "O [Nome] já está em uso.")
                                }
                                if (funcionarioBody.email) {
                                        if (funcionarioFromDB.email != funcionarioBody.email) {
                                                await naoExisteNoBancoOuErro("cadastro_funcionarios", "email", funcionarioBody.email, "O [E-MAIL] já está em uso.")
                                        }
                                }
                        }
                } catch (msg) {
                        return res.status(400).send(msg)
                }

                if (!funcionarioBody.codigo_funcionario || funcionarioBody.redefinirSenha) {
                        funcionarioBody.senha = cryptografarSenha(funcionarioBody.senha)
                }
                delete funcionarioBody.redefinirSenha
                try {
                        if (funcionarioBody.codigo_funcionario) {
                                funcionarioBody.alterado_em = app.db.fn.now()
                                await app.db("cadastro_funcionarios")
                                        .update(funcionarioBody)
                                        .where({ codigo_funcionario: funcionarioBody.codigo_funcionario })
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send(err))
                        } else {
                                funcionarioBody.cadastrado_em = app.db.fn.now()
                                await app.db("cadastro_funcionarios")
                                        .insert(funcionarioBody)
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send(err))
                        }
                } catch (msg) {
                        return res.status(500).send(msg)
                }
        }
        const remove = async (req, res) => {
                const codigoParams = req.params.id;
                try {
                        const funcionarioFromDB = await app.db("cadastro_funcionarios")
                                .where({ codigo_funcionario: codigoParams }).first()
                        existeOuErro(funcionarioFromDB, "Funcinário não foi encotrado!.")

                        if (funcionarioFromDB) {
                                await app.db("cadastro_funcionarios")
                                        .delete()
                                        .where({ codigo_funcionario: codigoParams })
                                        .then(() => res.status(204).send())
                                        .catch(err => res.status(500).send("O registro não pode ser excluído por possuir dependentes."))
                        }
                } catch (msg) {
                        res.status(400).send(msg)
                }
        }
        const get = (req, res) => {
                app.db("cadastro_funcionarios")
                        .select()
                        .then(funcionario => res.json(funcionario))
                        .catch(err => res.status(500).send(err))
        }

        return { save, get, remove }
}