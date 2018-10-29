<template>
    <div class="card">
        <div class="card-header" v-if="title">
            <i class="far fa-compass"></i> {{ title }}
        </div>
        <div class="card-body">
            <div class="">
                <i class="fas fa-long-arrow-alt-up fa-4x" :style="rotate"></i><br>
            </div>
            <strong>{{ degToCompass }}</strong> ({{ value }}&deg;)

            <apex-charts height="300px" type="radialBar" :options="chartOptions" :series="[value]"></apex-charts>
        </div>
    </div>
</template>
<script>
import ApexCharts from "vue-apexcharts";

export default {
  name: "Humidity",
  props: {
    value: {
      default: false
    },
    title: {
      default: false
    }
  },
  components: {
    ApexCharts
  },
  data() {
    return {};
  },
  computed: {
    rotate: function() {
      return `transform: rotate(${this.value}deg);`;
    },
    degToCompass: function() {
      let val = Math.floor(this.value / 22.5 + 0.5);
      let arr = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW"
      ];
      return arr[val % 16];
    }
  }
};
</script>