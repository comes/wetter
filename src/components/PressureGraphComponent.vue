<template>
    <div class="card">
        <div class="card-header">
            <i class="fas fa-thermometer-half"></i> Luftdruck &mdash; Verlauf 7-Tage
        </div>
        <div class="card-body">
            <area-chart xtitle="Time" ytitle="Druck"
            height="400px"
            :legend="false" 
            decimal=","
            suffix=" hPa"
            :data="value"
            :min="min"
            :max="max"></area-chart>


            
        </div>
      </div>  
</template>
<script>
export default {
  name: "Humidity",
  props: ["min", "max", "value"]
};
</script>