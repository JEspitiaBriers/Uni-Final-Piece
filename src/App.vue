<script setup>
import { ref, onMounted } from 'vue'
import { firebaseFireStore, firebaseAuthentication, onAuthStateChanged, signOut } from '@/firebase/database'
import { collection, getDocs } from 'firebase/firestore';

import { useRouter } from 'vue-router'
import Navigation from '@/components/Navigation.vue'

let loaded = false

const router = useRouter()

const user = ref(null)
const errorLogout = ref(null)

let previousPage = router.options.history.state.back

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

const saleItems = ref([])
onMounted(async () => {
  const querySnapshot = await getDocs(collection(firebaseFireStore, "SaleItems"))
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
      Categories: doc.data().Categories
    }
    SaleItems.push(saleItem)
  })
  saleItems.value = SaleItems
  loaded = true
})

const userItems = ref([])
onMounted(async () => {
  const querySnapshot = await getDocs(collection(firebaseFireStore, "Users"))
  let fbUsers = [];
  querySnapshot.forEach((doc) => {
    const user = {
      id: doc.id,
      Firstname: doc.data().Firstname,
      Surname: doc.data().Surname,
      Email: doc.data().Email,
      DOB: doc.data().DOB
    }
    fbUsers.push(user)
  })
  userItems.value = fbUsers
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

let myHeaders = new Headers();
myHeaders.append("apikey", "wFtoAuudktssS0qgvj1oSNZ2Uy0qsUMI"); //encrypt the key

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

let currencyType = ref("GBP")
let currencyRate = ref(1)

async function changeCurrency(selectedCurrency) {
  currencyType.value = selectedCurrency

  if (currencyType != 'GBP' && typeof currencyType !== 'undefined') {
    let currencyData;
    console.log("Called and is " + currencyType)

    document.getElementById("loadingCurrency").style.display = "block";
    document.getElementById("fade").style.opacity = "25%";

    const currencyResponse = await fetch("https://api.apilayer.com/exchangerates_data/convert?to=" + currencyType.value + "&from=GBP&amount=1", requestOptions)

    currencyData = await currencyResponse.json()

    document.getElementById("loadingCurrency").style.display = "none";
    document.getElementById("fade").style.opacity = "100%";

    currencyRate.value = currencyData.result
  }
  else {
    return "1"
  }
}
</script>

<template>
  <Navigation :userItems="userItems" @change-currency="changeCurrency" @logout="logout" /> 
  <div v-if="loaded">
    <RouterView :userItems="userItems" :saleItems="saleItems" :currencyType="currencyType" :currencyRate="currencyRate"/>
  </div>
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