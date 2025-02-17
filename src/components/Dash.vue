<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Filters from '../components/Filters.vue';
import DashHead from '../components/DashHead.vue';
import ProductCards from '../components/ProductCards.vue';
import Pagination from '../components/Pagination.vue';

let router = useRouter();

let variables = defineProps({
  user: {
    type: Object
  },
  userItems: {
    type: Object
  },
  saleItems: {
    type: Object
  },
  currencyType: {
    type: String
  },
  currencyRate: {
    type: String
  }
});
console.log('DASH SALE ITEMS', variables.saleItems);
const parentComponent = 'Dash';

/**
 * below is a series of functions which are emitted by
 *  the child components. they alter the way the items are displayed
 * by filtering and sorting
 */
//shows items retrieved from firebase
const itemsDisplay = ref(variables.saleItems);
const itemsFound = ref(variables.saleItems);
function updateItemsFound(updatedItems) {
  itemsFound.value = updatedItems;
}
const perPage = ref(itemsFound.value.length);
const pageCount = ref(Math.ceil(itemsFound.value.length / perPage.value));

const perPageCount = ref(variables.saleItems.length);
function changePerPage(perPageValue) {
  perPageCount.value = perPageValue;
}

const currentPage = ref(1);
function changePage(pageValue) {
  currentPage.value = pageValue;
  showPerPage();
}

function sortResults(sortValue) {
  if (sortValue == 'High - Low') {
    itemsFound.value.sort((first, second) => second.Price - first.Price);
    showPerPage();
  } else if (sortValue == 'Low - High') {
    itemsFound.value.sort((first, second) => first.Price - second.Price);
    showPerPage();
  }
}

function showPerPage() {
  perPage.value = perPageCount.value;
  if (perPage.value == itemsFound.value.length) {
    itemsDisplay.value = itemsFound.value;
  } else {
    pageCount.value = Math.ceil(itemsFound.value.length / perPage.value);
    itemsDisplay.value = itemsFound.value.slice(
      (currentPage.value - 1) * perPage.value,
      (currentPage.value - 1) * perPage.value + parseInt(perPage.value)
    );
  }
}

//User tries to add item to basket without logging in
let openLoginBasketAlert = true;
function loginBasketAlert() {
  if (openLoginBasketAlert) {
    document.getElementById('loginBasket').style.display = 'block';
    document.getElementById('fade').style.opacity = '25%';
    openLoginBasketAlert = false;
  } else {
    document.getElementById('loginBasket').style.display = 'none';
    document.getElementById('fade').style.opacity = '100%';
    openLoginBasketAlert = true;
  }
}

let openAddedBasketAlert = true;
function addedBasketAlert() {
  if (openAddedBasketAlert) {
    document.getElementById('addedBasket').style.display = 'block';
    document.getElementById('fade').style.opacity = '25%';
    openAddedBasketAlert = false;
  } else {
    document.getElementById('addedBasket').style.display = 'none';
    document.getElementById('fade').style.opacity = '100%';
    openAddedBasketAlert = true;
  }
}

let openInBasketAlert = true;
function inBasketAlert() {
  console.log('in basket');
  if (openInBasketAlert) {
    document.getElementById('inBasket').style.display = 'block';
    document.getElementById('fade').style.opacity = '25%';
    openInBasketAlert = false;
  } else {
    document.getElementById('inBasket').style.display = 'none';
    document.getElementById('fade').style.opacity = '100%';
    openInBasketAlert = true;
  }
}
console.log(itemsDisplay.value);
</script>

<template>
  <!-- if the user changes currency, this alert appears while api call is awaiting -->
  <div class="alert alert-info" id="loadingCurrency" role="alert">
    <h4 class="alert-heading">Currency Changed</h4>
    <p>You have selected {{ currencyType }}, so displayed prices will be changed accordingly.</p>
    <hr />
    <p class="mb-0">These changes are loading, please wait.</p>
  </div>

  <!-- if the user tries to add item to basket without signing in, alert appears -->
  <div class="alert alert-info" id="loginBasket" role="alert">
    <h4 class="alert-heading">Please login</h4>
    <p>In order to add items to your basket, please sign in.</p>
    <hr />
    <button class="btn btn-light" @click="loginBasketAlert()">close</button>
  </div>

  <!-- successfully added item to basket -->
  <div class="alert alert-info" id="addedBasket" role="alert">
    <h4 class="alert-heading">Item added to your basket</h4>
    <p>This item has been added to your basket.</p>
    <hr />
    <button class="btn btn-light" @click="addedBasketAlert()">close</button>
  </div>

  <!-- if the user tries to add item to basket which is already there -->
  <div class="alert alert-info" id="inBasket" role="alert">
    <h4 class="alert-heading">Already in Basket</h4>
    <p>This item is already in your basket.</p>
    <hr />
    <button class="btn btn-light" @click="inBasketAlert()">close</button>
  </div>

  <!-- building dashboard from smaller components -->
  <div id="fade">
    <div style="padding: 20px 5px 0px 5px">
      <div class="row">
        <div class="col-lg-3">
          <Filters
            :itemsFound="itemsFound"
            :saleItems="saleItems"
            :currencyType="currencyType"
            :currencyRate="currencyRate"
            @update-items-found="updateItemsFound"
            @show-per-page="showPerPage"
          />
        </div>
        <div class="col-lg-9">
          <DashHead
            :itemsFound="itemsFound"
            @change-page="changePage"
            @show-per-page="showPerPage"
            @sort-results="sortResults"
            @change-per-page="changePerPage"
          />
          <div class="row">
            <ProductCards
              @loginBasketAlert="loginBasketAlert"
              @inBasketAlert="inBasketAlert"
              @addedBasketAlertApp="addedBasketAlert"
              :parentComponent="parentComponent"
              :itemsDisplay="itemsDisplay"
              :user="user"
              :userItems="userItems"
              :currencyType="currencyType"
              :currencyRate="currencyRate"
            />
          </div>
        </div>
        <hr />
        <Pagination :pageCount="pageCount" @change-page="changePage" @show-per-page="showPerPage" />
      </div>
    </div>
  </div>
</template>

<style>
#show-filters {
  margin-bottom: 10px;
}

#loadingCurrency {
  display: none;
  width: 40%;
  margin-left: 30%;
  margin-top: 10%;
  position: fixed;
  z-index: 99;
}

#loginBasket,
#addedBasket,
#inBasket {
  display: none;
  width: 40%;
  margin-left: 30%;
  margin-top: 10%;
  position: fixed;
  z-index: 99;
}
</style>
