import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;
/* axios.defaults.baseURL = 'http://localhost:3000/api/'; */
axios.defaults.baseURL =
  "https://backend-seamana-4-161-production.up.railway.app/api/";

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
