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
let discount = 0.1
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
      Price: doc.data().Price
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

let quant = ref(0)
function quantity(value) {
  if (quant.value == 0 && value == '-1') {
    quant.value = 0
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
            <img style="max-width: 100%; max-height: 100vh; margin: auto;" id="productImage"
              src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp" />
          </div>

          <div class="d-flex justify-content-center mb-3">
            <div v-for="image in item.images" :key="id">
              <img width="60" height="60" :src="item.Images" class="lowerImage" />
            </div>
          </div>
        </div>

        <div class="col-lg-5" style="margin-top: 5px;">
          <h3> {{ item.Title }} </h3> <br>

          <div class="mb-3">
            <span class="h5">{{ ((item.Price * currencyRate) - (item.Price * currencyRate *
              discount)).toLocaleString(undefined, { style: "currency", currency: currencyType }) }}</span>
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
              <div class="input-group mb-3" style="width: 120px;">
                <button class="btn btn-white quantity" type="button" @click="quantity('-1')"><b>-</b></button>
                <input type="text" class="form-control text-center border border-secondary" :value="quant" />
                <button class="btn btn-white quantity" type="button" @click="quantity('1')"><b>+</b></button>
              </div>
            </div>

            <div class="col-md-5 col-6 mb-3">
              <label class="mb-2 d-block">Sub-total</label>
              <!-- add stock count to db -->
              <div class="input-group mb-3" style="width: 120px;">
                <input type="text" class="form-control text-center border border-secondary" :value="((item.Price * currencyRate * quant) - (item.Price * currencyRate *
                  (discount * quant))).toLocaleString(undefined, { style: 'currency', currency: currencyType })" />
              </div>
            </div>
            <div class="col-md-7">
              <a class="btn btn-success" style="margin-right:5px" @click="buyNow()"> Buy Now </a>
              <a class="btn btn-primary" style="margin-right:5px" @click="addToBasket()"> Add to Basket </a>
            </div>
          </div>
        </div>

        <div class="row" id="productRecs">
          <p>
            Lets write something here to see if its working now
            <!-- See Script COMMMENT 1 for getDocs()
            <div v-for="recommendations in recArray">
              bootsrap card with product image, title and price
            </div> -->

      <div class="row flex-nowrap overflow-auto">
        <div class="col-6 col-md-2" v-for="recommendation in recArray" :key="recommendation.id">
          <div class="card w-20">
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
          </p>

        </div>
      </div>
      <!-- content -->

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
          <!--
                  <div class="col-lg-4">
                    <div class="px-0 border rounded-2 shadow-0">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">Similar items</h5>
                          <div class="d-flex mb-3">
                            <a href="#" class="me-3">
                              <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp"
                                style="min-width: 96px; height: 96px;" class="img-md img-thumbnail" />
                            </a>
                            <div class="info">
                              <a href="#" class="nav-link mb-1">
                                Rucksack Backpack Large <br />
                                Line Mounts
                              </a>
                                  <strong class="text-dark"> $38.90</strong>
                                </div>
                                    </div>

                                <div class="d-flex mb-3">
                                  <a href="#" class="me-3">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                                      style="min-width: 96px; height: 96px;" class="img-md img-thumbnail" />
                                  </a>
                                  <div class="info">
                                    <a href="#" class="nav-link mb-1">
                                      Summer New Men's Denim <br />
                                      Jeans Shorts
                                    </a>
                                    <strong class="text-dark"> $29.50</strong>
                                  </div>
                                </div>

                                <div class="d-flex mb-3">
                                  <a href="#" class="me-3">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                                      style="min-width: 96px; height: 96px;" class="img-md img-thumbnail" />
                                  </a>
                                  <div class="info">
                                    <a href="#" class="nav-link mb-1"> T-shirts with multiple colors, for men and lady </a>
                                      <strong class="text-dark"> $120.00</strong>
                                      </div>
                                    </div>

                                    <div class="d-flex">
                                      <a href="#" class="me-3">
                                        <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp"
                                          style="min-width: 96px; height: 96px;" class="img-md img-thumbnail" />
                                      </a>
                                      <div class="info">
                                        <a href="#" class="nav-link mb-1"> Blazer Suit Dress Jacket for Men, Blue color </a>
                                        <strong class="text-dark"> $339.90</strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section> -->
        </div>
      </div>
    </div>
    <!-- </div> -->
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<style>
#productImageBox {
  border: 1px solid lightgrey;
  border-radius: 15px;
}

#productImage {
  /* class="rounded-4 fit" */
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
}
</style>