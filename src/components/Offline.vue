<template>
  <div class="onPage">
  <h1>Oh No! It appears you're offline...</h1>
  <p>
    The page will reload when your connected again.
    <br />
    Dont worry, you will be redirected to the {{ previousPage }} page when reconnected.
  </p>
  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router'

let router = useRouter()

let previousPage = router.options.history.state.back

if (navigator.onLine) {
  router.push("/")
}

if (previousPage == "/" || previousPage == "Offline" || !previousPage) {
  previousPage = "Home"
}
else {
  previousPage = previousPage.substring(1).charAt(0).toUpperCase() + previousPage.slice(2)
}

// console.log(previousPage)
console.log(router.currentRoute.value.name)
// console.log(router.name)
// console.log(navigator.onLine)

</script>
  
<style scoped>
</style>