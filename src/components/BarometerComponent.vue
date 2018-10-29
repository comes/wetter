<template>
    <div class="card">
        <div class="card-header">
            <i class="fas fa-thermometer-half"></i> {{ title }}
        </div>
        <div class="card-body">
            <p>{{ v }}hpa</p>
        </div>
    </div>
</template>
<script>
export default {
  name: "Humidity",
  props: ["value", "title"],
  computed: {
    v: function() {
      let val = (this.value / 1).toFixed(1).replace(".", ",");
      return val;
    }
  }
};
</script>