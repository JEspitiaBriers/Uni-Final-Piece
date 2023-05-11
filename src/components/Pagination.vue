<script setup>
let variables = defineProps({
  pageCount: {
    type: Number
  },
})
</script>

<template>
  <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input class="btn-check pageBtn" type="radio" name="pageBtn" id="pageBtn1" checked
        @click="$emit('changePage', 1), $emit('showPerPage')"> 
      <label class="btn btn-outline-success" for="pageBtn1">1</label>
      <template v-for="index in pageCount - 1">
        <input class="btn-check pageBtn" type="radio" name="pageBtn" :id="'pageBtn' + (index + 1)"
          @click="$emit('changePage', index + 1), $emit('showPerPage')">
        <label class="btn btn-outline-success" :for="'pageBtn' + (index + 1)">{{ index + 1 }}</label>
      </template>
    </div>
  </nav>
</template>

<style></style>