<!-- <script setup>
import { useStripe, useElements } from '@vue-stripe/vue-stripe';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
// import Stripe from '@stripe/stripe-js'

const stripe = useStripe();
const elements = useElements();

const handleSubmit = async () => {
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: elements.getElement('card'),
  });

  if (error) {
    console.error(error.message);
  }
  else {
    console.log(paymentMethod);
    // Make API call to complete transaction
  }
}
</script>

<template>
  <div class="onPage">
  <h1>Checkout</h1>
      <div ref="cardElement"></div>
      <button @click="handleSubmit">Pay</button>
    <StripeCheckout />
  </div>
</template>


<template>
  <StripeCheckout />
  <StripeElementCard />
</template>

<script setup>
import { StripeCheckout, StripeElementCard } from '@vue-stripe/vue-stripe';

let props = defineProps(
  
)
</script>

    
 -->
