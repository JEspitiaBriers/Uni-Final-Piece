<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { firebaseFireStore } from '@/firebase/database'
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';

const variables = defineProps({
  user: {
    type: String
  },
  saleItems: {
    type: Object,
    default: () => { }
  },
  currencyType: {
    type: String
  },
  currencyRate: {
    type: String
  }
})

const emptyBasket = ref(false)
const basketIDs = ref([])
const basketItems = ref([])
const quantArray = ref([])

//filters sale items by the ids in the users basket
//this new array is used to display the cards
if (variables.user) {
  console.log(variables.saleItems)
  onMounted(async () => {
    const userRef = await doc(firebaseFireStore, "Users", variables.user.uid)
    const userDoc = await getDoc(userRef)
    basketIDs.value = userDoc.data().Basket
    console.log(basketIDs.value)
    if (basketIDs.value.length == 0) {
      emptyBasket.value = true
    }
    else {
      basketItems.value = Object.values(variables.saleItems).filter(item => basketIDs.value.some(term => item.id === term.split(" ")[0]));
      console.log(basketItems.value)
      for (let i = 0; i < basketItems.value.length; i++) {
        quantArray.value.push(Number(basketIDs[i].split('/::')[1]))
      }
    }
  })
}

/**
 * This function is not finished.
 * the intent was to create an array which contains a 
 * Qtn value for each item which could be adjusted.
 * this information was then to be sent to the payment 
 * page, and processed accordingly at checkout
 */
const quant = ref(0)
function quantity(value, base) {
  if ((base - quant.value) == 1 && value == '-1') {
    quant.value = 1
  }
  else if ((base - quant.value) == 10 && value == '1') {
    quant.value = 10
  }
  else {
    quant.value += Number(value)
  }
}
</script>

<template>
  <div class="onPage">
    <div v-if="user">
      <div class="row">
        <!-- screen spacing -->
        <div class="col-lg-2 col-sm-2"></div>
        <div class="col-lg-6 col-sm-6">
          <h2>Your Basket:</h2>
          <div v-if="emptyBasket">
            <h4>Is Empty... <br>Sandy the Snake will not be happy about this.</h4>
            <h5>Take this <router-link to="/" style="font-size: 70px"> <i class="bi bi-cart3"></i> </router-link> and get
              shopping!</h5>
          </div>
          <div v-else>
            <router-link style="text-decoration: none; color: white; margin-right: 5px;"
              :to="{ name: 'Payment', params: { id: `${basketIDs}`, quantity: `${quantArray}` } }">
              <button class="btn btn-success">
                Buy Now
              </button>
            </router-link>

            <!-- Display cards for each item in basket -->
            <div v-for="(item, index) in basketItems" :key="index">
              <div class="card w-100 my-2 shadow-2-strong" id="basketCard" style="border: 2px solid #157347">
                <img :src="item.ImageMain" :alt="item.Alt" class="card-img-top" style="border-right: 2px solid #157347" />
                <div class="card-body d-flex flex-column">
                  <div class="d-flex flex-row">
                    <h5 class="mb-1 me-1"><router-link
                        :to="{ name: 'Product', params: { id: item.id, currencyRate: currencyRate, currencyType: currencyType } }">{{
                          item.Title }}</router-link></h5>
                    <br>
                  </div>
                  <p class="card-text">{{ item.Description.substring(0, 150) }}...</p>
                  <div class="row">
                    <div class="col-6">
                      <h5>{{ (item.Price * currencyRate).toLocaleString(
                        undefined, { style: "currency", currency: currencyType })
                      }} / unit</h5>
                      <h5>Qtn: {{ quantArray[index] + quant }} </h5>
                      <span>Sub-Total: {{ (item.Price * currencyRate * (quantArray[index] + quant)).toLocaleString(
                        undefined, { style: "currency", currency: currencyType })
                      }}</span>
                    </div>
                    <!-- adjust Qtn for each item 
                      see comment by quant = ref() 
                      for explaination of desired functionality -->
                    <div class="col-6">
                      <div class="input-group mb-3 border-success" style="width: 120px;">
                        <button class="btn btn-white quantity border-success" type="button"
                          @click="quantity('-1', quantArray[index])"><b>-</b></button>
                        <input type="text" class="form-control text-center border border-success"
                          :value="quantArray[index] + quant" disabled />
                        <button class="btn btn-white quantity border-success" type="button"
                          @click="quantity('1', quantArray[index])"><b>+</b></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- user must login -->
    <div v-else>
      Please login to view you basket.<br>
      <router-link to="/login" class="d-none d-md-block mb-0">
        <a class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
          <i class="bi bi-door-open"></i> Log in
        </a>
      </router-link>
    </div>
  </div>
</template>

<style>
#basketCard {
  flex-direction: row !important;
}

#basketCard img {
  /* width: 30% !important; */
}
</style>