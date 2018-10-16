<template>
    <div class="current">
      <div class="row">
        <div class="card-group">
          <Temperatur :value="inTemp" title="innen"></temperatur>
          <Temperatur :value="outTemp" title="aussen"></temperatur>
        </div>
      </div>
        
    </div>
</template>
<script>
import Temperatur from "./TemperatureComponent.vue";

export default {
  name: "CurrentWeather",
  props: ["endpoint"],
  components: {
    Temperatur
  },
  data() {
    return {
      inTemp: 0.0,
      outTemp: 0.0
    };
  },
  methods: {
    formatDegree(value) {
      let val = (value / 1).toFixed(1).replace(".", ",");
      return `${val} &deg;C`;
    },
    fetchData: function() {
      console.log(this);
      axios.get(this.endpoint).then(({ data }) => {
        this.inTemp = data.inTemp;
        this.outTemp = data.outTemp;
      });
    }
  },
  created() {
    console.log("Component Created");
  },
  mounted() {
    console.log("Component Mounted");
    this.fetchData();
  }
};
</script>