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

export default {
  name: "WindGraph",
  props: ["value"],
  computed: {
    options: function() {
      let wind = [];
      let lastTime = 0;
      _.each(this.value, function(item) {
        wind.push([
          parseFloat((item.windSpeed / 1).toFixed(1)),
          180 - item.windDir // 0 is south, but we need 0 is north
        ]);
        lastTime = moment.unix(item.dateTime).valueOf();
      });

      wind = wind.reverse();

      let chartOptions = {
        title: {
          text: "Highcharts Wind Barbs"
        },

        xAxis: {
          type: "datetime",
          offset: 40
        },

        plotOptions: {
          area: {
            pointStart: lastTime,
            pointInterval: 18e5
          },
          windbarb: {
            pointInterval: 18e5
          }
        },

        series: [
          {
            type: "windbarb",
            data: wind,
            name: "Wind",
            vectorLength: 16,
            lineWidth: 1,
            showInLegend: false,
            tooltip: {
              valueSuffix: " m/s"
            },
            dataGrouping: {
              enabled: true,
              groupPixelWidth: 24, // vector length plus some padding
              approximation: function(values, directions, c) {
                var vectorX = 0,
                  vectorY = 0,
                  i,
                  len = values.length;

                for (i = 0; i < len; i++) {
                  vectorX +=
                    values[i] * Math.cos(directions[i] * Highcharts.deg2rad);
                  vectorY +=
                    values[i] * Math.sin(directions[i] * Highcharts.deg2rad);
                }

                return [
                  Math.round(
                    (10 *
                      Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2))) /
                      len
                  ) / 10,
                  Math.atan2(vectorY, vectorX) / Highcharts.deg2rad
                ];
              },
              dateTimeLabelFormats: {
                millisecond: [
                  "%A, %b %e, %H:%M:%S.%L",
                  "%A, %b %e, %H:%M:%S.%L",
                  "-%H:%M:%S.%L"
                ],
                second: [
                  "%A, %b %e, %H:%M:%S",
                  "%A, %b %e, %H:%M:%S",
                  "-%H:%M:%S"
                ],
                minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                week: [
                  "Week from %A, %b %e, %Y",
                  "%A, %b %e",
                  "-%A, %b %e, %Y"
                ],
                month: ["%B %Y", "%B", "-%B %Y"],
                year: ["%Y", "%Y", "-%Y"]
              }
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