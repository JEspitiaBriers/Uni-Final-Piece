<script setup>
import { ref } from "vue";

let variables = defineProps({
  Xaxis: {
    type: String
  },
  Xaxis2: {
    type: String
  },
  Yaxis: {
    type: String
  },
})

const chartOptions = ref({
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: variables.Xaxis + " by " + variables.Yaxis,
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
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

let series = ref([
  {
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
  {
    name: "Laptops",
    data: [20, 61, 75, 71, 69, 72, 89, 111, 168],
  },
]);

if (variables.Xaxis == "Product") {
  series = [
    {
      name: variables.Xaxis,
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    }
  ];
}
else {
  series = [
    {
      name: variables.Xaxis,
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    }
  ];
}


if (variables.Xaxis2 == "1") {
  series.push(
    {
      name: variables.Xaxis2,
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    }
  );
}
else if (variables.Xaxis2 == "2") {
  series.push(
    {
      name: variables.Xaxis2,
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    }
  );
}
else if (variables.Xaxis2 == "3") {
  series.push(
    {
      name: variables.Xaxis2,
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    }
  );
}

console.log("BarChart.vue\n\nChart Option: " + chartOptions.value + "\n\nSeries: " + series.value)

</script>

<template>
  <div>
    <apexchart type="line" height="350" width="500" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>