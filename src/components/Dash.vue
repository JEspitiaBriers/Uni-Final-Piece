<script setup>
/*

find language translator api and possibly implement website translation



*/
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import Search from '../components/Search.vue'

let variables = defineProps({
  user: {
    type: Object,
    default: () => { }
  },
  saleItems: {
    type: Object,
    default: () => { }
  },
  currencyType: {
    type: String
  }
})

let itemsFound = variables.saleItems.length

let myHeaders = new Headers();
myHeaders.append("apikey", "wFtoAuudktssS0qgvj1oSNZ2Uy0qsUMI"); //encrypt the key

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

//const currentRate = getCurrentRate(variables.currencyType) //for sake of free subscription, limit request count to 4
let currencyRate = ref(1)

async function getCurrentRate(currencyType) {
  if (currencyType != 'GBP') {
    let currencyData;
    console.log("Called and is " + currencyType)

    document.getElementById("loadingCurrency").style.display = "block";
    document.getElementById("fade").style.opacity = "25%";

    const currencyResponse = await fetch("https://api.apilayer.com/exchangerates_data/convert?to=" + currencyType + "&from=GBP&amount=1", requestOptions)
    /*
      while there is no reponse, show popup window that says loading
    */
    currencyData = await currencyResponse.json()

    document.getElementById("loadingCurrency").style.display = "none";
    document.getElementById("fade").style.opacity = "100%";

    console.log("plain" + currencyData)
    console.log(".value " + currencyData.value)
    console.log(".result " + currencyData.result)

    currencyRate.value = currencyData.result
  }
  else {
    console.log("Called but is GBP")
    return "1"
  }
}

//Search variables/functions
let searchTerm = ref("")

function changeSearch(searchTermInput) {
  searchTerm.value = searchTermInput
  filterResults()
}

//Category filter variables/functions
let categoriesSelected = ref([])

function filterCategories() {
  let categoryArray = document.getElementsByClassName('categoryCheck')
  for (let i = 0; i < categoryArray.length; i++){
    if (categoryArray[i].checked) {
      let category = (categoryArray[i].id).replace(/([A-Z])/g, ' $1').trim()
      console.log(category)
      category = category.substring(0, category.length - 6)
      categoriesSelected.value.push(category)
      console.log(categoryArray[i].id + " checked")
    }
    else {
      console.log(categoryArray[i].id + " unchecked")
    }
  }
  console.log(categoriesSelected.value)
  filterResults()
}

//Size filter variables/functions
let sizesSelected = ref([])

function filterSizes(e) {
  let sizeArray = document.getElementsByClassName('sizeCheck')
  for (let i = 0; i < sizeArray.length; i++) {
    if (sizeArray[i].checked) {
      let size = (sizeArray[i].id).replace(/([A-Z])/g, ' $1').trim()
      console.log(size)
      size = size.substring(0, size.length - 6)
      sizesSelected.value.push(size)
      console.log(sizeArray[i].id + " checked")
    }
    else {
      console.log(sizeArray[i].id + " unchecked")
    }
  }
  console.log(sizesSelected.value)
  filterResults()
}

//Price filter variables/functions
let minPriceValue = ref("1")
let maxPriceValue = ref("1000")
let priceInputErrorMessage = ref("")

function checkPriceInputs() {
  console.log("called")
  if (isNaN(minPriceValue.value) || isNaN(maxPriceValue.value)) {
    priceInputErrorMessage.value = "Inputs must be valid numbers\n(greater than 0)"
    minPriceValue.value = "1"
    maxPriceValue.value = "1000"
    console.log(priceInputErrorMessage)
  }
  else if (minPriceValue.value >= maxPriceValue.value) {
    priceInputErrorMessage.value = "Minimum value cannot be larger than \nor equal to Maximum value"
    minPriceValue.value = "0"
    maxPriceValue.value = "1000"
    console.log(priceInputErrorMessage)
  }
  else {
    priceInputErrorMessage.value = ""
    filterResults()
  }
}

function applyAllFilters() {
  filterCategories()
  filterSizes()
  checkPriceInputs()
  filterResults()
}

function filterResults() {
  console.log("This is the filter function, it doesnt do anything yet")
  console.log("Search: " + searchTerm.value + "\nMin: " + minPriceValue.value +
    "\nMax " + maxPriceValue.value + "\nCategories: " + categoriesSelected.value + "\nSizes: " + sizesSelected.value)
  itemsFound = 0
}
</script>

<template >
  <div class="alert alert-info" id="loadingCurrency" role="alert">
    <h4 class="alert-heading">Currency Changed</h4>
    <p>You have selected {{ currencyType }}, so displayed prices will be changed accordingly.</p>
    <hr>
    <p class="mb-0">These changes are loading, please wait.</p>
  </div>

  <div class="onPage" id="fade">
    <div style="padding: 20px 5px 0px 5px">
      <!-- sidebar + content -->
      <!-- <section class=""> -->
      <div class="row">
        <!-- sidebar -->
        <div class="col-lg-3">
          <!-- Toggle button -->
          <button class="btn btn-outline-secondary w-100 d-lg-none show-filters" type="button" data-bs-toggle="collapse"
            data-bs-target="#saleFilters" aria-controls="saleFilters" aria-expanded="false"
            aria-label="Toggle navigation">
            <span>Show filters</span>
          </button>

          <Search @change-search="changeSearch" />
          {{ currencyType }}
          <button @click="getCurrentRate(currencyType)">check rate</button>

          <!-- Collapsible wrapper -->
          <div class="collapse card d-lg-block mb-5" id="saleFilters">
            <div class="accordion" id="saleFiltersSide">
              <button type="button" class="btn btn-white w-100 border border-secondary"
                @click="applyAllFilters()">Apply All Filters</button>
              <div class="accordion-item">
                <h2 class="accordion-header" id="categoriesButton">
                  <button class="accordion-button text-dark bg-light" type="button" data-bs-toggle="collapse"
                    data-bs-target="#categoriesCollapse" aria-expanded="true" aria-controls="categoriesCollapse">
                    {{ searchTerm }} Categories
                  </button>
                </h2>
                <div id="categoriesCollapse" class="accordion-collapse collapse show" aria-labelledby="categoriesButton">
                  <div class="accordion-body">
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="AccessoriesCheck" checked />
                      <label class="form-check-label" for="AccessoriesCheck">
                        Accessories
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="BaskingAndHydrationCheck" checked />
                      <label class="form-check-label" for="BaskingAndHydrationCheck">
                        Basking and Hydrating
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="BeddingAndSubstrateCheck" checked />
                      <label class="form-check-label" for="BeddingAndSubstrateCheck">
                        Bedding and Substrate
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="EnclosureCheck" checked />
                      <label class="form-check-label" for="EnclosureCheck">
                        Enclosures
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="HeatAndLightCheck" checked />
                      <label class="form-check-label" for="HeatAndLightCheck">
                        Heat and Light
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="HumidityCheck" checked />
                      <label class="form-check-label" for="HumidityCheck">
                        Humidity
                      </label>
                    </div>
                  </div>
                  <!-- add all checkboxes to form so they can be submitted -->
                  <button type="button" class="btn btn-white w-100 border border-secondary"
                    @click="filterCategories()">Apply</button>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button class="accordion-button text-dark bg-light" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseFour">
                    Size
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse show"
                  aria-labelledby="headingThree">
                  <div class="accordion-body">
                    Area
                    <div class="form-check">
                      <input class="form-check-input sizeCheck" type="checkbox" value="" id="LargeChack" checked />
                      <label class="form-check-label" for="LargeChack">
                        Large
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input sizeCheck" type="checkbox" value="" id="MediumCheck" checked />
                      <label class="form-check-label" for="MediumCheck">
                        Medium
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input sizeCheck" type="checkbox" value="" id="SmallCheck" checked />
                      <label class="form-check-label" for="SmallCheck">
                        Small
                      </label>
                    </div>
                    Height
                    <div class="form-check">
                      <input class="form-check-input sizeCheck" type="checkbox" value="" id="TallCheck" checked />
                      <label class="form-check-label" for="TallCheck">
                      Tall
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input sizeCheck" type="checkbox" value="" id="AverageCheck" checked />
                    <label class="form-check-label" for="AverageCheck">
                      Average
                    </label>
                  </div>
                    <div class="form-check">
                      <input class="form-check-input sizeCheck" type="checkbox" value="" id="ShortCheck" checked />
                      <label class="form-check-label" for="ShortCheck">
                        Short
                      </label>
                    </div>
                    <!-- add all checkboxes to form so they can be submitted -->
                    <button type="button" class="btn btn-white w-100 border border-secondary"
                      @click="filterSizes()">Apply</button>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="priceButton">
                  <button class="accordion-button text-dark bg-light" type="button" data-bs-toggle="collapse"
                    data-bs-target="#priceCollapse" aria-expanded="false" aria-controls="priceCollapse">
                    Price
                  </button>
                </h2>
                <div id="priceCollapse" class="accordion-collapse collapse show" aria-labelledby="priceButton">
                  <div class="accordion-body">
                  <div class="row mb-3">
                    <div class="col-6">
                      <p class="mb-0">
                        Min
                      </p>
                      <div class="form-outline">
                        <input type="number" id="minPrice" v-model="minPriceValue" class="form-control" />
                        <label class="form-label" for="typeNumber">{{ (1).toLocaleString(
                          undefined, { style: "currency", currency: currencyType }) }}</label>
                        </div>
                      </div>
                      <div class="col-6">
                        <p class="mb-0">
                          Max
                        </p>
                        <div class="form-outline">
                          <input type="number" id="maxPrice" v-model="maxPriceValue" class="form-control" />
                          <label class="form-label" for="typeNumber">{{ (1000 * currencyRate).toLocaleString(
                            undefined, { style: "currency", currency: currencyType }) }}</label>
                        </div>
                      </div>
                    </div>
                    <p>{{ priceInputErrorMessage }}</p>
                    <button type="button" class="btn btn-white w-100 border border-secondary"
                      @click="checkPriceInputs()">Apply</button>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="ratingButton">
                  <button class="accordion-button text-dark bg-light" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseFive">
                    Ratings
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse show"
                  aria-labelledby="ratingButton">
                  <div class="accordion-body">
                    <!-- Default checkbox -->
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label class="form-check-label" for="flexCheckDefault">
                        <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i
                          class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                      </label>
                    </div>
                    <!-- Default checkbox -->
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label class="form-check-label" for="flexCheckDefault">
                        <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i
                          class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-secondary"></i>
                      </label>
                    </div>
                    <!-- Default checkbox -->
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label class="form-check-label" for="flexCheckDefault">
                        <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i
                          class="fas fa-star text-warning"></i><i class="fas fa-star text-secondary"></i>
                        <i class="fas fa-star text-secondary"></i>
                      </label>
                    </div>
                    <!-- Default checkbox -->
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label class="form-check-label" for="flexCheckDefault">
                        <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i
                          class="fas fa-star text-secondary"></i><i class="fas fa-star text-secondary"></i>
                        <i class="fas fa-star text-secondary"></i>
                      </label>
                    </div>
                    <!-- add all checkboxes to form so they can be submitted -->
                    <button type="button" class="btn btn-white w-100 border border-secondary"
                      @click="filterResults()">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- sidebar -->
        <!-- content -->
        <div class="col-lg-9">
          <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
            <strong class="d-block py-2">{{ itemsFound }} Items Found </strong>
            <div class="ms-auto">
              <select class="form-select d-inline-block w-auto border pt-1">
                <option value="0">Best match</option>
                <option value="1">Recommended</option>
                <option value="2">High rated</option>
                <option value="3">Randomly</option>
              </select>
              <div class="btn-group shadow-0 border">
                <a href="#" class="btn btn-light" title="List view">
                  <i class="fa fa-bars fa-lg"></i>
                </a>
                <a href="#" class="btn btn-light active" title="Grid view">
                  <i class="fa fa-th fa-lg"></i>
                </a>
              </div>
            </div>
          </header>

          <div class="row">
            <div v-for="item in saleItems" :key="item.id">
              <!--
                  <div v-if="item.sale">
                    //add banner to card
                  <div>
                  <div v-else>
                    //dont add banner to card
                  </div>
                  v-if card is on sale, add banner (see Scan.co.uk today only offer)

                -->


              <div class="col-lg-4 col-md-6 col-sm-6 d-flex">
                <div class="card w-100 my-2 shadow-2-strong">
                  <img :src="item.ImageMain" :alt="item.Alt" class="card-img-top" />
                  <div class="card-body d-flex flex-column">
                    <div class="d-flex flex-row">
                      <h5 class="mb-1 me-1"><router-link
                          :to="{ name: 'Product', params: { id: item.id, currencyRate: currencyRate, currencyType: currencyType } }">{{
                            item.Title }}</router-link></h5>
                      <br>
                      <h6>{{ (item.Price * currencyRate).toLocaleString(
                        undefined, { style: "currency", currency: currencyType })
                      }}</h6>
                    </div>
                    <p class="card-text">{{ item.Description }}</p>
                    <p class="card-text">{{ item.Dimensions }}</p>
                    <p hidden>{{ item.Tags }}</p>
                    <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                      <a href="#!" class="btn btn-success shadow-0 me-1">Buy Now</a>
                      <a href="#!" class="btn btn-primary shadow-0 me-1">Add to Basket</a>
                      <!-- 
                        Call addToBasket()
                        Call buyNow()
                        Try to add these functions into a js file, 
                          because they are needed by multiple pages
                        See Fedaas getGeneIdInfo() in AWebD Project
                       -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <!-- Pagination -->
          <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
            <ul class="pagination">
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          <!-- Pagination -->
        </div>
      </div>
      <!-- </section> -->
      <!-- sidebar + content -->
    </div>
    <!-- Footer -->
    <footer class="text-center text-lg-start text-muted bg-primary mt-3">
      <!-- Section: Links  -->
      <section class="">
        <div class="text-center text-md-start pt-4 pb-4">
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-12 col-lg-3 col-sm-12 mb-2">
              <!-- Content -->
              <a href="" class="text-white h2">
                Reptiles Recluse
              </a>
              <p class="mt-1 text-white">
                © 2023 Copyright: currently no copyright
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-6 col-sm-4 col-lg-2">
              <!-- Links -->
              <h6 class="text-uppercase text-white fw-bold mb-2">
                Store
              </h6>
              <ul class="list-unstyled mb-4">
                <li><a class="text-white-50" href="#">About us</a></li>
                <li><a class="text-white-50" href="#">Find store</a></li>
                <li><a class="text-white-50" href="#">Categories</a></li>
                <li><a class="text-white-50" href="#">Blogs</a></li>
              </ul>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-6 col-sm-4 col-lg-2">
              <!-- Links -->
              <h6 class="text-uppercase text-white fw-bold mb-2">
                Information
              </h6>
              <ul class="list-unstyled mb-4">
                <li><a class="text-white-50" href="#">Help center</a></li>
                <li><a class="text-white-50" href="#">Money refund</a></li>
                <li><a class="text-white-50" href="#">Shipping info</a></li>
                <li><a class="text-white-50" href="#">Refunds</a></li>
              </ul>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-6 col-sm-4 col-lg-2">
              <!-- Links -->
              <h6 class="text-uppercase text-white fw-bold mb-2">
                Support
              </h6>
              <ul class="list-unstyled mb-4">
                <li><a class="text-white-50" href="#">Help center</a></li>
                <li><a class="text-white-50" href="#">Documents</a></li>
                <li><a class="text-white-50" href="#">Account restore</a></li>
                <li><a class="text-white-50" href="#">My orders</a></li>
              </ul>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-12 col-sm-12 col-lg-3">
              <!-- Links -->
              <h6 class="text-uppercase text-white fw-bold mb-2">Newsletter</h6>
              <p class="text-white">Stay in touch with latest updates about our products and offers</p>
              <div class="input-group mb-3">
                <input type="email" class="form-control border" placeholder="Email" aria-label="Email"
                  aria-describedby="button-addon2" />
                <button class="btn btn-light border shadow-0" type="button" id="button-addon2"
                  data-bs-ripple-color="dark">
                  Join
                </button>
              </div>
            </div>
            <!-- Grid column -->
          </div>
          <!-- Grid row -->
        </div>
      </section>
      <!-- Section: Links  -->

      <div class="">
        <div class="">
          <div class="d-flex justify-content-between py-4 border-top">
            <!--- payment --->
            <div>
              <i class="fab fa-lg fa-cc-visa text-white"></i>
              <i class="fab fa-lg fa-cc-amex text-white"></i>
              <i class="fab fa-lg fa-cc-mastercard text-white"></i>
              <i class="fab fa-lg fa-cc-paypal text-white"></i>
            </div>
            <!--- payment --->
          </div>
        </div>
      </div>
    </footer>
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
</style>