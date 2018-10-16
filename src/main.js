require('./bootstrap');

import Vue from 'vue'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

import App from './App.vue'
Vue.config.productionTip = false
Vue.use(VueChartkick, {
  adapter: Chart
})

new Vue({
  render: h => h(App)
}).$mount('#app')