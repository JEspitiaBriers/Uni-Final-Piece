<script setup>
import { useRouter } from 'vue-router';
import { watch, computed, ref, defineEmits } from 'vue';

let variables = defineProps({
  user: {
    type: Object,
    default: () => {}
  }
});

//Router related variables/functions
let router = useRouter();
let currentPage = router.currentRoute.value.name;

const emit = defineEmits(['logout', 'loginBasketAlert1']);

//User processes (logout)
function changeRoute(e) {
  if (e.target.value === 'logout') {
    emit('logout'); // Emits the logout event to the parent (App.vue)
  } else {
    router.push('/' + e.target.value);
  }
}

//User tries to add item to basket without logging in
let openLoginBasketAlert1 = true;
function loginBasketAlert1() {
  console.log('Nav loginBasket1 this');
  if (openLoginBasketAlert1) {
    document.getElementById('loginBasket1').style.display = 'block';
    document.getElementById('fade1').style.opacity = '25%';
    openLoginBasketAlert1 = false;
  } else {
    document.getElementById('loginBasket1').style.display = 'none';
    document.getElementById('fade1').style.opacity = '100%';
    openLoginBasketAlert1 = true;
  }
}
</script>

<template>
  <!-- if the user tries to add item to basket without signing in, alert appears -->
  <div class="alert alert-info" id="loginBasket1" role="alert">
    <h4 class="alert-heading">Please login</h4>
    <p>In order to add items to your basket, please sign in.</p>
    <hr />
    <button class="btn btn-light" @click="loginBasketAlert1()">close</button>
  </div>

  <!-- Navbar Start -->
  <nav
    style="border-bottom: 1px solid; background-color: white"
    class="navbar navbar-expand-lg navbar-light fixed-top"
  >
    <div class="container-fluid">
      <!-- Logo and Title -->
      <router-link to="/">
        <img
          class="titleLogo"
          src="@/assets/ReptileRecluseLogo.png"
          height="70"
          alt="Lizard logo"
          loading="lazy"
        />
        <h4 class="titleLogo">Improve your Reptiles Home</h4>
      </router-link>

      <!-- currency options -->
      <div class="d-flex float-end">
        <a>
          <select
            class="form-select d-inline-block w-auto border pt-1 me-1"
            @change="$emit('changeCurrency', $event.target.value)"
          >
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
          </select>
        </a>

        <!-- user options -->
        <router-link to="/login" class="d-none d-md-block mb-0">
          <a v-if="!user" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
            <i class="bi bi-door-open"></i> Log in
          </a>
        </router-link>

        <router-link to="/register" class="d-none d-md-block mb-0">
          <a v-if="!user" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
            <i class="bi bi-clipboard-plus"></i> Register
          </a>
        </router-link>

        <router-link to="/" class="d-none d-md-block mb-0">
          <a class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
            <i class="bi bi-house-door"></i> Dashboard
          </a>
        </router-link>

        <router-link to="/basket" class="d-none d-md-block mb-0">
          <a v-if="user" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
            <i class="bi bi-basket"></i> Basket
          </a>
        </router-link>

        <a v-if="user">
          <select
            class="form-select d-inline-block w-auto border pt-1"
            @change="changeRoute($event)"
          >
            <option selected value="Hello">Hello, {{ user.displayName }}</option>
            <option @click="$emit('logout')" value="logout">Logout</option>
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

.bi {
  padding-right: 5px;
}

#loginBasket1 {
  display: none;
  width: 40%;
  margin-left: 30%;
  margin-top: 10%;
  position: fixed;
  z-index: 99;
}
</style>
