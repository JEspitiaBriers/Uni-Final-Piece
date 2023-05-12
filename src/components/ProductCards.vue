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
      <img :src="item.ImageMain" :alt="item.Alt" class="card-img-top" style="border-bottom: 2px solid #157347"/>
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
        <!-- <div class="card-footer d-flex align-items-end pt-2 px-2 pb-2 mt-auto">
          <router-link style="text-decoration: none; color: white; margin:auto;"
            :to="{ name: 'Payment', params: { id: item.StripePriceId.substring(6), currencyRate: currencyRate, currencyType: currencyType } }">
            <button class="btn btn-success">
              Buy Now
            </button>
          </router-link>
          <button class="btn btn-primary" @click="addToBasket(item.id)">Add to Basket</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style></style>