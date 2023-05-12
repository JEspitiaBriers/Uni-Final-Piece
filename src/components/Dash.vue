<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Filters from '../components/Filters.vue'
import DashHead from '../components/DashHead.vue'
import ProductCards from '../components/ProductCards.vue'
import Pagination from '../components/Pagination.vue'

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

/**
 * below is a series of functions which are emitted by
 *  the child components. they alter the way the items are displayed
 * by filtering and sorting
 */
const itemsDisplay = ref(variables.saleItems)
const itemsFound = ref(variables.saleItems)
function updateItemsFound(updatedItems) {
  itemsFound.value = updatedItems
}
const perPage = ref(itemsFound.value.length)
const pageCount = ref(Math.ceil(itemsFound.value.length / perPage.value))

const perPageCount = ref(variables.saleItems.length)
function changePerPage(perPageValue) {
  perPageCount.value = perPageValue
}

const currentPage = ref(1)
function changePage(pageValue) {
  currentPage.value = pageValue
  showPerPage()
}

function sortResults(sortValue) {
  if (sortValue == "High - Low") {
    itemsFound.value.sort((first, second) => second.Price - first.Price)
    showPerPage()
  }
  else if (sortValue == "Low - High") {
    itemsFound.value.sort((first, second) => first.Price - second.Price)
    showPerPage()
  }
}

function showPerPage() {
  perPage.value = perPageCount.value
  if (perPage.value == itemsFound.value.length) {
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
</script>

<template >
  <!-- if the user change currency, this alert appears while api call is awaiting -->
  <div class="alert alert-info" id="loadingCurrency" role="alert">
    <h4 class="alert-heading">Currency Changed</h4>
    <p>You have selected {{ currencyType }}, so displayed prices will be changed accordingly.</p>
    <hr>
    <p class="mb-0">These changes are loading, please wait.</p>
  </div>

  <!-- building dashboard from smaller components -->
  <div class="onPage" id="fade">
    <div style="padding: 20px 5px 0px 5px">
      <div class="row">
        <div class="col-lg-3">
          <Filters :itemsFound="itemsFound" :saleItems="saleItems" :currencyType="currencyType"
            :currencyRate="currencyRate" @update-items-found="updateItemsFound" @show-per-page="showPerPage" />
        </div>
        <div class="col-lg-9">
          <DashHead :itemsFound="itemsFound" @change-page="changePage" @show-per-page="showPerPage"
            @sort-results="sortResults" @change-per-page="changePerPage" />
          <div class="row">
            <ProductCards :itemsDisplay="itemsDisplay" :currencyType="currencyType" :currencyRate="currencyRate" />
          </div>
        </div>

        <hr />

        <Pagination :pageCount="pageCount" @change-page="changePage" @show-per-page="showPerPage" />
      </div>
    </div>
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