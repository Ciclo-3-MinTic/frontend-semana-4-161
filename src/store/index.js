import Vue from "vue";
import Vuex from "vuex";
import decode from "jwt-decode";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        usuario: null,
        derechos: null,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUsuario(state, usuario) {
            state.usuario = usuario;
        },
        setDerechos(state, derechos) {
            state.derechos = derechos;
        }
    },
    actions: {
        guardarToken({
            commit
        }, token) {
            commit("setToken", token)
            commit("setUsuario", decode(token))
            localStorage.setItem("token", token)
        },
        autoLogin({
            commit
        }) {

            let token = localStorage.getItem("token");
            if (token) {
                commit("setToken", token);
                commit("setUsuario", decode(token));
            }
            router.push({
                name: 'HomeAdmin'
            }).catch(() => {});

        },
        salirAdmin({
            commit
        }) {
            commit("setToken", null);
            commit("setUsuario", null);
            commit("setDerechos", null);
            localStorage.removeItem("token");
            router.push({
                name: 'LoginAdmin'
            });
        },
        guardarDerechos({
            commit
        }, derechos) {
            commit("setDerechos", derechos)
            
        },
    },
    modules: {}
});