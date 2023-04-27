<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { firebaseFireStore } from '@/firebase/database'

import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net-bs5';
import 'datatables.net-select-bs5';

DataTable.use(DataTablesLib);

const userItems = ref([])
onMounted(async () => {
	const querySnapshot = await getDocs(collection(firebaseFireStore, "Users"));
	let fbUsers = [];
	querySnapshot.forEach((doc) => {
		const user = {
			id: doc.id,
			Firstname: doc.data().Firstname,
			Surname: doc.data().Surname,
			Email: doc.data().Email,
			DOB: doc.data().DOB,
			Created: Date(doc.data().Created)
		}
		fbUsers.push(user);
	})
	userItems.value = fbUsers;
})

let data = userItems
console.log(data)
let options = {
	columns: [
		{ data: 'id', width: 100 },
		{ data: 'Firstname', width: 150 },
		{ data: 'Surname', width: 175 },
		{ data: 'Email', width: 200 },
		{ data: 'DOB', width: 125 },
		{
			data: 'Created', render: function (data) {
				return data.substr(4, 30)
			},
		},
		{
			title: 'Functions',
			width: '160px',
			orderable: false,
			render: function (data, type, row) {
				return userButtons(row.id, row.Firstname, row.Surname, row.Email, row.DOB, row.Created)
			}
		}],
	lengthMenu: [
		[5, 10, 25, 50, -1],
		[5, 10, 25, 50, 'All'],
	],
	dom: ("<'row'<f><l>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"),
	language: {
		search: "_INPUT_",
		searchPlaceholder: "Search...",
		lengthMenu: "_MENU_Users per page"
	},
};

function userButtons(id, Firstname, Surname, Email, DOB, Created) {
	console.log("called buttons")
	var values =
		'<input type="hidden" id="userID' + id + '" value="' + id + '">'
		+ '<input type="hidden" id="userFirstname' + id + '" value="' + Firstname + '">'
		+ '<input type="hidden" id="userSurname' + id + '" value="' + Surname + '">'
		+ '<input type="hidden" id="userEmail' + id + '" value="' + Email + '">'
		+ '<input type="hidden" id="userDOB' + id + '" value="' + DOB + '">'
		+ '<input type="hidden" id="userCreated' + id + '" value="' + Created + '">';

	//make buttons to present modals
	var modals = values
		+ '<button onclick="userModals(' + "'" + id + "'" + ')" type="button" class="btn btn-primary" data-bs-toggle="modal"'
		+ 'data-bs-target="#updateModal" id="update' + id + '">Update</button>'
		+ '<button onclick="userModals(' + "'" + id + "'" + ')" type="button" class="btn btn-danger" data-bs-toggle="modal"'
		+ 'data-bs-target="#deleteModal" id="delete' + id + '">Delete</button>';
	return modals;
}


function userModals(id) {
	console.log("called modals")
	document.getElementsByClassName(".modal-id").attr('value', document.getElementById("userID" + id).value);
	document.getElementsByClassName(".modal-firstname").attr('value', document.getElementById("userFirstname" + id).value);
	document.getElementsByClassName(".modal-surname").attr('value', document.getElementById("userSurname" + id).value);
	document.getElementsByClassName(".modal-email").attr('value', document.getElementById("userEmail" + id).value);
	document.getElementsByClassName(".modal-DOB").attr('value', document.getElementById("userDOB" + id).value);
	document.getElementsByClassName(".modal-created").attr('value', document.getElementById("userCreated" + id).value);
}

</script>


<template>
	<!-- start of update modal -->
	<div class="modal" id="updateModal">
		<div class="modal-dialog">
			<div class="modal-content">

				<div class="modal-header">
					<h4 class="modal-title">Enter Updated Details</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>

				<div class="modal-body">
					<label><b>Update This User?</b></label>
					<form>
						<br>
						<label>ID: </label> <input disabled type='text' class="modal-id" />
						<br>
						<label>Firstname: </label> <input type="text" class="modal-firstname" />
						<br>
						<label>Surname: </label> <input type="text" class="modal-surname" />
						<br>
						<label>Email:</label> <input type="text" class="modal-email" />
						<br>
						<label>DoB: </label> <input type="text" class="modal-DOB" />
						<br>
						<label>Created: </label> <input disabled type="text" class="modal-created" />
						<br>
						<!-- Calls function in ajaxCRUD.js to handle update request -->
						<input type="button" onclick="updateUser('updateBox')" value="Update User">
					</form>
					<div id="updateBox"></div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
				</div>

			</div>
		</div>
	</div>

	<!-- Start of delete modal -->
	<div class="modal" id="deleteModal">
		<div class="modal-dialog">
			<div class="modal-content">

				<!-- Modal Header -->
				<div class="modal-header">
					<h4 class="modal-title">Delete Film</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>

				<!-- Modal body -->
				<div class="modal-body">
					<label><b>Delete This Film?</b></label>
					<form>
						<label>Title: </label> <input type="text" class="modal-title" readonly />
						<label>Year: </label> <input type="number" class="modal-year" readonly />
						<label>Director:</label> <input type="text" class="modal-director" readonly />
						<label>Stars: </label> <input type="text" class="modal-stars" readonly />
						<label>Reviews: </label> <input type="text" class="modal-review" readonly />
						<input type="hidden" id="id" class="modal-id" />
						<!-- calls function in ajaxCRUD.js to handle delete request -->
						<input type="button" onclick="deleteFilm('deleteBox')" value="Delete Film">
					</form>
					<div id="deleteBox"></div>
				</div>

				<!-- modal close button -->
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
				</div>

			</div>
		</div>
	</div>
	<!-- end of delete modal -->


	<div class="onPage dataTablePage">
		<DataTable :data="data" :options="options" class="display"> <!--  :columns="columns" -->
			<thead>
				<tr>
					<th>ID</th>
					<th>Firstname</th>
					<th>Surname</th>
					<th>Email</th>
					<th>DOB</th>
					<th>Created</th>
					<th>Functions</th>
				</tr>
			</thead>
		</DataTable>
	</div>
</template>

<style>
@import 'datatables.net-dt';
</style>