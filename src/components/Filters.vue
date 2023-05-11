<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Search from '../components/Search.vue'

let variables = defineProps({
  // user: {
  //   type: Object
  // },
  // userItems: {
  //   type: Object,
  //   default: () => { }
  // },
  itemsFound: {
    type: Object,
    default: () => { }
  },
  saleItems: {
    type: Object,
    default: () => { }
  },
  currencyType: {
    type: String,
    default: "GBP"
  },
  currencyRate: {
    type: String,
    default: "1"
  }
})

const itemsToFilter = ref(variables.saleItems)

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
      category = category.substring(0, category.length - 6)
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
  itemsToFilter.value = newFilteredResults
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
  itemsToFilter.value = variables.saleItems
}

</script>

<template>
  <button class="btn btn-outline-secondary w-100 d-lg-none show-filters" type="button" data-bs-toggle="collapse"
    data-bs-target="#saleFilters" aria-controls="saleFilters" aria-expanded="false" aria-label="Toggle navigation">
    <span>Show filters</span>
  </button>

  <Search @change-search="changeSearch" />

  <div class="collapse card d-lg-block mb-5" id="saleFilters">
    <div class="accordion" id="saleFiltersSide">
      <button type="button" class="btn btn-white w-100 border border-secondary"
        @click="applyAllFilters(), $emit('updateItemsFound', itemsToFilter), $emit('showPerPage')">Apply
        and Search</button>
      <button type="button" class="btn btn-white w-100 border border-secondary"
        @click="clearAllFilters(), $emit('updateItemsFound', itemsToFilter), $emit('showPerPage')">Clear
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
              <input class="form-check-input categoryCheck" type="checkbox" value="" id="AccessoriesCheck" checked />
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
              <input class="form-check-input categoryCheck" type="checkbox" value="" id="EnclosuresCheck" checked />
              <label class="form-check-label" for="EnclosuresCheck">
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
        <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse show" aria-labelledby="headingThree">
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
</template>

<style></style>