<template>
    <div class="card">
        <div class="card-header" v-if="title">
            <i class="fas fa-tachometer-alt"></i> {{ title }}
        </div>
        <div class="card-body">
            {{ speed }} m/s
        </div>
    </div>
</template>
<script>
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
  computed: {
    speed: function() {
      let val = (this.value / 1).toFixed(1).replace(".", ",");
      return val;
    }
  }
};
</script>