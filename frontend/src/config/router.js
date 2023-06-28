import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../components/home/Home"
import AutenticacaoFuncionarios from "../components/auth/AutenticacaoFuncionarios"
import CadastroClientes from "@/components/cadastros/clientes/CadastroClientes"
import CadastroFornecedores from "@/components/cadastros/fornecedores/CadastroFornecedores"
import CadastroFuncionarios from "@/components/cadastros/funcionarios/CadastroFuncionarios"
import CadastroMercadorias from "@/components/cadastros/mercadorias/CadastroMercadorias"
import CadastroAuxiliares from "@/components/cadastros/auxiliares/CadastroAuxiliares"

import CadastroCompras from "@/components/compras/CadastroCompras"
import { usuarioChave, baseApiUrl, showError } from "../../global"
import axios from "axios"
Vue.use(VueRouter)

const routes = [
    {
        name: "home",
        path: "/",
        component: Home
    }, {
        name: "autenticacao",
        path: "/autenticacao",
        component: AutenticacaoFuncionarios
    },
    {
        name: "cadastro_clientes",
        path: "/cadastro_clientes",
        component: CadastroClientes,
        meta: { requiresAutenticado: true }
    },
    {
        name: "cadastro_funcionarios",
        path: "/cadastro_funcionarios",
        component: CadastroFuncionarios,
        meta: { requiresAutenticado: true }
    },
    {
        name: "cadastro_fornecedores",
        path: "/cadastro_fornecedores",
        component: CadastroFornecedores,
        meta: { requiresAutenticado: true }
    },
    {
        name: "cadastro_mercadorias",
        path: "/cadastro_mercadorias",
        component: CadastroMercadorias,
        meta: { requiresAutenticado: true }
    },
    {
        name: "cadastro_auxiliares",
        path: "/cadastro_auxiliares",
        component: CadastroAuxiliares,
        meta: { requiresAutenticado: true }
    },
    {
        name: "cadastro_compras",
        path: "/cadastro_compras",
        component: CadastroCompras,
        meta: { requiresAutenticado: true }
    }
]

const router = new VueRouter({
    mode: "history",
    routes,
})

// REGRAS DE ROUTER (RESTRIÇÕES)
//essa funcão recebe varios paramentros: to= para onde eu vou, from= de onde estou vindo, next= para onde vou
router.beforeEach(async (to, from, next) => {
    const json = localStorage.getItem(usuarioChave)
    // VALIDA SE O USUARIO ESTÁ LOGADO.
    if (to.matched.some(record => record.meta.requiresAutenticado)) {
        const url = `${baseApiUrl}/validarToken`
        await axios.post(url, JSON.parse(json))
            .then(res => {
                res.data ? next() : next({ path: "/autenticacao" })
            }
            )
            .catch(showError)
    } else {
        next()
    }

    // VALIDA SE O USUARIO LOGADO É ADMINISTRADOR. 
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const url = `${baseApiUrl}/validarUsuarioAdm`
        await axios.post(url, JSON.parse(json))
            .then(res => {
                res.data ? next() : next({ path: "/autenticacao" })
            }
            )
            .catch(showError)
    } else {
        next()
    }

})


export default router