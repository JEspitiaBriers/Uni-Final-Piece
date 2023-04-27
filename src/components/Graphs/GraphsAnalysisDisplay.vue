<script setup>
import { ref, watch } from "vue";
import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";
import PieChart from "./PieChart.vue";
import ScatterChart from "./ScatterChart.vue";

let chartTypes = ["line", "bar", "pie", "scatter"]; // ["line", "area", "bar", "radar", "histogram", "pie", "donut", "radialBar", "scatter", "bubble", "heatmap", "candlestick"]; 
// let LType = reactive(chartTypes[Math.floor(Math.random()*chartTypes.length)]);
// let RType = reactive(chartTypes[Math.floor(Math.random()*chartTypes.length)]);

// LEFT CHART FUNCTIONS AND VAIRABLES
let LType = ref("line");
let LXaxis = ref("Product");
let LXaxis2 = ref("Price");
let LYaxis = ref("Something");

function updateLChart(e) {
	let temp = ""
	if (e.target.id === "chartsL") {
		temp = e.target.value
	}
	else {
		temp = LType.value
	}
	LType.value = '';
	setTimeout(function (temp) {
		LType.value = temp
	}, 0, temp);
}


// RIGHT CHART FUNCTIONS AND VARIABLES
let RType = ref("line");
let RXaxis = ref("Product");
let RXaxis2 = ref("Price");
let RYaxis = ref("Something");

function updateRChart(e) {
	let temp = ""
	if (e.target.id === "chartsR") {
		temp = e.target.value
	}
	else {
		temp = RType.value
	}
	setTimeout(function (temp) {
		RType.value = temp
	}, 0, temp);
}
</script>

<template>
	<div class="container">
		<!-- Left Graph and Options -->
		<div class="row">
			<div class="col left">
				<div v-if="LType === 'line'">
					<LineChart :Xaxis="LXaxis" :Xaxis2="LXaxis2" :Yaxis="LYaxis" />
				</div>
				<div v-else-if="LType === 'bar'">
					<BarChart :Xaxis="LXaxis" :Xaxis2="LXaxis2" :Yaxis="LYaxis" />
				</div>
				<div v-else-if="LType === 'pie'">
					<PieChart :Xaxis="LXaxis" :Xaxis2="RXaxis2" :Yaxis="LYaxis" />
				</div>
				<div v-else-if="LType === 'scatter'">
					<ScatterChart :Xaxis="LXaxis" :Xaxis2="RXaxis2" :Yaxis="LYaxis" />
				</div>
			</div>

			<div class="row">
				<div class="col left-options">
					<label>Primary X-axis Data:</label>
					<select class="form-select mb-3" size="4" id="LXaxis" v-model="LXaxis" @change="updateLChart($event)">
						<option value="LEDV" selected>L Ventricle at End Diastole</option>
						<option value="LESV">L Ventricle at End Systole</option>
						<option value="LSV">L Stroke Volume</option>
						<option value="LVEF">L Ventricle Ejection Fraction</option>
						<option value="LVMASS">Left ventricle Mass</option>

						<option value="REDV">R Ventricle at End Diastole</option>
						<option value="RESV">R Ventricle at End Systole</option>
						<option value="RSV">R Stroke Volume</option>
						<option value="RVEF">R Ventricle Ejection Fraction</option>
						<option value="LVMASS">RVMASS DATA MISSING</option>

						<option value="SCAR">Scarring</option>
						<option value="GENDER-0">Male</option>
						<option value="GENDER-1">Female</option>
						<option value="AGEATMRI">Ageat MRI</option>
						<option value="APICLHCM">Apical HCM</option>
						<option value="SUDDENCARDIACDEATH">Sudden Cardiac Death</option>
						<option value="DIABETES">Diabetes</option>
						<option value="MYECTOMY">Myectomy</option>
						<option value="HYPERTENSION">Hypertension</option>

						<option value="MYH7">Myosin heavy chain-7 (MYH7)</option>
						<!-- provides instructions for making a protein known as the beta (β)-myosin heavy chain -->
						<option value="MYBPC3MUTATION">Myosin-binding protein C3 (MYBPC3) Mutation</option>
						<!-- encodes the cardiac isoform of myosin-binding protein C -->
						<option value="TNNT2MUTATION">Troponin T2 (TNNT2) Mutation</option>
						<!-- provides instructions for making a protein called cardiac troponin T -->
						<option value="ACTCMUTATION">Actin Alpha Cardiac Muscle 1 (ACTC) Mutation</option>
						<!-- Protein coding gene -->
						<option value="TPM1">Tropomyosin 1 (TPM1)</option> <!-- Protein coding gene -->
						<option value="TNNC1">Troponin C1 (TNNC1)</option> <!-- Protein coding gene -->
						<option value="TNNI3">Troponin I3 (TNNI3)</option>
						<!-- provides instructions for making a protein called cardiac tropnin 1 -->
						<option value="MYL2">Myosin light chain-3</option>
						<!-- encodes a major sarcomeric protein in mammalian striated muscle -->
						<option value="TTN">Titin</option> <!-- provides instructions for making a very large protein called titin -->
					</select>

					<label for="Charts">Chart Type:</label>
					<select id="chartsL" name="chartsL" class="form-select mb-3" @change="updateLChart($event)">
						<option value="line" selected>Line</option>
						<option value="bar">Bar</option>
						<option value="pie">Pie</option>
						<option value="scatter">Scatter</option>
					</select>
				</div>
				<div class="col right-options">
					<label>Y-axis Data:</label>
					<select class="form-select mb-3" id="LYaxis" v-model="LYaxis" @change="updateLChart($event)">
						<option value="Something" selected>Something</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>

					<label>Secondary X-axis (optional):</label>
					<select class="form-select mb-3" v-model="LXaxis2" @change="updateLChart($event)">
						<option value="1" selected>One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col right">
				<div v-if="RType === 'line'">
					<LineChart :Xaxis="RXaxis" :Xaxis2="RXaxis2" :Yaxis="RYaxis" />
				</div>
				<div v-else-if="RType === 'bar'">
					<BarChart :Xaxis="LXaxis" :Xaxis2="RXaxis2" :Yaxis="LYaxis" />
				</div>
				<div v-else-if="RType === 'pie'">
					<PieChart :Xaxis="LXaxis" :Xaxis2="RXaxis2" :Yaxis="LYaxis" />
				</div>
				<div v-else-if="RType === 'scatter'">
					<ScatterChart :Xaxis="LXaxis" :Xaxis2="RXaxis2" :Yaxis="LYaxis" />
				</div>
			</div>

			<div class="row">
				<div class="col left-options">
					<label>Primary X-axis Data:</label>
					<select class="form-select mb-3" id="RXaxis" v-model="RXaxis" @change="updateRChart($event)">
						<option value="Product" selected>Product</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>

					<label for="Charts">Chart Type:</label>
					<select id="chartsR" name="chartsR" class="form-select mb-3" @change="updateRChart($event)">
						<option value="line" selected>Line</option>
						<option value="bar">Bar</option>
						<option value="pie">Pie</option>
						<option value="scatter">Scatter</option>
					</select>
				</div>
				<div class="col right-options">
					<label>Y-axis Data:</label>
					<select class="form-select mb-3" id="RYaxis" v-model="RYaxis" @change="updateRChart($event)">
						<option value="Something" selected>Something</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>

					<label>Secondary X-axis (optional)</label>
					<select class="form-select mb-3" v-model="RXaxis2" @change="updateRChart($event)">
						<option value="1" selected>One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.container {
	padding-top: 60px;
	padding-left: 180px;
}

/* Chart layout */
.left {
	padding-right: 50px;
}

.col {
	padding-top: 20px;
}

/* Chart options */
.form-select {
	width: 180px;
}

.left-options {
	margin-left: 40px;
}</style>