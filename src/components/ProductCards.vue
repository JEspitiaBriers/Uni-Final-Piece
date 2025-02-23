<script setup>
import { ref, toRefs, defineEmits, watchEffect, watch } from 'vue';

import { firebaseFireStore } from '@/firebase/database';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

let variables = defineProps({
  parentComponent: {
    type: String
  },
  itemsDisplay: {
    type: Object
  },
  user: {
    type: Object
  },
  userItems: {
    type: Object
  },
  currencyType: {
    type: String,
    default: 'GBP'
  },
  currencyRate: {
    type: String,
    default: '1'
  }
});

const { parentComponent } = toRefs(variables);

//function / functions for adding items to basket
const emit = defineEmits([
  'loginBasketAlert',
  'inBasketAlert',
  'addedBasketAlert',
  'displayItems',
  'newBasket',
  'userBasket'
]);
const addOrIn = ref('');
async function addToBasket(item) {
  //user is logged in
  if (variables.user) {
    const userRef = await doc(firebaseFireStore, 'Users', variables.user.uid);
    const userDoc = await getDoc(userRef);
    const basket = userDoc.data().Basket;
    //add item if empty basket
    if (basket.length == 0) {
      addBasket();
    } else {
      for (let i = 0; i < basket.length - 1; i++) {
        //check if item is in basket prevents adding if already there
        if (basket[i].includes(item)) {
          emit('inBasketAlert');
        } else if (i == basket.length - 1 && !basket[i].includes(item)) {
          addBasket();
          break;
        }
      }
    }
    function addBasket() {
      basket.push(item + ' /::' + String(1));
      updateDoc(userRef, 'Basket', basket);
      emit('addedBasketAlert');
    }
  }
  //user not logged in
  else {
    emit('loginBasketAlert');
  }
}

const displayList = ref([]);
const quantArray = ref([]);

//tracks the parent component display either the whole list on the dashboard,
// or just the item in basket
watchEffect(() => {
  if (variables.parentComponent === 'Dash') {
    displayList.value = [...variables.itemsDisplay]; // Show all items
  } else if (variables.parentComponent === 'Basket') {
    if (!variables.userItems?.[0]?.Basket || !variables.itemsDisplay) {
      displayList.value = []; // Prevent errors if data is missing
      return;
    }
    emit('userBasket', variables.userItems[0].Basket);
    // Extract only the item IDs from Basket
    const basketIds = new Set(
      variables.userItems[0].Basket.map((entry) => String(entry.split(' /::')[0])) // Ensure IDs match format
    );

    quantArray.value = variables.userItems[0].Basket.map((entry) => String(entry.split(' /::')[1]));

    // Filter the itemsDisplay list to only include basket items
    displayList.value = variables.itemsDisplay.filter((item) => basketIds.has(String(item.id)));
  }
});

watch(displayList.value, (newList) => {
  emit('displayItems', newList.length);
});

//sets a minimum and maximum value for items in the users basket
// and change the quantity in the users basket
const changeQuantity = (amount, index) => {
  const change = Number(amount);
  if (quantArray.value[index] === undefined) {
    quantArray.value[index] = 1; // Default to 1 if undefined
  }

  let newQuantity = Number(quantArray.value[index]) + change;
  if (newQuantity < 1) {
    newQuantity = 1;
  } else if (newQuantity > 10) {
    newQuantity = 10;
  }

  quantArray.value[index] = newQuantity;
};

watch(
  quantArray.value,
  (newQuantity) => {
    emit('newBasket', newQuantity);
  },
  { deep: true }
);
</script>

<template>
  <!-- iterates through items which match the users filters and displays them -->
  <div v-for="(item, index) in displayList" :key="index" class="col-lg-4 col-md-6 col-sm-6 d-flex">
    <div class="card w-100 my-2 shadow-2-strong productCards">
      <img
        :src="item.ImageMain"
        :alt="item.Alt"
        class="card-img-top"
        style="border-bottom: 2px solid #157347"
      />
      <div class="card-body d-flex flex-column">
        <div class="d-flex flex-row">
          <h5 class="mb-1 me-1">
            <router-link
              :to="{
                name: 'Product',
                params: { id: item.id, currencyRate: currencyRate, currencyType: currencyType }
              }"
              >{{ item.Title }}</router-link
            >
          </h5>
          <br />
        </div>
        <p v-if="item.Description" class="card-text">{{ item.Description.substring(0, 80) }}...</p>
        <p class="card-text">{{ item.Dimensions }}</p>
        <h5>
          {{
            (item.Price * currencyRate).toLocaleString(undefined, {
              style: 'currency',
              currency: currencyType
            })
          }}
        </h5>
        <div v-if="parentComponent === 'Dash'" class="col-md-8">
          <router-link
            style="text-decoration: none; color: white; margin-right: 5px"
            :to="{
              name: 'Payment',
              params: {
                id: item.StripePriceId.substring(6),
                currencyRate: currencyRate,
                currencyType: currencyType,
                quantity: 1
              }
            }"
          >
            <button class="btn btn-success">Buy Now</button>
          </router-link>
          <a class="btn btn-primary" style="margin-right: 5px" @click="addToBasket(item.id)">
            Add to Basket
          </a>
        </div>
        <div v-else-if="parentComponent === 'Basket'">
          <!-- <h5>Qtn: {{ quantArray[index] + quant }}</h5> -->
          <h5>Qtn: {{ quantArray[index] }}</h5>
          <span
            >Sub-Total:
            {{
              (item.Price * currencyRate * quantArray[index]).toLocaleString(undefined, {
                style: 'currency',
                currency: currencyType
              })
            }}</span
          >
          <!-- adjust Qtn for each item -->
          <div class="col-6">
            <div class="input-group mb-3 border-success" style="width: 120px">
              <button
                class="btn btn-white quantity border-success"
                type="button"
                @click="changeQuantity('-1', index)"
              >
                <b>-</b>
              </button>
              <input
                type="text"
                class="form-control text-center border border-success"
                :value="quantArray[index] || 1"
                disabled
              />
              <button
                class="btn btn-white quantity border-success"
                type="button"
                @click="changeQuantity('1', index)"
              >
                <b>+</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
