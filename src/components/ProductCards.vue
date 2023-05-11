<script setup>
let variables = defineProps({
  itemsDisplay: {
    type: Object
  },
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
    type: String,
    default: "GBP"
  },
  currencyRate: {
    type: String,
    default: "1"
  }
})
</script>

<template>
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
        <p class="card-text">{{ item.Description.substring(0, 80) }}...</p>
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
</template>

<style></style>