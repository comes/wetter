require('./bootstrap');

import Vue from 'vue'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import App from './App.vue'

import Highcharts from 'highcharts';
// Alternatively, this is how to load Highstock. Highmaps and Highcharts Gantt are similar.
// import Highcharts from 'highcharts/highstock';

// Load the exporting module.
import WindbarbInit from 'highcharts/modules/windbarb';
// Initialize exporting module.
WindbarbInit(Highcharts);



Vue.config.productionTip = false
Vue.use(VueChartkick, {
  adapter: Chart
})

import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)

new Vue({
  render: h => h(App)
}).$mount('#app')