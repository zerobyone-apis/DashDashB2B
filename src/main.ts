import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { FIRE } from './settings/CONST_REFS';

Vue.config.productionTip = false;

let app: any;

FIRE.auth().onAuthStateChanged((user) => {
  console.log(
    `This is the User -> ${JSON.stringify(
      user?.displayName ? user.displayName : user?.email
    )}`
  );
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App)
    }).$mount('#app');
  }
});
