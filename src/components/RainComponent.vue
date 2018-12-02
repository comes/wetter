<template>
  <div class="card">
    <div class="card-header">Regen</div>
    <div class="card-body">
      <dl>
        <dt>Jetzt</dt>
        <dd>{{ rain | double}}</dd>
        <dt>letzten 24h</dt>
        <dd>{{ rain24 | double}}</dd>
        <dt>diesen Monat</dt>
        <dd>{{ rainCurrent | double}}</dd>
        <dt>letzten Monat</dt>
        <dd>{{ rainLastMonth | double }}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name: "Rain",
  props: ["rain24", "rainCurrent", "rain", "rainLastMonth"],
  filters: {
    double: function(val) {
      let ret = (val * 1).toFixed(2).replace(".", ",");
      return `${ret} mm`;
    }
  }
};
</script>