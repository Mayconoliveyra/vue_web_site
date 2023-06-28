import Vue from "vue"
import Toasted from "vue-toasted"

Vue.use(Toasted, {
    iconPack: "fontawesome",
    duration: 9000
})

Vue.toasted.register(
    "defaultSuccess",
    payload => !payload.msg ? "Operação realizada com sucesso!" : payload.msg,
    { type: "success" }
)

Vue.toasted.register(
    "cadastroSuccess",
    payload => !payload.msg ? "Seu cadastro foi realizado com sucesso!" : payload.msg,
    { type: "success" }
)

Vue.toasted.register(
    "defaultError",
    payload => !payload.msg ? "Oops... Erro inesperado." : payload.msg,
    { type: "error" }
)

