<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { firebaseFireStore } from '@/firebase/database'
import { collection, getDoc, doc } from 'firebase/firestore';

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

onMounted(async () => {
  try {
    const snapshot = await getDoc(itemRef);
    if (snapshot.exists()) {
      item.value = snapshot.data()
      console.log("success" + item.value)
    } else {
      console.log("Document does not exist")
    }

  } catch (error) {
    console.log(error)
  }
})

let chosenColour = ref("Black")

let subTab = ref("Specification")
function changeSubTab(e) {
  subTab.value = e
  console.log(e)
  console.log(subTab.value)
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

            <div class="col-md-4 col-6 mb-3">
              <label class="mb-2 d-block">Sub-total</label>
              <!-- add stock count to db -->
              <div class="input-group mb-3" style="width: 120px;">
                <input type="text" class="form-control text-center border border-secondary" :value="((item.Price * currencyRate * quant) - (item.Price * currencyRate *
                  (discount * quant))).toLocaleString(undefined, { style: 'currency', currency: currencyType })" />
              </div>
            </div>
            <div class="col-md-6">
              <a class="btn btn-success" style="margin-right:5px"> Add to Basket </a>
              <a class="btn btn-primary" style="margin-right:5px"> Save to Wishlist </a>
            </div>
          </div>
        </div>

        <div id="productRecs">
          <p>Lets write something here to see if its working now</p>
          
        </div>
      </div>
      <!-- content -->

      <div id="productBottom">
        <div class="container">
          <div class="row gx-4">
            <div class="col-lg-4 mb-8"></div>
            <div class="col-lg-8 mb-4">
              <div class="border rounded-2 px-3 py-2 bg-white">

                <div class="input-group" @change="changeSubTab($event.target.value)">
                  <input type="radio" class="btn-check">
                  <label class="btn btn-secondary" value="Specification">Specification</label>
                  <input type="radio" class="btn-check">
                  <label class="btn btn-secondary" value="">Something</label>
                  <input type="radio" class="btn-check">
                  <label class="btn btn-secondary" value="Something Else">Something Else</label>
                  <input type="radio" class="btn-check">
                  <label class="btn btn-secondary" for="option4">Something Else 2</label>
                </div>


                <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                  <li class="nav-item d-flex" role="presentation">
                    <a class="nav-link d-flex align-items-center justify-content-center w-100 active" id="ex1-tab-1"
                      data-bs-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1"
                      aria-selected="true">Specification</a>
                  </li>
                  <li class="nav-item d-flex" role="presentation">
                    <a class="nav-link d-flex align-items-center justify-content-center w-100" id="ex1-tab-2"
                      data-bs-toggle="pill" href="#ex1-pills-2" role="tab" aria-controls="ex1-pills-2"
                      aria-selected="false">Warranty info</a>
                  </li>
                  <li class="nav-item d-flex" role="presentation">
                    <a class="nav-link d-flex align-items-center justify-content-center w-100" id="ex1-tab-3"
                      data-bs-toggle="pill" href="#ex1-pills-3" role="tab" aria-controls="ex1-pills-3"
                      aria-selected="false">Shipping info</a>
                  </li>
                  <div v-if="item.Categories == 'Bedding and Substrate'">
                    <li class="nav-item d-flex" role="presentation">
                      <a class="nav-link d-flex align-items-center justify-content-center w-100" id="ex1-tab-4"
                        data-bs-toggle="pill" href="#ex1-pills-4" role="tab" aria-controls="ex1-pills-4"
                        aria-selected="false">Choosing your substrate</a>
                    </li>
                  </div>
                </ul>

                <div class="tab-content" id="ex1-content">
                  <div class="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                    <p>
                      With supporting text below as a natural lead-in to additional content. Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                      nulla
                      pariatur.
                    </p>
                    <div class="row mb-2">
                      <div class="col-12 col-md-6">
                        <ul class="list-unstyled mb-0">
                          <li><i class="fas fa-check text-success me-2"></i>Some great feature name here</li>
                          <li><i class="fas fa-check text-success me-2"></i>Lorem ipsum dolor sit amet, consectetur</li>
                          <li><i class="fas fa-check text-success me-2"></i>Duis aute irure dolor in reprehenderit</li>
                          <li><i class="fas fa-check text-success me-2"></i>Optical heart sensor</li>
                        </ul>
                      </div>
                      <div class="col-12 col-md-6 mb-0">
                      <ul class="list-unstyled">
                        <li><i class="fas fa-check text-success me-2"></i>Easy fast and ver good</li>
                        <li><i class="fas fa-check text-success me-2"></i>Some great feature name here</li>
                        <li><i class="fas fa-check text-success me-2"></i>Modern style and design</li>
                      </ul>
                    </div>
                  </div>
                  <table class="table border mt-3 mb-2">
                    <tr>
                      <th class="py-2">Display:</th>
                      <td class="py-2">13.3-inch LED-backlit display with IPS</td>
                    </tr>
                    <tr>
                      <th class="py-2">Processor capacity:</th>
                      <td class="py-2">2.3GHz dual-core Intel Core i5</td>
                    </tr>
                    <tr>
                      <th class="py-2">Camera quality:</th>
                      <td class="py-2">720p FaceTime HD camera</td>
                    </tr>
                    <tr>
                      <th class="py-2">Memory</th>
                      <td class="py-2">8 GB RAM or 16 GB RAM</td>
                    </tr>
                    <tr>
                      <th class="py-2">Graphics</th>
                      <td class="py-2">Intel Iris Plus Graphics 640</td>
                    </tr>
                  </table>
                </div>
                <div class="tab-pane fade mb-2" id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                  Tab content or sample information now <br />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                </div>
                <div class="tab-pane fade mb-2" id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                  Another tab content or sample information now <br />
                  Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt
                  mollit anim id est laborum.
                </div>
                <div class="tab-pane fade mb-2" id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-4">
                  Some other tab content or sample information now <br />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </div>
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
    </div>
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
    width: 100%;
  }
}

@media screen and (min-width: 769px) {
  #productRecs {
    border: solid 1px lightgrey;
    border-radius: 15px;
    width: 16.666%;
    padding-left: 5px;
  }
}
</style>