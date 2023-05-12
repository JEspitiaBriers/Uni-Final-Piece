<script setup>
import { useRouter } from 'vue-router'
import { watch, computed, ref } from 'vue'

let variables = defineProps({
	user: {
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
					<img class="titleLogo" src="@/assets/ReptileRecluseLogo.png" height="70" alt="Lizard logo" loading="lazy" />
					<h4 class="titleLogo">Improve your Reptiles Home</h4>
				</router-link>

				<div class="d-flex float-end">
					<a>
						<select class="form-select d-inline-block w-auto border pt-1 me-1" 
							@change="$emit('changeCurrency', $event.target.value)">
							<option value="GBP">GBP</option>
							<option value="EUR">EUR</option>
							<option value="USD">USD</option>
							<option value="JPY">JPY</option>
							<option value="AUD">AUD</option>
						</select>
					</a>

					<router-link to="/login" class="d-none d-md-block mb-0">
						<a v-if="!user" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
							Log in
						</a>
					</router-link>

					<router-link to="/register" class="d-none d-md-block mb-0">
						<a v-if="!user" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
							Register
						</a>
					</router-link>
					

					<router-link to="/" class="d-none d-md-block mb-0">
						<a class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
								Dashboard
						</a>
					</router-link>

					<router-link to="/cart" class="d-none d-md-block mb-0">
						<a v-if="user" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
							Cart
						</a>
					</router-link>
					
					<a v-if="user">
						<select class="form-select d-inline-block w-auto border pt-1" @change="changeRoute($event.target.value)">
							<option selected :value="currentPage">Hello, {{ user.displayName }}</option>
							<option value="manage">Manage Account</option>
							<option @click="$emit('logout')">Logout</option>
						</select>
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