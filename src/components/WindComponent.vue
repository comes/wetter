<template>
    <div class="card">
        <div class="card-header">
            <i class="fas fa-thermometer-half"></i> WindChart
        </div>
        <div class="card-body">
            <highcharts :options="options"></highcharts>
        </div>
      </div>  
</template>
<script>
import * as moment from "moment";
import Highcharts from "highcharts";

export default {
  name: "WindGraph",
  props: ["value"],
  computed: {
    options: function() {
      let wind = [];
      let lastTime = 999999999;
      _.each(this.value, function(item) {
        let windspeed = parseFloat(item.windSpeed).toFixed(1);
        wind.push([
          parseFloat(parseFloat(windspeed)),
          180 - item.windDir // 0 is south, but we need 0 is north
        ]);
        lastTime = moment.unix(item.dateTime).valueOf();
      });

      wind = wind.reverse();

      let chartOptions = {
        chart: {
          zoomType: "x",
          marginLeft: 100,
          marginRight: 100
        },
        title: {
          text: "Highcharts Wind Barbs"
        },

        xAxis: {
          type: "datetime",
          offset: 40
        },

        plotOptions: {
          series: {
            pointStart: lastTime,
            pointInterval: 18e5
          },
          area: {
            pointStart: lastTime,
            pointInterval: 18e5
          },
          windbarb: {
            pointStart: lastTime,
            pointInterval: 18e5
          }
        },

        series: [
          {
            type: "windbarb",
            data: wind,
            name: "Wind",
            showInLegend: false,
            tooltip: {
              valueSuffix: " m/s"
            }
          },
          {
            type: "area",
            keys: ["y"], // rotation is not used here
            data: wind,
            name: "Wind speed",
            tooltip: {
              valueSuffix: " m/s"
            }
          }
        ]
      };

      return chartOptions;
    }
  },
  data() {
    return {};
  }
};
</script>