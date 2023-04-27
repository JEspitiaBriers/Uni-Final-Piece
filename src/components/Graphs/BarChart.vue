<script setup>
import { ref } from "vue";

let variables = defineProps({
  Xaxis: {
    type: String
  },
  Yaxis: {
    type: String
  },
})

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    width: 500,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
    }
  },
  title: {
    text: variables.Xaxis + " by " + variables.Yaxis,
    align: "left",
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    title: {
      text: variables.Xaxis,
    },
  },
  yaxis: {
    title: {
      text: variables.Yaxis,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
});

const series = ref([
  {
    name: "Some Bar 1",
    data: [400, 430, 448, 470, 540, 580, 690, 1070],
  },
  {
    name: "Some Bar 2",
    data: [450, 330, 600, 1070, 360, 760, 110, 130],
  },
]);

console.log("BarChart.vue\n\nChart Option: " + chartOptions.value + "\n\nSeries: " + series.value)

</script>

<template>
  <div>
    <apexchart type="bar" height="350" width="500" :options="chartOptions" :series="series">
    </apexchart>
  </div>
</template>