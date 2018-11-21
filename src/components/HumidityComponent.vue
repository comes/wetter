<template>
    <div class="card">
        <div class="card-header">
            {{ title }}
        </div>
        <div class="card-body">
            <dl>
            <dt>innen</dt>
            <dd>{{ inHumidity | percentage }}</dd>
            <dt>außen</dt>
            <dd>{{ outHumidity | percentage }}</dd>
          </dl>
        </div>
    </div>
</template>
<script>
export default {
  name: "Humidity",
  props: ["inHumidity", "outHumidity", "title"],
  filters: {
    percentage: function(val) {
      let ret = (val * 100).toFixed(0).replace(".", ",");
      return `${ret}%`;
    }
  }
};
</script>