import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'popper.js'
import '@/assets/css/style.css'
Vue.config.productionTip = false
import Element from "element-ui";
import locale from "element-ui/lib/locale/lang/en";

Vue.use(Element, { locale });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
