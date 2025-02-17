<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Filters from '../components/Filters.vue';
import DashHead from '../components/DashHead.vue';
import ProductCards from '../components/ProductCards.vue';
import Pagination from '../components/Pagination.vue';

let router = useRouter();

let variables = defineProps({
  purchaseItems: {
    type: Object
  }
});
</script>

<template>
  <h1>PAYMENT SUCCESS</h1>
  {{ purchaseItems }}
</template>

<style></style>
