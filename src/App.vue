<script setup>
import { ref, onMounted } from 'vue';
import {
  firebaseFireStore,
  firebaseAuthentication,
  onAuthStateChanged,
  signOut
} from '@/firebase/database';
import { collection, getDocs } from 'firebase/firestore';

import { useRouter } from 'vue-router';
import Navigation from '@/components/Navigation.vue';
import AppFooter from '@/components/AppFooter.vue';

import axios from 'axios';

const loaded = ref(false);
const router = useRouter();

//redirects if user loses connnection
let previousPage = router.options.history.state.back;
window.addEventListener('offline', (e) => {
  router.push('/offline');
});
window.addEventListener('online', (e) => {
  if (previousPage == '/' || previousPage == 'offline') {
    router.push('/');
  } else {
    router.back();
  }
});

//requests all saleitems and userItems from firestore
//requests logged in user data
const user = ref(null);
const saleItems = ref([]);
const userItems = ref([]);
onMounted(async () => {
  const auth = await firebaseAuthentication;

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
    } else {
      user.value = null;
    }
  });
  //saleItems
  try {
    const querySnapshot = await getDocs(collection(firebaseFireStore, 'SaleItems'));
    saleItems.value = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    console.error('Error fetching saleItems:', error);
  }
  saleItems.value = saleItems.value.map((item) => {
    return Object.fromEntries(Object.entries(item).map(([key, value]) => [key.trim(), value]));
  });

  //userItems
  try {
    const querySnapshot = await getDocs(collection(firebaseFireStore, 'Users'));
    userItems.value = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    console.error('Error fetching userItems:', error);
  }
  loaded.value = true;
});

//logs the user out
const errorLogout = ref(null);
function logout() {
  signOut(firebaseAuthentication).then(
    () => {
      user.value = null;
      router.push('/');
    },
    (error) => {
      errorLogout.value = error.message;
    }
  );
  logoutAlertApp();
}

/**
 * Below is a collection of variables and functions to
 * request live exchange rates to update user prices
 */
let myHeaders = new Headers();
axios
  .get('http://localhost:4242/api/key')
  .then((response) => {
    myHeaders.append('apikey', response.data);
  })
  .catch((error) => {});

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

/**
 * Below is a function to request live exchange rates
 */
let currencyType = ref('GBP');
let currencyRate = ref(1);

async function changeCurrency(selectedCurrency) {
  currencyType.value = selectedCurrency;

  if (currencyType != 'GBP' && typeof currencyType !== 'undefined') {
    let currencyData;

    document.getElementById('loadingCurrency').style.display = 'block';
    document.getElementById('fade').style.opacity = '25%';

    //API request
    const currencyResponse = await fetch(
      'https://api.apilayer.com/exchangerates_data/convert?to=' +
        currencyType.value +
        '&from=GBP&amount=1',
      requestOptions
    );

    currencyData = await currencyResponse.json();

    document.getElementById('loadingCurrency').style.display = 'none';
    document.getElementById('fade').style.opacity = '100%';

    currencyRate.value = currencyData.result;
  } else {
    currencyRate.value = 1;
    //return "1"
  }
}

// User tries to add item to basket without logging in
let openLoginBasketAlertApp = true;
function loginBasketAlertApp() {
  if (openLoginBasketAlertApp) {
    document.getElementById('loginBasketApp').style.display = 'block';
    document.getElementById('fade1').style.opacity = '25%';
    openLoginBasketAlertApp = false;
  } else {
    document.getElementById('loginBasketApp').style.display = 'none';
    document.getElementById('fade1').style.opacity = '100%';
    openLoginBasketAlertApp = true;
  }
}

//Items added to basket
let openAddedBasketAlertApp = true;
function addedBasketAlertApp() {
  if (openAddedBasketAlertApp) {
    document.getElementById('addedBasketApp').style.display = 'block';
    document.getElementById('fade1').style.opacity = '25%';
    openAddedBasketAlertApp = false;
  } else {
    document.getElementById('addedBasketApp').style.display = 'none';
    document.getElementById('fade1').style.opacity = '100%';
    openAddedBasketAlertApp = true;
  }
}

//Item already in basket
let openInBasketAlertApp = true;
function inBasketAlertApp() {
  if (openInBasketAlertApp) {
    document.getElementById('inBasketApp').style.display = 'block';
    document.getElementById('fade1').style.opacity = '25%';
    openInBasketAlertApp = false;
  } else {
    document.getElementById('inBasketApp').style.display = 'none';
    document.getElementById('fade1').style.opacity = '100%';
    openInBasketAlertApp = true;
  }
}

// user logged out (alert)
let openlogoutAlertApp = true;
function logoutAlertApp() {
  if (openlogoutAlertApp) {
    document.getElementById('logoutApp').style.display = 'block';
    document.getElementById('fade1').style.opacity = '25%';
    openlogoutAlertApp = false;
  } else {
    document.getElementById('logoutApp').style.display = 'none';
    document.getElementById('fade1').style.opacity = '100%';
    openlogoutAlertApp = true;
  }
}
</script>

<template>
  <!-- need to log in popup -->
  <div class="alert alert-info" id="loginBasketApp" role="alert">
    <h4 class="alert-heading">Please login</h4>
    <p>In order to add items to your basket, please sign in.</p>
    <hr />
    <button class="btn btn-light" @click="loginBasketAlertApp()">close</button>
  </div>

  <!-- user logged out popup -->
  <div class="alert alert-info" id="logoutApp" role="alert">
    <h4 class="alert-heading">You have been logged out</h4>
    <p>You will no longer be able to save items for later viewing, or make bulk item purchases.</p>
    <hr />
    <button class="btn btn-light" @click="logoutAlertApp()">close</button>
  </div>

  <!-- successfully added item to basket -->
  <div class="alert alert-info" id="addedBasketApp" role="alert">
    <h4 class="alert-heading">Item added to your basket</h4>
    <p>This item has been added to your basket.</p>
    <hr />
    <button class="btn btn-light" @click="addedBasketAlertApp()">close</button>
  </div>

  <!-- if the user tries to add item to basket which is already there -->
  <div class="alert alert-info" id="inBasketApp" role="alert">
    <h4 class="alert-heading">Already in Basket</h4>
    <p>This item is already in your basket.</p>
    <hr />
    <button class="btn btn-light" @click="inBasketAlertApp()">close</button>
  </div>

  <div id="fade1">
    <Navigation
      :user="user"
      :userItems="userItems"
      @change-currency="changeCurrency"
      @logout="logout"
      :key="$route.fullPath"
    />
    <div v-if="loaded" class="onPage">
      <RouterView
        @loginBasketAlertApp="loginBasketAlertApp"
        @addedBasketAlertApp="addedBasketAlertApp"
        @inBasketAlertApp="inBasketAlertApp"
        :user="user"
        :userItems="userItems"
        :saleItems="saleItems"
        :currencyType="currencyType"
        :currencyRate="currencyRate"
        :key="$route.fullPath"
      />
    </div>
    <footer class="text-center text-lg-start text-muted mt-3">
      <AppFooter />
    </footer>
  </div>
</template>

<style>
.onPage {
  padding-top: 130px;
}

.dataTablePage {
  width: 96%;
  padding-left: 2%;
}

.form-check-input {
  border: 2px solid #157347;
}

.form-check-input:checked {
  background-color: #157347;
  border: 2px solid #157347;
}

.form-select {
  border: 1px solid #157347 !important;
}

.nav-link {
  border: 1px solid #157347 !important;
  text-decoration: none;
  color: black;
}

.productCards {
  border: 2px solid #157347 !important;
}

footer {
  background-color: #157347;
}

a {
  color: #157347;
  text-decoration: none;
}

#loginBasketApp,
#addedBasketApp,
#inBasketApp,
#logoutApp {
  display: none;
  width: 40%;
  margin-left: 30%;
  margin-top: 10%;
  position: fixed;
  z-index: 99;
}
</style>
