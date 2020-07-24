import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

require('./components/');//Importa todos os componentes globais.

Vue.config.productionTip = false
Vue.use(VueSweetalert2);

// Vue.component('layout-base', () => import('./components/shared/LayoutBaseDashboard.vue'));

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
