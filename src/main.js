import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import apiService from './common/apiservice'

Vue.config.productionTip = false;

apiService.init();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
