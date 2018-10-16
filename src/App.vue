<template>
  <div id="app">
    <current-weather endpoint="http://192.168.188.120/api/weather/current"></current-weather>
  </div>
</template>

<script>
import CurrentWeather from "./components/CurrentWeather.vue";

export default {
  name: "app",
  components: {
    CurrentWeather
  }
};
</script>

<style lang="scss">
</style>
