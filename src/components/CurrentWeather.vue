<template>
    <div class="current">
      <div class="card-deck">
            <Temperatur :inTemp="inTemp" :outTemp="outTemp" title="Temp" v-if="inTemp"></temperatur>
            <humidity :inHumidity="inHumidity" :outHumidity="outHumidity" title="Luftfeuchtigkeit" v-if="inHumidity"></humidity>
            <barometer :value="barometer" title="Luftdruck" v-if="barometer"></barometer>
            <wind-direction :direction="windDir" :speed="windSpeed" title="Windrichtung" v-if="windDir"></wind-direction>
      </div>

      <range-chart :value="tempChartData" title="Außen Temperatur"></range-chart>
      <barometer-wind-chart :barometer="barometerChartData" :wind="windChartData"></barometer-wind-chart>
      <range-chart :value="barometerChartData" title="Luftdruck (hPa)"></range-chart>
      <range-chart :value="rainChartData" title="Regen (mm/h)"></range-chart>
      
    </div>
</template>
<script>
import RangeChart from "./RangeChart.vue";
import Temperatur from "./TemperatureComponent.vue";
import Humidity from "./HumidityComponent.vue";
import Barometer from "./BarometerComponent.vue";
import WindDirection from "./WindDirComponent.vue";
import WindSpeed from "./WindSpeedComponent.vue";
import BarometerWindChart from "./BarometerWindChart.vue";
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
    RangeChart,
    BarometerWindChart
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
      tempChartData: [],
      barometerChartData: [],
      windChartData: [],
      rainChartData: []
    };
  },
  methods: {
    getDataPerPage: function(url) {
      if (url) {
        axios.get(url).then(({ data }) => {
          const weather_data = data.data;
          let tempChartData = this.tempChartData;
          let barometerChartData = this.barometerChartData;
          let rainChartData = this.rainChartData;
          let windChartData = this.windChartData;
          _.each(weather_data, function(item) {
            let m = moment.unix(item.dateTime);
            let date = m.toDate();
            let microtime = m.valueOf();

            barometerChartData.push([
              microtime,
              parseFloat((item.barometer / 1).toFixed(1))
            ]);

            windChartData.push([
              microtime,
              parseFloat(item.windSpeed / 1).toFixed(2)
            ]);

            rainChartData.push([
              microtime,
              parseFloat((item.rainRate / 1).toFixed(1))
            ]);

            tempChartData.push([
              microtime,
              parseFloat((item.outTemp / 1).toFixed(1))
            ]);
          });

          this.getDataPerPage(data.next_page_url);
        });
      }
    },

    fetchData: function() {
      axios.get(this.endpoint).then(({ data }) => {
        this.inTemp = data.inTemp;
        this.outTemp = data.outTemp;
        this.windDir = data.windDir;
        this.windSpeed = data.windSpeed;
        this.barometer = data.barometer;
        this.inHumidity = data.inHumidity;
        this.outHumidity = data.outHumidity;
      });

      axios.get("https://api.jeremiaswolff.de/api/weather").then(({ data }) => {
        this.getDataPerPage(data.next_page_url);
        const weather_data = data.data;

        let tempChartData = this.tempChartData;
        let barometerChartData = this.barometerChartData;
        let rainChartData = this.rainChartData;
        let windChartData = this.windChartData;

        _.each(weather_data, function(item) {
          let m = moment.unix(item.dateTime);
          let microtime = m.valueOf();

          let barometer = parseFloat((item.barometer / 1).toFixed(1));

          rainChartData.push([
            microtime,
            parseFloat((item.rainRate / 1).toFixed(1))
          ]);

          windChartData.push([
            microtime,
            parseFloat(item.windSpeed).toFixed(2)
          ]);

          tempChartData.push([
            microtime,
            parseFloat((item.outTemp / 1).toFixed(1))
          ]);

          barometerChartData.push([
            microtime,
            parseFloat((item.barometer / 1).toFixed(1))
          ]);
        });
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
