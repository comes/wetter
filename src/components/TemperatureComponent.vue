<template>
    <div class="current">
        <div class="card" style="width: 18rem;">
            <div class="card-header">
                <i class="fas fa-thermometer-half"></i> {{ title }}
            </div>
            <div class="card-body">
                <p>{{ degree }}&deg;C</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Temperatur",
  props: ["value", "title"],
  computed: {
    degree: function() {
      let val = (this.value / 1).toFixed(1).replace(".", ",");
      console.log([val, this.value]);
      return val;
    }
  }
};
</script>