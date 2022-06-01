import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import vueAxios from 'vue-axios'
import Vue2Editor from "vue2-editor";


Vue.use(Vue2Editor);
Vue.use(vueAxios, axios)
Vue.config.productionTip = false;

let app;

    if (! app) {
        new Vue({
            router,
            store,
            render: (h) => h(App)
        }).$mount("#app");
    }

