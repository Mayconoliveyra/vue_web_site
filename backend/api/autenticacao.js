const { senhaSecretaAutenticacao } = require("../.env")
const jwt = require("jwt-simple")
const bcrypt = require("bcrypt-nodejs")

module.exports = app => {
        const { existeOuErro } = app.api.validador

        const entrar = async (req, res) => {
                const loginModelo = {
                        email: req.body.email,
                        senha: req.body.senha
                }
                if (loginModelo.email) loginModelo.email = loginModelo.email.toLowerCase()

                try {
                        existeOuErro(loginModelo.email, "Preencha o E-mail!");
                        existeOuErro(loginModelo.senha, "Preencha a Senha!");
                } catch (error) {
                        return res.status(400).send(error)
                }

                const funcionario = await app.db("cadastro_funcionarios")
                        .where({ email: loginModelo.email })
                        .first()
                if (!funcionario) return res.status(400).send("Usuário não encontrado!")
                if (funcionario.desativado) return res.status(400).send("Seu usuário está desativado. Contate o seu Gerente!")

                try {
                        const senhaIgual = bcrypt.compareSync(loginModelo.senha, funcionario.senha)
                        if (!senhaIgual) return res.status(400).send("Email/Senha inválidos!")
                } catch (error) {
                        return res.status(500).send("SENHA: CHAVE DE CRIPTOGRAFIA  INVÁLIDA OU ALTERADA")
                }



                const data = Math.floor(Date.now() / 1000)

                const payload = {
                        codigo_funcionario: funcionario.codigo_funcionario,
                        email: funcionario.email,
                        nome: funcionario.nome,
                        desativado: funcionario.desativado,
                        maximo_desconto: funcionario.maximo_desconto,
                        cadastrado_em: funcionario.cadastrado_em,
                        alterado_em: funcionario.alterado_em,
                        iat: data, // emitido em
                        exp: data + (60 * 60 * 24 * 3) // expira em 3 dias (60segundos x 60 minutos x 24horas x 3 dias)
                }
                res.json({
                        ...payload,
                        token: jwt.encode(payload, senhaSecretaAutenticacao)
                })
        }

        const validarToken = async (req, res) => {
                const dataUsuario = req.body || null
                try {
                        if (dataUsuario) {
                                // VALIDA SE O TOKEN É VALIDO
                                const token = jwt.decode(dataUsuario.token, senhaSecretaAutenticacao)
                                const funcionarioDB = await app.db("cadastro_funcionarios")
                                        .where({ codigo_funcionario: token.codigo_funcionario })
                                        .first()

                                if (!funcionarioDB) return res.send(false)
                                if (funcionarioDB.email !== token.email) return res.send(false)
                                if (funcionarioDB.nome !== token.nome) return res.send(false)
                                if (funcionarioDB.desativado !== token.desativado) return res.send(false)
                                if (funcionarioDB.maximo_desconto !== token.maximo_desconto) return res.send(false)
                                if (JSON.stringify(funcionarioDB.cadastrado_em) != JSON.stringify(token.cadastrado_em)) return res.send(false)
                                if (JSON.stringify(funcionarioDB.alterado_em) != JSON.stringify(token.alterado_em)) return res.send(false)

                                //NO JS A DATA E EM MILISSEGUNDOS, NO TOKEN ESTA EM SEGUNDOS, MULTIPLICO POR 1000 PRA TRANSFORMA EM MILISSEGUNDOS TBM.
                                if (new Date(token.exp * 1000) > new Date()) {
                                        return res.send(true)
                                }
                        }
                } catch (e) {
                        // problema com o token
                        // poderia criar  uma nova data de expiração para o teken aqui.  
                }
                res.send(false)
        }

        const validarUsuarioADM = async (req, res) => {
                const dataUsuario = req.body || null
                try {
                        if (dataUsuario) {
                                const usuario = await app.db("usuarios").select("admin", "codigo_usuario").where({ "codigo_usuario": dataUsuario.codigo_usuario }).first()
                                const token = jwt.decode(dataUsuario.token, senhaSecretaAutenticacao)
                                if (new Date(token.exp * 1000) > new Date() && usuario.admin) {
                                        return res.send(true)
                                }
                        }
                } catch (e) {
                }
                res.send(false)
        }

        return { entrar, validarToken, validarUsuarioADM }
}