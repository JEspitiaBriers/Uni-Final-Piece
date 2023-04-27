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

const series = ref([23, 11, 54, 72, 12]);

const chartOptions = ref({
	chart: {
		type: 'pie',
		width: 500,
		height: 350,
	},
	title: {
		text: variables.Xaxis + ' by ' + variables.Yaxis,
		style: {
			fontSize: '12px'
		}
	},
	labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
  dataLabels: {
    enabled: true
  },
  responsive: [{
    breakpoint: 480,
    options: {
			chart: {
				type: 'pie',
				width: 500,
				height: 350
      },
      legend: {
        position: 'bottom',
        show: false
      }
    }
  }],
});

console.log("PieChart.vue\n\nChart Option: " + chartOptions.value + "\n\nSeries: " + series + 
"XAxis: " + variables.Xaxis + " YAxis: " + variables.Yaxis);
</script>

<template>
	<div>
		<apexchart 
			type="pie"
			height = "350"
			width="500" 
			:options="chartOptions"
			:series="series">
		</apexchart>
	</div>
</template>

<style>

</style>