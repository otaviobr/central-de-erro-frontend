import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
require('./components/');//Importa todos os componentes globais.
Vue.config.productionTip = false

// Vue.component('layout-base', () => import('./components/shared/LayoutBaseDashboard.vue'));

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
