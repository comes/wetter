<template>
  <div class="card my-4">
    <div class="card-body">
      <h5 class="card-title" v-text="title"></h5>
      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary"
        @click="setRange('1d')">1D</button>
        <button type="button" class="btn btn-secondary"
        @click="setRange('1w')">1W</button>
        <button type="button" class="btn btn-secondary" @click="setRange('1m')">1M</button>
        <button type="button" class="btn btn-secondary" @click="setRange('6m')">6M</button>
        <button type="button" class="btn btn-secondary" @click="setRange('1y')">1Y</button>
        <button type="button" class="btn btn-secondary" @click="setRange('all')">all</button>
      </div>
      <apex-charts :type="type" height="300px" :options="chartOptions" :series="series"></apex-charts>
    </div>
  </div>
    
</template>
<script>
import ApexCharts from "vue-apexcharts";
import * as moment from "moment";
export default {
  name: "BarometerWindChart",
  props: {
    barometer: {},
    wind: {},
    title: {},
    type: {
      default: "area"
    }
  },
  components: {
    ApexCharts
  },
  data() {
    return {
      chartOptions: {
        // https://apexcharts.com/docs/options/yaxis/
        chart: {
          toolbar: { show: true },
          animations: {
            enabled: false,
            initialAnimation: {
              enabled: false
            }
          }
        },
        tooltip: {
          x: {
            format: "dd.MM.yyyy HH:mm"
          }
        },
        dataLabels: {
          enabled: false
        },
        sparkline: {
          enabled: true
        },
        // colors: ["#546E7A", "#ff0000"],
        fill: {
          opacity: [0.25],
          gradient: {
            inverseColors: true
          }
        },
        xaxis: {
          type: "datetime",
          min: moment()
            .subtract(1, "week")
            .valueOf(),
          max: moment().valueOf()
        },
        stroke: {
          width: [0, 4],
          curve: "smooth"
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            title: {
              text: "Barometer (hPa)"
            }
          },
          {
            opposite: true,
            title: {
              text: "Wind (m/s)"
            }
          }
        ]
      }
    };
  },
  computed: {
    series: function() {
      return [
        {
          name: this.title,
          data: this.barometer,
          type: "area"
        },
        {
          name: "Wind",
          data: this.wind,
          type: "line"
        }
      ];
    }
  },
  methods: {
    setRange: function(range) {
      switch (range) {
        case "all":
          this.chartOptions = {
            xaxis: {
              min: undefined,
              max: undefined
            }
          };
          break;
        case "1y":
          this.chartOptions = {
            xaxis: {
              min: moment()
                .subtract(1, "year")
                .valueOf(),
              max: moment().valueOf()
            }
          };

          break;
        case "6m":
          this.chartOptions = {
            xaxis: {
              min: moment()
                .subtract(6, "month")
                .valueOf(),
              max: moment().valueOf()
            }
          };

          break;
        case "1m":
          this.chartOptions = {
            xaxis: {
              min: moment()
                .subtract(1, "month")
                .valueOf(),
              max: moment().valueOf()
            }
          };

          break;
        case "1w":
          this.chartOptions = {
            xaxis: {
              min: moment()
                .subtract(1, "week")
                .valueOf(),
              max: moment().valueOf()
            }
          };

          break;
        case "1d":
          this.chartOptions = {
            xaxis: {
              min: moment()
                .subtract(1, "day")
                .valueOf(),
              max: moment().valueOf()
            }
          };

          break;

        default:
          break;
      }
    }
  }
};
</script>