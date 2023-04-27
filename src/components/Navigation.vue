<script setup>
import { useRouter } from 'vue-router'
import { watch, computed, ref } from 'vue'

let variables = defineProps({
	userItems: {
		type: Object,
		default: () => { }
	},
})

//Router related variables/functions
let router = useRouter()
let currentPage = router.currentRoute.value.name

function changeRoute(e) {
	e.target.value.includes('Hello') ? router.push(currentPage) : router.push("/" + e.target.value)
}

</script>

<template>
		<!-- Navbar Start -->
		<nav style="border-bottom: 1px solid; background-color: white;" class="navbar navbar-expand-lg navbar-light fixed-top">
			<div class="container-fluid">
				<!-- Logo and Title -->
				<router-link to="/">
					<img class="titleLogo" src="@/components/imgs/LizardLogo.png" height="50" alt="Lizard logo" loading="lazy" />
					<h1 class="titleLogo" style="color:black">Reptiles Recluse</h1>
				</router-link>

				<div class="d-flex float-end">
					<a>
						<select class="form-select d-inline-block w-auto border pt-1" 
							@change="$emit('changeCurrency', $event.target.value)">
							<option value="GBP">GBP</option>
							<option value="EUR">EUR</option>
							<option value="USD">USD</option>
							<option value="JPY">JPY</option>
							<option value="AUD">AUD</option>
						</select>
					</a>

					<a v-if="!user" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
						<router-link style="text-decoration: none; color: black;" to="/login" class="d-none d-md-block mb-0">
							Log in
						</router-link>
					</a>

					<a v-if="!user" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
						<router-link style="text-decoration: none; color: black;" to="/register" class="d-none d-md-block mb-0">
							Register
						</router-link>
					</a>

					<a class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
						<router-link style="text-decoration: none; color: black;" to="/" class="d-none d-md-block mb-0">
							Dashboard
						</router-link>
					</a>

					<a v-if="user">
						<select class="form-select d-inline-block w-auto border pt-1" @change="changeRoute($event)">
							<option selected :value="currentPage">Hello, {{ userItems.Firstname }}</option>
							<option value="manage">Manage Account</option>
							<option value="analysis">Analysis</option> <!-- v-if="isAdmin()" -->
							<option value="addProduct">Add Product</option> <!-- v-if="isAdmin()" -->
							<option value="wishlist">Wishlist</option>
							<option @click="$emit('logout')">Logout</option>
						</select>
					</a>

					<a v-if="user" class="border rounded py-1 px-3 nav-link d-flex align-items-center">
						<router-link style="text-decoration: none; color: black;" to="/cart" class="d-none d-md-block mb-0">
							Cart
						</router-link>
					</a>

				</div>
			</div>
		</nav>
		<!-- Navbar End -->
</template>

<style>
/* Navbar Start */
.titleLogo {
	display: inline-block;
	vertical-align: middle;
}
/* Navbar End */
</style>