<script setup>
import { ref } from 'vue'

let variables = defineProps({
  itemsFound: {
    type: Object
  },
})

const perPageValue = ref(variables.itemsFound.length)
</script>

<template>
  <!-- header of main dashboard, responsible for sorting
     and showing number of results per page -->
  <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
    <strong class="d-block py-2">{{ itemsFound.length }} Items Found </strong>
    <div class="ms-auto">
      <label style="margin-right: 5px">Per Page:</label>
      <select class="form-select d-inline-block w-auto border pt-1" style="width: 80px; margin-right: 5px;"
        v-model="perPageValue"
        @change="$emit('changePerPage', perPageValue), $emit('changePage', 1), $emit('showPerPage')">
        <option value="1">9</option>
        <option value="2">18</option>
        <option value="3">27</option>
        <option :value="itemsFound.length">All</option>
      </select>

      <label style="margin: 0px 5px 0px 5px">Sort By:</label>
      <select class="form-select d-inline-block w-auto border pt-1" style="margin-right: 5px; width: 70px"
        @change="$emit('changePerPage', perPageValue), $emit('sortResults', $event.target.value)">
        <option value="No Sort" selected>No Sort</option>
        <option value="Low - High">Price Low - High</option>
        <option value="High - Low">Price High - Low</option>
      </select>
    </div>
  </header>
</template>

<style></style>