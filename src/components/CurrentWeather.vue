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

      <range-chart :value="tempChartData" title="Außen Temperatur"></range-chart>

      <range-chart :value="barometerChartData" title="Luftdruck (hPa)"></range-chart>
      <range-chart type="bar" :value="rainChartData" title="Regen (mm/h)"></range-chart>
      
    </div>
</template>
<script>
import RangeChart from "./RangeChart.vue";
import Temperatur from "./TemperatureComponent.vue";
import Humidity from "./HumidityComponent.vue";
import Barometer from "./BarometerComponent.vue";
import WindDirection from "./WindDirComponent.vue";
import WindSpeed from "./WindSpeedComponent.vue";
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
    RangeChart
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
      rainData: false,
      tempChartData: [],
      barometerChartData: [],
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
          _.each(weather_data, function(item) {
            let m = moment.unix(item.dateTime);
            let date = m.toDate();
            let microtime = m.valueOf();

            barometerChartData.push([
              microtime,
              parseFloat((item.barometer / 1).toFixed(1))
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
        _.each(weather_data, function(item) {
          let m = moment.unix(item.dateTime);
          let date = m.toDate();
          let microtime = m.valueOf();
          let barometer = parseFloat((item.barometer / 1).toFixed(1));

          rainChartData.push([
            microtime,
            parseFloat((item.rainRate / 1).toFixed(1))
          ]);
          tempChartData.push([
            microtime,
            parseFloat((item.outTemp / 1).toFixed(1))
          ]);

          barometerChartData.push([
            microtime,
            parseFloat((item.barometer / 1).toFixed(1))
          ]);

          if (barometerMin > barometer) {
            barometerMin = barometer;
          }

          if (barometerMax < barometer) {
            barometerMax = barometer;
          }
        });

        this.pastDayTemperatur = [{ name: "aussen", data: outTemp }];
        this.rainData = [{ name: "regen", data: rainData }];
        this.pastDayBarometer = [
          { name: "abs Luftdruck (hPa)", data: barometerData }
        ];

        this.series[0].data = highchartData;
        this.barometerMax = Math.ceil(barometerMax) + 2;
        this.barometerMin = Math.floor(barometerMin) - 2;

        this.rawData = weather_data;
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
