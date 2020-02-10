import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faCircleNotch,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch, faCircleNotch, faAngleDown);

Vue.component("FontAwesomeIcon", FontAwesomeIcon);

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
