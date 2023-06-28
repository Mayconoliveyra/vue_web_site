import Vue from "vue"

export const usuarioChave = "__chave_secreta_softweb"
/* export const baseApiUrl = "https://backend-softcomfaq.herokuapp.com" */
/* export const baseApiUrl = "http://localhost:3030" */
export const baseApiUrl = "http://localhost:3030"

export function showError(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}
export default { baseApiUrl, showError }

