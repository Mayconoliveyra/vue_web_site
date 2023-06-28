import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
        state: {
                tokenFuncionario: {},
                isMenuVisible: false,
                cadastrosMenuVisible: false,
                produtosMenuVisible: false,
                estoqueMenuVisible: false
        },
        mutations: {
                setTokenFuncionario(state, funcionario) {
                        state.tokenFuncionario = funcionario
                        if (funcionario) {
                                axios.defaults.headers.common["Authorization"] = `bearer ${funcionario.token}`
                        } else {
                                delete axios.defaults.headers.common["Authorization"]
                        }
                },
                toggleMenu(state, isVisible) {
                        if (isVisible === undefined) {
                                state.isMenuVisible = !state.isMenuVisible
                        } else {
                                state.isMenuVisible = isVisible
                        }
                        /* console.log("toggleMenu= " + state.isMenuVisible) */
                },

                toggleCadastros(state, isVisible) {
                        if (isVisible === undefined) {
                                state.cadastrosMenuVisible = !state.cadastrosMenuVisible
                        } else {
                                state.cadastrosMenuVisible = isVisible
                        }
                },
                toggleProdutos(state, isVisible) {
                        if (isVisible === undefined) {
                                state.produtosMenuVisible = !state.produtosMenuVisible
                        } else {
                                state.produtosMenuVisible = isVisible
                        }
                },
                toggleEstoque(state, isVisible) {
                        if (isVisible === undefined) {
                                state.estoqueMenuVisible = !state.estoqueMenuVisible
                        } else {
                                state.estoqueMenuVisible = isVisible
                        }
                },

        }

})