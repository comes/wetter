<template>
    <div class="card">
        <div class="card-header">
            <i class="fas fa-thermometer-half"></i> {{ title }}
        </div>
        <div class="card-body">
          <dl>
            <dt>innen</dt>
            <dd>{{ inTemp | degree }}</dd>
            <dt>außen</dt>
            <dd>{{ outTemp | degree }}</dd>
          </dl>
        </div>
    </div>
</template>
<script>
export default {
  name: "Temperatur",
  props: ["inTemp", "outTemp", "title"],
  filters: {
    degree: function(val) {
      let ret = val.toFixed(1).replace(".", ",");
      return `${ret}°C`;
    }
  }
};
</script>