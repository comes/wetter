<template>
    <div class="card">
        <div class="card-header" v-if="title">
            <i class="far fa-compass"></i> {{ title }}
        </div>
        <div class="card-body">
            <div class="">
                <i class="fas fa-long-arrow-alt-up fa-4x" :style="rotate"></i><br>
            </div>
            <strong>{{ direction | compass }}
            </strong>{{ direction | degree }}

        </div>
    </div>
</template>
<script>
export default {
  name: "WindSpeedDirection",
  props: {
    direction: {
      default: false
    },
    speed: {
      default: false
    },
    title: {
      default: false
    }
  },
  filters: {
    degree: value => {
      return `${value}°`;
    },
    compass: function(val) {
      let ret = Math.floor(val / 22.5 + 0.5);
      let arr = [
        "N",
        "NNO",
        "NO",
        "ONO",
        "O",
        "OSO",
        "SO",
        "SSO",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW"
      ];
      return arr[ret % 16];
    }
  },
  computed: {
    rotate: function() {
      return `transform: rotate(${this.direction}deg);`;
    }
  }
};
</script>