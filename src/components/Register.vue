<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { validateEmail, checkPasswordLength } from '../assets/utils.js'

import {
  firebaseFireStore,
  firebaseAuthentication,
  createUserWithEmailAndPassword,
  updateProfile,
  serverTimestamp
} from '@/firebase/database'
import { collection, doc, setDoc, updateDoc, getDocs, addDoc } from '@firebase/firestore';

defineEmits(['register-clicked'])

const firstname = ref("")
const surname = ref("")
const DoB = ref("")
const email = ref("")
const password = ref("")
const passConfirm = ref("")
const registerMessage = ref("")

const router = useRouter()

function passwordToggle() {
  var passChecks = document.getElementsByClassName("passChecks");
  for (let i = 0; i < passChecks.length; i++) {
    if (passChecks[i].type === "password") {
      passChecks[i].type = "text";
    } else {
      passChecks[i].type = "password";
    }
  }
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// performs check to see if inputs are valid
async function register() {
  try {
    if (getAge(DoB.value) > 18) {
      if (password.value == passConfirm.value) {
        const { user } = await createUserWithEmailAndPassword(firebaseAuthentication, email.value, password.value)
        setDoc(doc(firebaseFireStore, 'Users', user.uid), {
          Firstname: firstname.value,
          Surname: surname.value,
          Email: email.value,
          DOB: DoB.value,
          Basket: [],
          Created: serverTimestamp()
        })
          .then(() =>
            updateProfile(firebaseAuthentication.currentUser, {
              firstName: firstname.value,
              surname: surname.value,
              DOB: DoB.value,
              displayName: firstname.value
            }).then(() => {
              router.push('/')
            })
          )
      }
      else {
        throw new Error ("/Passwords do not match..")
      }
    }
    else {
      throw new Error("/Must be older than 18 years..")
    }
  }
  catch (error) {
    registerMessage.value = error.message.substring(error.message.indexOf("/") + 1, error.message.length - 2)
  }
}

function home() {
  router.push('/')
}
</script>

<template>
  <!-- the form and inputs -->
  <div class="onPage" id="registerPage">
    <h2 style="text-align: center">Register</h2>

    <label>Firstnames</label>
    <input class="form-control" required v-model="firstname" type="text" placeholder="Your firstnames" />

    <label>Surnames</label>
    <input class="form-control" required v-model="surname" type="text" placeholder="Your surnames" />

    <label>Date of Birth</label>
    <input class="form-control" required v-model="DoB" type="date" />

    <label>Email</label>
    <input class="form-control" required v-model="email" type="email" placeholder="eg. some.fancy@email.com"
      :rules="validateEmail" />

    <label>Password</label>
    <input class="form-control passChecks" required v-model="password" type="password" placeholder="Password"
      :rules="checkPasswordLength" />

    <label>Confirm Password</label>
    <input class="form-control passChecks" required v-model="passConfirm" type="password" placeholder="Password"
      rules="required|confirmed:password" :rules="checkPasswordLength" />

    <div class="input-group" style="margin-top: 3px; margin-left: 25%;">
      <div class="input-group-text">
        <input type="checkbox" @click="passwordToggle()">
      </div>
      <div class="input-group-append">
        <span class="input-group-text">Show Passwords</span>
      </div>
    </div>

    <div v-if="registerMessage" style="text-align: center">{{ registerMessage }}</div>

    <button class="w-100 btn btn-lg btn-success" style="margin-top: 5px" @click="register()">Register</button>
    <router-link to="/login" style="margin: 0px 0px 0px 27%;">Already have an account?</router-link>

  </div>
</template>

<style>
#registerPage {
  margin: auto;
  width: 30%;
  display: block;
}
</style>