import Vue from 'vue'
import App from './AppRouter.vue'
import router from './router';
import ElementUI from 'element-ui';
import './components/element-variables.scss'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
