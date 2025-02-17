<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { updateFirebaseBasket } from '@/firebase/database';

import ProductCards from '../components/ProductCards.vue';

const router = useRouter();

const variables = defineProps({
  user: {
    type: String
  },
  userItems: {
    type: Object,
    default: () => {}
  },
  saleItems: {
    type: Object,
    default: () => {}
  },
  currencyType: {
    type: String
  },
  currencyRate: {
    type: String
  }
});

const parentComponent = 'Basket';
const itemsDisplay = ref(variables.saleItems);
const updatedQuantities = ref([]);
const userBasket = ref([]);
const basketToUpdate = ref([]);

const handleBasket = (array) => {
  userBasket.value = array;
};

const handleDisplayItems = (length) => {
  displayItems.value = length;
};

const handleNewBasket = (newQuantities) => {
  updatedQuantities.value = newQuantities;
};

//saves user changes to basket
const saveBasketChanges = async () => {
  let temp = '';
  for (let i = 0; i < userBasket.value.length; i++) {
    temp = userBasket.value[i].split(' /::')[0] + ' /::' + updatedQuantities.value[i];
    basketToUpdate.value.push(temp);
  }
  //attempts to update firebase with new basket data
  try {
    await updateFirebaseBasket(variables.user.uid, basketToUpdate.value); // Send update to Firebase
  } catch (error) {
    console.error('Error updating basket:', error);
  }
};

function checkoutBasket() {
  const basketQuery = encodeURIComponent(JSON.stringify(variables.userItems[0].Basket));
  router.push(`/payment?basket=${basketQuery}`);
}
</script>

<template>
  <div>
    <div v-if="user">
      <div class="row">
        <!-- screen spacing -->
        <div class="col-lg-1 col-sm-2"></div>
        <div class="col-lg-9 col-sm-12">
          <h2>Your Basket:</h2>
          <div v-if="displayItems == 0">
            <h4>Is Empty... <br />Sandy the Snake will not be happy about this.</h4>
            <h5>
              Take this
              <router-link to="/" style="font-size: 70px">
                <i class="bi bi-cart3"></i>
              </router-link>
              and get shopping!
            </h5>
          </div>
          <div v-else>
            <ProductCards
              @loginBasketAlert="loginBasketAlert"
              @inBasketAlert="inBasketAlert"
              @userBasket="handleBasket"
              @displayItems="handleDisplayItems"
              @newBasket="handleNewBasket"
              :parentComponent="parentComponent"
              :itemsDisplay="itemsDisplay"
              :user="user"
              :userItems="userItems"
              :currencyType="currencyType"
              :currencyRate="currencyRate"
            />
          </div>
          <div>
            <button class="btn btn-primary" @click="checkoutBasket()">Checkout</button>
            <button class="btn btn-success" @click="saveBasketChanges">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- user must login -->
    <div v-else>
      Please login to view you basket.<br />
      <router-link to="/login" class="d-none d-md-block mb-1">
        <button class="btn btn-outline-secondary"><i class="bi bi-door-open"></i>Log in</button>
      </router-link>
    </div>
  </div>
</template>

<style>
#basketCard {
  flex-direction: row !important;
}
</style>
