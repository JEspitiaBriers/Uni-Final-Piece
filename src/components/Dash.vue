<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Search from '../components/Search.vue'

let router = useRouter()

let variables = defineProps({
  user: {
    type: Object
  },
  userItems: {
    type: Object,
    default: () => { }
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

const itemsDisplay = ref(variables.saleItems)
const itemsFound = ref(variables.saleItems)
const perPage = ref(itemsFound.value.length)
const pageCount = ref(Math.ceil(itemsFound.value.length / perPage.value))
const currentPage = ref(1)
//Search variables/functions
const searchTerm = ref("")

function changeSearch(searchTermInput) {
  searchTerm.value = searchTermInput
  applyAllFilters()
}

//Category filter variables/functions
const categoriesSelected = ref([])
function filterCategories() {
  categoriesSelected.value = []
  let categoryArray = document.getElementsByClassName('categoryCheck')
  for (let i = 0; i < categoryArray.length; i++) {
    if (categoryArray[i].checked) {
      let category = (categoryArray[i].id).replace(/([A-Z])/g, ' $1').trim()
      console.log(category)
      category = category.substring(0, category.length - 6)
      console.log(category)
      categoriesSelected.value.push(category)
    }
  }
}

//Size filter variables/functions
const areaSelected = ref([])
const heightSelected = ref([])
function filterSizes(e) {
  areaSelected.value = []
  let areaArray = document.getElementsByClassName('areaCheck')
  for (let i = 0; i < areaArray.length; i++) {
    if (areaArray[i].checked) {
      let size = (areaArray[i].id).replace(/([A-Z])/g, ' $1').trim()
      size = size.substring(0, size.length - 6)
      areaSelected.value.push(size)
    }
  }

  heightSelected.value = []
  let heightArray = document.getElementsByClassName('heightCheck')
  for (let i = 0; i < heightArray.length; i++) {
    if (heightArray[i].checked) {
      let size = (heightArray[i].id).replace(/([A-Z])/g, ' $1').trim()
      size = size.substring(0, size.length - 6)
      heightSelected.value.push(size)
    }
  }
}

//Price filter variables/functions
const minPriceValue = ref(1)
const maxPriceValue = ref(1000)
const priceInputErrorMessage = ref("")
function checkPriceInputs() {
  if (isNaN(minPriceValue.value) || isNaN(maxPriceValue.value) || minPriceValue.value <= 0 || maxPriceValue.value <= 0) {
    priceInputErrorMessage.value = "Inputs must be valid numbers\n(greater than 0)"
    minPriceValue.value = "1"
    maxPriceValue.value = "1000"
  }
  else if (minPriceValue.value >= maxPriceValue.value) {
    priceInputErrorMessage.value = "Minimum value cannot be larger than \nor equal to Maximum value"
    minPriceValue.value = "1"
    maxPriceValue.value = "1000"
  }
  else {
    priceInputErrorMessage.value = ""
  }
}

function applyAllFilters() {
  checkPriceInputs()
  if (priceInputErrorMessage.value == "") {
    filterCategories()
    filterSizes()
    filterResults()
  }
}

function filterResults() {
  let newResults = []
  let newFilteredResults = []
  if (searchTerm.value != "") {
    for (let i = 0; i < variables.saleItems.length; i++) {
      let current = variables.saleItems[i]
      let searchUpper = Object.keys(current).reduce((accu, curr) => ({ ...accu, [curr]: (typeof current[curr] === "string") ? current[curr].toUpperCase() : current[curr] }), {})

      if (Object.values(searchUpper).some(check =>
        typeof check === "string" && check.includes(searchTerm.value.toUpperCase()))) {
        newResults.push(variables.saleItems[i])
      }
    }
  }
  else {
    newResults = variables.saleItems
  }

  newResults = newResults.filter(item => Number(item.Price) > minPriceValue.value)
  newResults = newResults.filter(item => Number(item.Price) < maxPriceValue.value)
  newResults = newResults.filter(item => categoriesSelected.value.includes(item.Categories))

  for (const item of newResults) {
    if (item.Categories == "Enclosures" &&
      areaSelected.value.some(area => item.Tags.includes(area)) &&
      heightSelected.value.some(height => item.Tags.includes(height))) {
      newFilteredResults.push(item)
    }
    else if (item.Categories != "Enclosures" &&
      (areaSelected.value.some(area => item.Tags.includes(area)) ||
        heightSelected.value.some(height => item.Tags.includes(height)))) {
      newFilteredResults.push(item)
    }
  }
  itemsFound.value = newFilteredResults
  showPerPage()
}

function clearAllFilters() {
  searchTerm.value = ""
  let categoryArray = document.getElementsByClassName('categoryCheck')
  for (let i = 0; i < categoryArray.length; i++) {
    categoryArray[i].checked = true
  }
  let sizeArray = document.getElementsByClassName('sizeCheck')
  for (let i = 0; i < sizeArray.length; i++) {
    sizeArray[i].checked = true
  }
  minPriceValue.value = 1
  maxPriceValue.value = 1000
  itemsFound.value = variables.saleItems
  showPerPage()
}

function sortResults(e) {
  if (e == "High - Low") {
    itemsFound.value.sort((first, second) => second.Price - first.Price)
    showPerPage()
  }
  else if (e == "Low - High") {
    itemsFound.value.sort((first, second) => first.Price - second.Price)
    showPerPage()
  }
}

function showPerPage() {
  if (perPage == itemsFound.value.length) {
    itemsDisplay.value = itemsFound.value
  }
  else {
    pageCount.value = Math.ceil(itemsFound.value.length / perPage.value)
    itemsDisplay.value = itemsFound.value.slice((currentPage.value - 1) * perPage.value,
      ((currentPage.value - 1) * perPage.value) + parseInt(perPage.value))
  }
}

function buyNow(id) {
  console.log(id)
  router.push({ name: 'Payment', params: { id: id, currencyRate: variables.currencyRate, currencyType: variables.currencyType } })
}

function addToBasket(item) {

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
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <div class="row">
        <div class="col-lg-3">
          <button class="btn btn-outline-secondary w-100 d-lg-none show-filters" type="button" data-bs-toggle="collapse"
            data-bs-target="#saleFilters" aria-controls="saleFilters" aria-expanded="false"
            aria-label="Toggle navigation">
            <span>Show filters</span>
          </button>

          <Search @change-search="changeSearch" />

          <!-- Collapsible wrapper -->
          <div class="collapse card d-lg-block mb-5" id="saleFilters">
            <div class="accordion" id="saleFiltersSide">
              <button type="button" class="btn btn-white w-100 border border-secondary" @click="applyAllFilters()">Apply
                and Search</button>
              <button type="button" class="btn btn-white w-100 border border-secondary" @click="clearAllFilters()">Clear
                All Filters</button>
              <div class="accordion-item">
                <h2 class="accordion-header" id="categoriesButton">
                  <button class="accordion-button text-dark bg-light" type="button" data-bs-toggle="collapse"
                    data-bs-target="#categoriesCollapse" aria-expanded="true" aria-controls="categoriesCollapse">
                    Categories
                  </button>
                </h2>
                <div id="categoriesCollapse" class="accordion-collapse collapse show" aria-labelledby="categoriesButton">
                  <div class="accordion-body">
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="AccessoriesCheck"
                        checked />
                      <label class="form-check-label" for="AccessoriesCheck">
                        Accessories
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="BaskingAndHydratingCheck"
                        checked />
                      <label class="form-check-label" for="BaskingAndHydratingCheck">
                        Basking and Hydrating
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="BeddingAndSubstrateCheck"
                        checked />
                      <label class="form-check-label" for="BeddingAndSubstrateCheck">
                        Bedding and Substrate
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="EnclosuresCheck"
                        checked />
                      <label class="form-check-label" for="EnclosuresCheck">
                        Enclosures
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input categoryCheck" type="checkbox" value="" id="HeatAndLightCheck"
                        checked />
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
                      <input class="form-check-input areaCheck" type="checkbox" value="" id="LargeCheck" checked />
                      <label class="form-check-label" for="LargeCheck">
                        Large
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input areaCheck" type="checkbox" value="" id="MediumCheck" checked />
                      <label class="form-check-label" for="MediumCheck">
                        Medium
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input areaCheck" type="checkbox" value="" id="SmallCheck" checked />
                      <label class="form-check-label" for="SmallCheck">
                        Small
                      </label>
                    </div>
                    Height
                    <div class="form-check">
                      <input class="form-check-input heightCheck" type="checkbox" value="" id="TallCheck" checked />
                      <label class="form-check-label" for="TallCheck">
                        Tall
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input heightCheck" type="checkbox" value="" id="AverageCheck" checked />
                      <label class="form-check-label" for="AverageCheck">
                        Average
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input heightCheck" type="checkbox" value="" id="ShortCheck" checked />
                      <label class="form-check-label" for="ShortCheck">
                        Short
                      </label>
                    </div>
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
            <strong class="d-block py-2">{{ itemsFound.length }} Items Found </strong>
            <div class="ms-auto">
              <label style="margin-right: 5px">Per Page:</label>
              <select id="perPage" class="form-select d-inline-block w-auto border pt-1"
                style="width: 80px; margin-right: 5px;" v-model="perPage" @change="(currentPage = 1), $refs.btnradio1.checked = true, showPerPage()">
                <option value="1">9</option>
                <option value="2">18</option>
                <option value="3">27</option>
                <option :value="itemsFound.length">All</option>
              </select>

              <label style="margin: 0px 5px 0px 5px">Sort By:</label>
              <select class="form-select d-inline-block w-auto border pt-1" 
                style="margin-right: 5px; width: 70px"
                @change="sortResults($event.target.value)">
                <option value="No Sort" selected>No Sort</option>
                <option value="Low - High">Price Low - High</option>
                <option value="High - Low">Price High - Low</option>
              </select>
            </div>
          </header>

          <div class="row">
            <div v-for="item in itemsDisplay" :key="item.id" class="col-lg-4 col-md-6 col-sm-6 d-flex">
              <div class="card w-100 my-2 shadow-2-strong productCards">
                <!-- <img :src="item.ImageMain" :alt="item.Alt" class="card-img-top" /> -->
                <div class="card-body d-flex flex-column">
                  <div class="d-flex flex-row">
                    <h5 class="mb-1 me-1"><router-link
                        :to="{ name: 'Product', params: { id: item.id, currencyRate: currencyRate, currencyType: currencyType } }">{{
                          item.Title }}</router-link></h5>
                    <br>
                  </div>
                  <p class="card-text">{{ item.Description }}</p>
                  <p class="card-text">{{ item.Dimensions }}</p>
                  <h5>{{ (item.Price * currencyRate).toLocaleString(
                    undefined, { style: "currency", currency: currencyType })
                  }}</h5>
                  <div class="card-footer d-flex align-items-end pt-2 px-2 pb-2 mt-auto">
                    <button class="btn btn-success" style="margin: auto">
                      <router-link style="text-decoration: none; color: white;"
                        :to="{ name: 'Payment', params: { id: item.id, currencyRate: currencyRate, currencyType: currencyType } }">
                        Buy Now
                      </router-link>
                    </button>
                    <button class="btn btn-primary" @click="addToBasket(item.id)">Add to Basket</button>
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
          <hr />

          <!-- Pagination -->
          <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input class="btn-check" type="radio" name="btnradio" id="btnradio1" ref="btnradio1" checked @click="(currentPage = 1), showPerPage()">
              <label class="btn btn-outline-success" for="btnradio1">1</label>
              <template v-for="index in pageCount - 1">
                <input class="btn-check" type="radio" name="btnradio" :id="'btnradio' + (index + 1)" @click="(currentPage = index + 1), showPerPage()">
                <label class="btn btn-outline-success" :for="'btnradio' + (index + 1)">{{ index + 1 }}</label>
              </template>
            </div>
          </nav>
          <!-- Pagination -->
        </div>
      </div>
      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    </div>
    <!-- Footer -->
    <footer class="text-center text-lg-start text-muted mt-3">
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

footer {
  background-color: #157347;
}

a {
  color: #157347;
  text-decoration: none;
}
</style>