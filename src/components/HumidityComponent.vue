<template>
    <div class="card">
        <div class="card-header">
            <i class="fas fa-thermometer-half"></i> {{ title }}
        </div>
        <div class="card-body">
            <p>{{ degree }}%</p>
        </div>
    </div>
</template>
<script>
export default {
  name: "Humidity",
  props: ["value", "title"],
  computed: {
    degree: function() {
      let val = (this.value * 100).toFixed(0).replace(".", ",");
      return val;
    }
  }
};
</script>