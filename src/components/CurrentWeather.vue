<template>
    <div class="current">
      <div class="card">
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
      

      <div class="card">
          <div class="card-header">
              <i class="fas fa-thermometer-half"></i> Temperatur Verlauf
          </div>
          <div class="card-body">
              <line-chart :data="pastDayTemperatur"></line-chart>
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
      pastDayTemperatur: false
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

      axios.get("http://192.168.188.120/api/weather").then(({ data }) => {
        const weather_data = data.data;
        // console.log(
        //   _.map(weather_data, _.partial(_.pick, _, ["dateTime", "inTemp"]))
        // );
        data = [
          {
            name: "Workout",
            data: {
              "2017-01-01 00:00:00 -0800": 3,
              "2017-01-02 00:00:00 -0800": 4
            }
          },
          {
            name: "Call parents",
            data: {
              "2017-01-01 00:00:00 -0800": 5,
              "2017-01-02 00:00:00 -0800": 3
            }
          }
        ];
        let inTemp = {};
        let outTemp = {};

        _.each(weather_data, function(item) {
          let date = moment.unix(item.dateTime).toDate();
          inTemp[date] = (item.inTemp / 1).toFixed(1);
          outTemp[date] = (item.outTemp / 1).toFixed(1);
        });

        this.pastDayTemperatur = [
          { name: "innen", data: inTemp },
          { name: "aussen", data: outTemp }
        ];
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