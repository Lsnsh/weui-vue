import Vue from 'vue';
import WeUIVue from 'main/index.js';
import App from './App.vue';

import 'packages/theme-chalk/src/index.less';

Vue.use(WeUIVue);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
