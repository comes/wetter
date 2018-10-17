<template>
  <div id="app">
    <current-weather endpoint="https://api.jeremiaswolff.de/api/weather/current"></current-weather>
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
