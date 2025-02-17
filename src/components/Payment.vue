<script setup>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { ref, onMounted, computed, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const variables = defineProps({
  id: {
    type: String
  },
  saleItems: {
    type: String
  },
  basket: {
    type: Array
  }
});

const publishStripeKey =
  'pk_test_51N3jriDC5rlXGg8WXEFMQPOKLX5QwVNge0MJL5aheSRDqDd10IY1qylyZGR9WJabU1H2nG4FQCo5eE4CBZxCLrnB009VzMkubq';

const basketParam = route.query.basket ? JSON.parse(decodeURIComponent(route.query.basket)) : null;

//prepares items for purchase into Stripe format
const purchaseItems = computed(() => {
  if (basketParam) {
    console.log('BASKET TEST BASKET PARAM');
    // If coming from the basket, process multiple items
    return basketParam
      .map((entry) => {
        const [itemID, quantity] = entry.split(' /::');
        const item = variables.saleItems.find((product) => product.id === itemID);
        return item ? { price: item.StripePriceId, quantity: Number(quantity) } : null;
      })
      .filter(Boolean); // Remove any null entries in case of missing data
  } else {
    //process single item (buy now)
    return [
      {
        price: 'price_' + variables.id,
        quantity: 1
      }
    ];
  }
});
const refCheckout = ref(null);

onMounted(async () => {
  console.log('Current route status:', route.query.status);

  //redirect to checkout
  if (!route.query.status) {
    console.log('Starting Stripe checkout process...');
    if (refCheckout.value) {
      await refCheckout.value.redirectToCheckout();
    } else {
      console.error('StripeCheckout ref is not defined.');
    }
  } else {
    postPurchaseAttempt(route.query.status);
  }
});

//show pop-ups
function postPurchaseAttempt(status) {
  if (status === 'cancel') {
    console.log('calling cancel alert');
    cancelAlert();
  } else if (status === 'success') {
    console.log('calling success alert');
    successAlert();
  }
}

//redirect user
function redirectPostPurchase(status) {
  window.location.replace('/');
}
//User tries to add item to basket without logging in
let openCancelAlert = true;
function cancelAlert() {
  if (openCancelAlert) {
    document.getElementById('cancelAlert').style.display = 'block';
    openCancelAlert = false;
  } else {
    document.getElementById('cancelAlert').style.display = 'none';
    openCancelAlert = true;
  }
}

let openSuccessAlert = true;
function successAlert() {
  if (openSuccessAlert) {
    document.getElementById('successAlert').style.display = 'block';
    openSuccessAlert = false;
  } else {
    document.getElementById('successAlert').style.display = 'none';
    openSuccessAlert = true;
  }
}
</script>

<template>
  <!-- if the purchase is cancelled, alert will appear -->
  <div class="alert alert-info" id="cancelAlert" role="alert">
    <h4 class="alert-heading">Purchase Cancelled</h4>
    <p>
      The purchase has been cancelled. Either you have cancelled it, or there has been an error
      during processing. You will not be charged.
    </p>
    <hr />
    <button class="btn btn-light" @click="redirectPostPurchase('cancel')">close</button>
  </div>

  <!-- if the purchase is successful, alert will appear -->
  <div class="alert alert-info" id="successAlert" role="alert">
    <h4 class="alert-heading">Purchase successful</h4>
    <p>
      "Thank you for you purchase!" Says your grateful reptile. You will now be rediected to the
      dashboard
    </p>
    <hr />
    <button class="btn btn-light" @click="redirectPostPurchase('success')">close</button>
  </div>
  <div>
    <h1 v-if="!route.query.status">Preparing Purchase Page</h1>
    <StripeCheckout
      ref="refCheckout"
      cancel-url="http://localhost:5173/payment?status=cancel"
      mode="payment"
      :pk="publishStripeKey"
      :lineItems="purchaseItems"
      success-url="http://localhost:5173/payment?status=success"
    />
  </div>
</template>

<style>
#loadingPurchase {
  color: #157347;
  position: absolute;
  top: 50%;
  left: 38%;
  margin-top: -50px;
  margin-left: -50px;
}

#cancelAlert,
#successAlert {
  display: none;
  width: 40%;
  margin-left: 30%;
  margin-top: 10%;
  position: fixed;
  z-index: 99;
}
</style>
