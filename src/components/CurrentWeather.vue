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
            <i class="fas fa-thermometer-half"></i> Temperatur Verlauf 7-Tage
        </div>
        <div class="card-body">
            <line-chart :data="pastDayTemperatur"></line-chart>
        </div>
      </div>

      <div class="card my-4">
        <div class="card-header">
            <i class="fas fa-thermometer-half"></i> Luftdruck Verlauf 7-Tage
        </div>
        <div class="card-body">
            <area-chart :data="pastDayBarometer" :min="barometerMin" :max="barometerMax"></area-chart>
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
    WindSpeed
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
      barometerMax: false
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

        let barometerMin = 9999;
        let barometerMax = 0;
        _.each(weather_data, function(item) {
          let date = moment.unix(item.dateTime).toDate();
          outTemp[date] = (item.outTemp / 1).toFixed(1);

          let barometer = (item.barometer / 1).toFixed(1);

          barometerData[date] = barometer;

          if (barometerMin > barometer) {
            barometerMin = barometer;
          }

          if (barometerMax < barometer) {
            barometerMax = barometer;
          }
        });

        this.pastDayTemperatur = [{ name: "aussen", data: outTemp }];

        this.pastDayBarometer = [
          { name: "abs Luftdruck (hPa)", data: barometerData }
        ];

        this.barometerMax = Math.ceil(barometerMax) + 2;
        this.barometerMin = Math.floor(barometerMin) - 2;
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