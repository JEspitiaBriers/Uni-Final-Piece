<template>
  <div class="onPage">
    <h1 id="loadingPurchase">Loading Purchase Page</h1>
    <StripeCheckout 
    ref="refCheckout"
    mode="payment"
    :pk="publishStripeKey"
    :lineItems="purchaseItems"
    :successURL="sucessURL"
    :cancelURL="cancelURL"/>
  </div>
</template>


<script setup>
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import { ref, onMounted } from 'vue'

const publishStripeKey = 'pk_test_51N3jriDC5rlXGg8WXEFMQPOKLX5QwVNge0MJL5aheSRDqDd10IY1qylyZGR9WJabU1H2nG4FQCo5eE4CBZxCLrnB009VzMkubq'

const purchaseItems= [{
  price: 'price_1N5vgrDC5rlXGg8WVo7SitvU',
  quantity: 1
}]

const successURL = 'http://localhost:5173/paymentSuccess'
const cancelURL = 'http://localhost:5173/paymentCancelled'

const refCheckout = ref(null)

onMounted(async () => {
  await refCheckout.value.redirectToCheckout()
})
</script>

<style>
#loadingPurchase {
  color: #157347;
  position: absolute;
  top: 50%;
  left: 38%;
  margin-top: -50px;
  margin-left: -50px;
}
</style>