<template>
    <div class="card">
        <div class="card-header">
            <i class="fas fa-thermometer-half"></i> {{ title }}
        </div>
        <div class="card-body">
            <p>{{ degree }}&deg;C</p>
            <apex-charts type="radialBar" :options="chartOptions" :series="[50 + value]"></apex-charts>

        </div>
    </div>
</template>
<script>
import ApexCharts from "vue-apexcharts";
export default {
  name: "Temperatur",
  props: ["value", "title"],
  components: {
    ApexCharts
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -20,
                show: true,
                color: "#888",
                fontSize: "17px"
              },
              value: {
                formatter: function(val) {
                  return ((val - 50) / 1).toFixed(1).replace(".", ",") + "°C";
                },
                color: "#111",
                fontSize: "36px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "round",
            shadeIntensity: 0.5,
            gradientToColors: ["#FF0000"],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        series: [75],
        stroke: {
          lineCap: "round"
        },
        labels: ["Percent"]
      }
    };
  },
  computed: {
    degree: function() {
      let val = (this.value / 1).toFixed(1).replace(".", ",");
      return val;
    }
  }
};
</script>