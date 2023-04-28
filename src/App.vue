<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { firebaseFireStore, firebaseAuthentication, onAuthStateChanged, signOut } from '@/firebase/database'
import { collection, getDocs } from 'firebase/firestore';

import { useRouter } from 'vue-router'
import Navigation from '@/components/Navigation.vue'

const router = useRouter()

const user = ref(null)
const errorLogout = ref(null)

let previousPage = router.options.history.state.back
let currentPage = ref(router.currentRoute.value.name)

window.addEventListener("offline", (e) => {
  router.push("/offline")
})

window.addEventListener("online", (e) => {
  if (previousPage == "/" || previousPage == "offline") {
    router.push("/")
  }
  else {
    router.back()
  }
})

onAuthStateChanged(firebaseAuthentication, (currentUser) => {
  if (currentUser) {
    user.value = currentUser
  } else {
    user.value == null
  }
})

function logout() {
  signOut(firebaseAuthentication).then(
    () => {
      user.value = null
      router.push("/login")
    },
    (error) => {
      errorLogout.value = error.message
    }
  )
}

function home() {
  router.push('/')
}

const userItems = ref([])
onMounted(async () => {
  const querySnapshot = await getDocs(collection(firebaseFireStore, "Users"));
  let fbUsers = [];
  querySnapshot.forEach((doc) => {
    const user = {
      id: doc.id,
      Firstname: doc.data().Firstname,
      Surname: doc.data().Surname,
      Email: doc.data().Email,
      DOB: doc.data().DOB
    }
    fbUsers.push(user);
  })
  userItems.value = fbUsers;
})

const saleItems = ref([])
onMounted(async () => {
  const querySnapshot = await getDocs(collection(firebaseFireStore, "SaleItems"));
  let SaleItems = [];
  querySnapshot.forEach((doc) => {
    const saleItem = {
      id: doc.id,
      Title: doc.data().Title,
      Description: doc.data().Description,
      Tags: doc.data().Tags,
      Price: doc.data().Price,
      Dimensions: doc.data().Dimensions,
      ImageMain: doc.data().ImageMain,
      Images: doc.data().Images,
    }
    SaleItems.push(saleItem);
  })
  saleItems.value = SaleItems;
})

let currencyType = ref("GBP")
function changeCurrency(selectedCurrency) {
  currencyType.value = selectedCurrency
}
</script>

<template>
  <Navigation :userItems="userItems" @change-currency="changeCurrency" @logout="logout" /> 
  <RouterView :userItems="userItems" :saleItems="saleItems" :currencyType="currencyType" :key="reloadKey"/>
</template>

<style>
.onPage {
  padding-top: 70px;
}
.dataTablePage {
  width: 96%;
  padding-left: 2%;
}
</style>