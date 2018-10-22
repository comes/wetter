<template>
    <div class="current">
      <div class="card my-4">
        <div class="card-body">
          <h5 class="card-title">Aktuelle Wetterdaten</h5>
          <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
          
          <div class="card-columns">
            <Temperatur :value="inTemp" title="innen" v-if="inTemp"></temperatur>
            <Temperatur :value="outTemp" title="aussen" v-if="outTemp"></temperatur>
            <humidity :value="inHumidity" title="Luftfeuchtigkeit innen" v-if="inHumidity"></humidity>
            <humidity :value="outHumidity" title="Luftfeuchtigkeit außen" v-if="outHumidity"></humidity>
            <barometer :value="barometer" title="Luftdruck" v-if="barometer"></barometer>
            <wind-direction :value="windDir" title="Windrichtung" v-if="windDir"></wind-direction>
            <wind-speed :value="windSpeed" title="Windgeschwindigkeit" v-if="windSpeed"></wind-speed>
          </div>

        </div>
      </div>
    
      <div class="card my-4">
        <div class="card-header">
            <i class="fas fa-thermometer-half"></i> Temperatur &mdash; Verlauf 7-Tage
        </div>
        <div class="card-body">
            <line-chart xtitle="Time"
            :legend="false"
            ytitle="Temperatur"
            decimal=","
            suffix="°C"
            :data="pastDayTemperatur"></line-chart>
        </div>
      </div>

      <pressure-graph class="my-4" :min="barometerMin" :max="barometerMax" :value="pastDayBarometer"></pressure-graph>

      <highcharts :options="chartOptions"></highcharts>

      <wind-graph :value="rawData"></wind-graph>

      <div class="card my-4">
        <div class="card-header">
            <i class="fas fa-cloud"></i> Regen pro Stunde &mdash; Verlauf 7-Tage
        </div>
        <div class="card-body">
            <line-chart xtitle="Time"
            :legend="false"
            ytitle="l/h"
            decimal=","
            suffix=""
            :data="rainData"></line-chart>
        </div>
      </div>
    </div>
</template>
<script>
import Temperatur from "./TemperatureComponent.vue";
import Humidity from "./HumidityComponent.vue";
import Barometer from "./BarometerComponent.vue";
import WindDirection from "./WindDirComponent.vue";
import WindSpeed from "./WindSpeedComponent.vue";
import PressureGraph from "./PressureGraphComponent.vue";
import WindGraph from "./WindComponent.vue";
import * as moment from "moment";
import * as _ from "lodash";

export default {
  name: "CurrentWeather",
  props: ["endpoint"],
  components: {
    Temperatur,
    Humidity,
    Barometer,
    WindDirection,
    WindSpeed,
    PressureGraph,
    WindGraph
  },
  data() {
    return {
      inTemp: false,
      outTemp: false,
      barometer: false,
      inHumidity: false,
      outHumidity: false,
      windDir: false,
      windSpeed: false,
      pastDayTemperatur: false,
      pastDayBarometer: false,
      barometerMin: false,
      barometerMax: false,
      rainData: false,
      rawData: [],
      chartOptions: {
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            millisecond: "%H:%M:%S.%L",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%e. %b",
            week: "%e. %b",
            month: "%b '%y",
            year: "%Y"
          },
          title: {
            text: "Date"
          }
        },
        series: [
          {
            data: [1, 2, 3] // sample data
          }
        ]
      }
    };
  },
  methods: {
    fetchData: function() {
      axios.get(this.endpoint).then(({ data }) => {
        this.inTemp = data.inTemp;
        this.outTemp = data.outTemp;
        this.inHumidity = data.inHumidity;
        this.outHumidity = data.outHumidity;
        this.barometer = data.barometer;
        this.windDir = data.windDir;
        this.windSpeed = data.windSpeed;
      });

      axios.get("https://api.jeremiaswolff.de/api/weather").then(({ data }) => {
        const weather_data = data.data;

        let outTemp = {};
        let barometerData = {};
        let rainData = {};

        let barometerMin = 9999;
        let barometerMax = 0;

        let highchartData = [];
        _.each(weather_data, function(item) {
          let date = moment.unix(item.dateTime).toDate();
          let microtime = moment.unix(item.dateTime).valueOf();

          outTemp[date] = (item.outTemp / 1).toFixed(1);
          rainData[date] = (item.rainRate / 1).toFixed(1);

          let barometer = (item.barometer / 1).toFixed(1);
          highchartData.push([microtime, parseFloat(barometer)]);
          barometerData[date] = barometer;

          if (barometerMin > barometer) {
            barometerMin = barometer;
          }

          if (barometerMax < barometer) {
            barometerMax = barometer;
          }
        });

        this.chartOptions.series[0].data = highchartData;

        this.pastDayTemperatur = [{ name: "aussen", data: outTemp }];
        this.rainData = [{ name: "regen", data: rainData }];
        this.pastDayBarometer = [
          { name: "abs Luftdruck (hPa)", data: barometerData }
        ];

        this.barometerMax = Math.ceil(barometerMax) + 2;
        this.barometerMin = Math.floor(barometerMin) - 2;

        this.rawData = data.data;
      });
    }
  },
  created() {
    //
  },
  mounted() {
    this.fetchData();
  }
};
</script>
