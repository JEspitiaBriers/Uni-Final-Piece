<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { firebaseFireStore } from '@/firebase/database'

import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net-bs5';
import 'datatables.net-select-bs5';

DataTable.use(DataTablesLib);

const saleItems = ref([])
onMounted(async () => {
	const querySnapshot = await getDocs(collection(firebaseFireStore, "SaleItems"));
	let SaleItems = [];
	querySnapshot.forEach((doc) => {
		const saleItem = {
			id: doc.id,
			Title: doc.data().Title,
			Categories: doc.data().Categories,
			Description: doc.data().Description,
			Tags: doc.data().Tags,
			Price: doc.data().Price,
			Dimensions: doc.data().Dimensions,
			Image: doc.data().Image
		}
		SaleItems.push(saleItem);
	})
	saleItems.value = SaleItems;
})


let data = saleItems
let columns = [
	{ data: 'Title' },
	{ data: 'Categories' },
	{
		data: 'Description', render: $.fn.dataTable.render.ellipsis(140, true)
	},
	{ data: 'Tags' },
	{ data: 'Price' },
	{ data: 'Dimensions' },
	{ data: 'Image' },
];
</script>

<template>
	<div class="onPage">
		<DataTable :data="data" :columns="columns" class="display">
			<thead>
				<tr>
					<th>Title</th>
					<th>Categories</th>
					<th>Description</th>
					<th>Tags</th>
					<th>Price</th>
					<th>Dimensions</th>
					<th>Image</th>
				</tr>
			</thead>
		</DataTable>
	</div>
</template>

<style>
@import 'datatables.net-dt';
</style>