<script setup>
import { ref, computed } from "vue"

let searchTerm = ref("")

</script>

<template>
  <ul class="navbar-nav">
    <input autocomplete="off" type="search" 
      v-model="searchTerm"
      @change="$emit('changeSearch', $event.target.value)"
      class="search" placeholder='Search'/>
  </ul> 
</template>

<style>
#searchButton{
  border: 1px solid;
  background-color: transparent;
  position: relative;
  top: -1px;
  right: 0px;
}
.search{
  border-radius: 5px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
</style>