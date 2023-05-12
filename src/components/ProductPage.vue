<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { firebaseFireStore } from '@/firebase/database'
import { collection, getDoc, getDocs, doc, where, limit } from 'firebase/firestore';

let variables = defineProps({
  id: {
    type: String
  },
  currencyRate: {
    type: String
  },
  currencyType: {
    type: String
  }
})
let route = useRoute()
let router = useRouter()

console.log(variables.id)

const itemRef = doc(firebaseFireStore, "SaleItems", variables.id);
let item = ref(null);
let recArray = ref([])


/*  COMMENT 1: 
const recQuery = await getdocs(collRef, where('Categories', '==', item.value.Categories), limit(6))
let recItems = []
recQuery.foreach((doc) => {
  const recommendation = {
    id: doc.data().id
    ImageMain: doc.data().ImageMain,
    Title: doc.data().Title,
    Price: doc.data().Price
  }
  reqItems.push(recommendation)
})
recArray.value = recItems
*/

onMounted(async () => {
  console.log(Boolean("false"))
  console.log(Boolean(false))
  console.log(false)
  console.log(Boolean(true))
  console.log(true)
  try {
    const snapshot = await getDoc(itemRef);
    if (snapshot.exists()) {
      item.value = snapshot.data()
      console.log("-- success --")

    } else {
      console.log("Document does not exist")
    }
  } catch (error) {
    console.log(error)
  }

  console.log(item.value)
  console.log(item.value.Categories)
  const recQuery = await getDocs(collection(firebaseFireStore, "SaleItems"), where('Categories', '==', "'" + item.value.Categories + "'"), limit(3))
  let recItems = []
  recQuery.forEach((doc) => {
    const recommendation = {
      id: doc.id,
      ImageMain: doc.data().ImageMain,
      Title: doc.data().Title,
      Price: doc.data().Price,
      StripePriceId: doc.data().StripePriceId
    }
    recItems.push(recommendation)
  })
  recArray.value = recItems
  console.log('recArray.value')
  console.log(recArray.value)
})

let chosenColour = ref("Black")

let subTab = ref("Description")
let message = ref('')
function changeSubTab(e) {
  subTab.value = e
  console.log(subTab.value)

  if (subTab.value == "Description") {
    // message.value = item.value.Description + item.value.Dimensions
    document.getElementById('subNavPage').innerHTML = "<p>Item Description</p><p>" + item.value.Description + "</p>"
  }
  else if (subTab.value == "Delivery") {
    message.value = "Delivery available by "
  }
  else {
    message.value = "This is reviews"
  }
}

function addToBasket() {
  console.log("added to basket: " + item.value.Title)
}

function buyNow() {
  router.push("/payment")
}

let quant = ref(1)
function quantity(value) {
  if (quant.value == 1 && value == '-1') {
    quant.value = 1
  }
  else if (quant.value == 10 && value == '1') {
    quant.value = 10
  }
  else {
    quant.value += Number(value)
    console.log(quant.value)
  }
}
</script>

<template >
  <div class="onPage" style="margin-top: 10px">
    <!-- <router-link :to="router.go(-1)">Go Back</router-link> -->
    <div v-if="item">
      <div class="row gx-5">
        <div class="col-lg-1"></div>
        <div class="col-lg-4">
          <div class="mb-3 d-flex justify-content-center" id="productImageBox">
            <img style="max-width: 100%; max-height: 100vh; margin: auto;" id="productImage" :src="item.ImageMain" />
          </div>

          <div class="d-flex justify-content-center mb-3">
            <div v-for="image in item.images" :key="id" class="productCards">
              <img width="60" height="60" :src="item.Images" class="lowerImage" />
            </div>
          </div>
        </div>

        <div class="col-lg-5" style="margin-top: 5px;">
          <h3> {{ item.Title }} </h3> <br>

          <div class="mb-3">
            <span class="h5">{{ ((item.Price * currencyRate)).toLocaleString(undefined, {
              style: "currency", currency:
                currencyType
            }) }}</span>
            <span class="text-muted">/unit</span>
          </div>

          <p>
            {{ item.Description }}
          </p>

          <div class="row">
            <p class="col-3"><b>Type</b></p>
            <p class="col-9">{{ item.Categories }}</p>

            <p class="col-3"><b>Colour</b></p>
            <p class="col-9">{{ chosenColour }}</p>

            <p class="col-3"><b>Purspose</b></p>
            <p class="col-9">Accessory type (set to type)</p>

            <p class="col-3"><b>Tags</b></p>
            <p class="col-9">{{ item.Tags }}</p>
          </div>

          <hr />

          <div class="row mb-4">
            <div class="col-md-4 col-6 mb-3">
              <label class="mb-2">Colour</label>
              <select class="form-select border border-secondary" v-model="chosenColour"
                style="height: 35px; width: 120px;">
                <option value="Black">Black</option>
                <option v-if="item.Categories == 'Enclosures'" value="Wood-Brown">Wood-Brown</option>
                <option v-if="item.Categories == 'Enclosures'" value="White">White</option>

                <option v-if="item.Categories == 'Basking and Hydrating'" value="Natural Rock">Natural Rock</option>
                <option v-if="item.Categories == 'Basking and Hydrating'" value="Mossy Log">Mossy Log</option>
                <option v-if="item.Categories == 'Basking and Hydrating'" value="Sandstone">Sandstone</option>

                <option v-if="item.Categories == 'Bedding and Substrate'" value="Sandy">Sandy</option>
                <option v-if="item.Categories == 'Bedding and Substrate'" value="Dirty">Dirty</option>
                <option v-if="item.Categories == 'Bedding and Substrate'" value="Dark Shaving">Dark Shaving</option>
              </select>
            </div>

            <div class="col-md-4 col-6 mb-3">
              <label class="mb-2 d-block">Quantity</label>
              <!-- add stock count to db -->
              <div class="input-group mb-3 border-success" style="width: 120px;">
                <button class="btn btn-white quantity border-success" type="button"
                  @click="quantity('-1')"><b>-</b></button>
                <input type="text" class="form-control text-center border border-success" :value="quant" disabled />
                <button class="btn btn-white quantity border-success" type="button"
                  @click="quantity('1')"><b>+</b></button>
              </div>
            </div>

            <div class="col-md-5 col-6 mb-3">
              <label class="mb-2 d-block">Sub-total</label>
              <!-- add stock count to db -->
              <div class="input-group mb-3 border-success" style="width: 120px;">
                <input type="text" class="form-control text-center border-success"
                  :value="((item.Price * currencyRate * quant)).toLocaleString(undefined, { style: 'currency', currency: currencyType })" />
              </div>
            </div>
            <div class="col-md-7">
              <router-link style="text-decoration: none; color: white; margin-right: 5px;"
                :to="{ name: 'Payment', params: { id: item.StripePriceId.substring(6), quantity: quant } }">
                <button class="btn btn-success">
                  Buy Now
                </button>
              </router-link>
              <a class="btn btn-primary" style="margin-right:5px" @click="addToBasket()"> Add to Basket </a>
            </div>
            <p>Please note, all successful purchases will be charge as £GBP at final checkout</p>
          </div>
        </div>

        <div class="row" id="productRecs">
          <div class="row flex-nowrap overflow-auto">
            <div class="col-6 col-md-2" v-for="recommendation in recArray" :key="recommendation.id">
              <div class="card w-20 productCards">
                <img :src="recommendation.ImageMain" :alt="recommendation.Alt" class="card-img-top" />
                <div class="card-body d-flex flex-column">
                  <div class="d-flex flex-row">
                    <h5 class="mb-1 me-1"><router-link
                        :to="{ name: 'Product', params: { id: recommendation.id, currencyRate: currencyRate, currencyType: currencyType } }">{{
                          recommendation.Title }}</router-link></h5>
                    <br>
                    <h6>{{ (recommendation.Price * currencyRate).toLocaleString(
                      undefined, { style: "currency", currency: currencyType })
                    }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="productBottom">
        <div class="container">
          <div class="row gx-4">
            <div class="col-lg-4 mb-8"></div>
            <div class="col-lg-8 mb-4">
              <div class="border rounded-2 px-3 py-2 bg-white">

                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary" @click="changeSubTab('Description')">Description</button>
                  <button type="button" class="btn btn-primary" @click="changeSubTab('Reviews')">Reviews</button>
                  <button type="button" class="btn btn-primary" @click="changeSubTab('Delivery')">Delivery</button>
                </div>
                <div id="subNavPage"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<style>
#productImageBox {
  border: 3px solid #157347;
  border-radius: 10px;
}

#productImage {
  border-radius: 10px;
}

.lowerImage {
  margin-right: 3px;
  margin-left: 3px;
  border-radius: 5px;
}

.quantity {
  border: 1px solid;
  border-radius: 5px;
}

#productBottom {
  background-color: #e9ecef;
  border-top: 1px solid lightgrey;
  padding-top: 10px;
}

.subNav {
  border-radius: 2px;
}

@media screen and (max-width: 768px) {
  #productRecs {
    border: solid 1px lightgrey;
    border-radius: 15px;
    padding-left: 25px;
  }
}

@media screen and (min-width: 769px) {
  #productRecs {
    border: solid 1px lightgrey;
    border-radius: 15px;
    padding-left: 5px;
  }
}</style>