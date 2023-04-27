<script setup>
import { ref } from "vue";
import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";
import PieChart from "./PieChart.vue";
import ScatterChart from "./ScatterChart.vue";

let chartTypes = ["line", "bar", "pie", "scatter"]; // ["line", "area", "bar", "radar", "histogram", "pie", "donut", "radialBar", "scatter", "bubble", "heatmap", "candlestick"]; 
let randX = ["Product", "Something"];
let randY = ["Product", "Something"];
// TOP LEFT CHART VAIRABLES
let TLType = ref(chartTypes[Math.floor(Math.random() * chartTypes.length)]);
let TLXaxis = ref(randX[Math.floor(Math.random() * randX.length)]);
let TLYaxis = ref(randY[Math.floor(Math.random() * randY.length)]);

// BOTTOM LEFT CHART VAIRABLES
let BLType = ref(chartTypes[Math.floor(Math.random() * chartTypes.length)]);
let BLXaxis = ref(randX[Math.floor(Math.random() * randX.length)]);
let BLYaxis = ref(randY[Math.floor(Math.random() * randY.length)]);

// TOP RIGHT CHART VAIRABLES
let TRType = ref(chartTypes[Math.floor(Math.random() * chartTypes.length)]);
let TRXaxis = ref(randX[Math.floor(Math.random() * randX.length)]);
let TRYaxis = ref(randY[Math.floor(Math.random() * randY.length)]);

// BOTTOM RIGHT VAIRABLES
let BRType = ref(chartTypes[Math.floor(Math.random() * chartTypes.length)]);
let BRXaxis = ref(randX[Math.floor(Math.random() * randX.length)]);
let BRYaxis = ref(randY[Math.floor(Math.random() * randY.length)]);

function updateCharts() {
  setTimeout(function updateCharts() { //, TLXaxis, TLYaxis, BLType, BLXaxis, BLYaxis, TRType, TRXaxis, TRYaxis, BRType, BRXaxis, BRYaxis
    TLType.value = chartTypes[Math.floor(Math.random() * chartTypes.length)];
    TLXaxis.value = randX[Math.floor(Math.random() * randX.length)];
    TLYaxis.value = randY[Math.floor(Math.random() * randY.length)];

    BLType.value = chartTypes[Math.floor(Math.random() * chartTypes.length)];
    BLXaxis.value = randX[Math.floor(Math.random() * randX.length)];
    BLYaxis.value = randY[Math.floor(Math.random() * randY.length)];

    TRType.value = chartTypes[Math.floor(Math.random() * chartTypes.length)];
    TRXaxis.value = randX[Math.floor(Math.random() * randX.length)];
    TRYaxis.value = randY[Math.floor(Math.random() * randY.length)];

    BRType.value = chartTypes[Math.floor(Math.random() * chartTypes.length)];
    BRXaxis.value = randX[Math.floor(Math.random() * randX.length)];
    BRYaxis.value = randY[Math.floor(Math.random() * randY.length)];
  }, 0);
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div v-if="TLType == 'line'">
          <LineChart :Xaxis="TLXaxis" :Yaxis="TLYaxis" />
        </div>
        <div v-if="TLType == 'bar'">
          <BarChart :Xaxis="TLXaxis" :Yaxis="TLYaxis" />
        </div>
        <div v-if="TLType == 'pie'">
          <PieChart :Xaxis="TLXaxis" :Yaxis="TLYaxis" />
        </div>
        <div v-if="TLType == 'scatter'">
          <ScatterChart :Xaxis="TLXaxis" :Yaxis="TLYaxis" />
        </div>

        <div v-if="BLType == 'line'">
          <LineChart :Xaxis="BLXaxis" :Yaxis="BLYaxis" />
        </div>
        <div v-if="BLType == 'bar'">
          <BarChart :Xaxis="BLXaxis" :Yaxis="BLYaxis" />
        </div>
        <div v-if="BLType == 'pie'">
          <PieChart :Xaxis="BLXaxis" :Yaxis="BLYaxis" />
        </div>
        <div v-if="BLType == 'scatter'">
          <ScatterChart :Xaxis="BLXaxis" :Yaxis="BLYaxis" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div v-if="TRType == 'line'">
          <LineChart :Xaxis="TRXaxis" :Yaxis="TRYaxis" />
        </div>
        <div v-if="TRType == 'bar'">
          <BarChart :Xaxis="TRXaxis" :Yaxis="TRYaxis" />
        </div>
        <div v-if="TRType == 'pie'">
          <PieChart :Xaxis="TRXaxis" :Yaxis="TRYaxis" />
        </div>
        <div v-if="TRType == 'scatter'">
          <ScatterChart :Xaxis="TRXaxis" :Yaxis="TRYaxis" />
        </div>

        <div v-if="BRType == 'line'">
          <LineChart :Xaxis="BRXaxis" :Yaxis="BRYaxis" />
        </div>
        <div v-if="BRType == 'bar'">
          <BarChart :Xaxis="BRXaxis" :Yaxis="BRYaxis" />
        </div>
        <div v-if="BRType == 'pie'">
          <PieChart :Xaxis="BRXaxis" :Yaxis="BRYaxis" />
        </div>
        <div v-if="BRType == 'scatter'">
          <ScatterChart :Xaxis="BRXaxis" :Yaxis="BRYaxis" />
        </div>
      </div>
    </div>
    <div>
      <button @click="updateCharts()" class="btn btn-outline-primary btn-lg" style="margin-top: 15px;">Randomise
        Charts</button>
    </div>
  </div>
</template>

<style>
.center {
  padding-left: 180px
}

.container {
  padding-left: 180px;
  /* padding-top: 10px; */
}

/* .left {
  padding-right: 50px;
} */
</style>