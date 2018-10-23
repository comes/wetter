require('./bootstrap');

import Vue from 'vue'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import App from './App.vue'

import Highcharts from 'highcharts';
// Alternatively, this is how to load Highstock. Highmaps and Highcharts Gantt are similar.
import stockInit from 'highcharts/modules/stock'

// Load the exporting module.
import WindbarbInit from 'highcharts/modules/windbarb';
// Initialize exporting module.
WindbarbInit(Highcharts);
stockInit(Highcharts);

Vue.config.productionTip = false
Vue.use(VueChartkick, {
  adapter: Chart
})

import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)

new Vue({
  render: h => h(App)
}).$mount('#app')