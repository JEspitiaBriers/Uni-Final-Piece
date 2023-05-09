<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { validateEmail, checkPasswordLength } from '../assets/utils.js'

import {
  firebaseAuthentication,
  createUserWithEmailAndPassword,
  updateProfile
} from '@/firebase/database'

defineEmits(['register-clicked'])

const registerMessage = ref('')

const router = useRouter()

function passwordToggle() {
  var password = document.getElementById("registerPassword");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }

  var confirm = document.getElementById("registerPassCon");
  if (confirm.type === "password") {
    confirm.type = "text";
  } else {
    confirm.type = "password";
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

function register() {
  if (getAge(document.getElementById('registerDOB').value) > 18) {
    if (document.getElementById("registerPassword").value == document.getElementById("registerPassCon").value) {
      createUserWithEmailAndPassword(firebaseAuthentication,
        document.getElementById('registerEmail').value, document.getElementById('registerPassword').value)
        .then((userCredentials) => {
          userCredentials.firstName = document.getElementById('registerFirstnames').value
          userCredentials.surname = document.getElementById('registerSurnames').value
          userCredentials.DOB = document.getElementById('registerDOB').value
        })
        .then(() =>
          updateProfile(firebaseAuthentication.currentUser, {
            firstName: document.getElementById('registerFirstnames').value,
            surname: document.getElementById('registerSurnames').value,
            DOB: document.getElementById('registerDOB').value
          }).then(() => {
            router.push('/login')
          })
        )
        .catch((error) => {
          console.log(error.message)
          registerMessage.value = error.message.substring(error.message.indexOf("/") + 1, error.message.length - 2)
        })
    }
    else {
      registerMessage.value = "Passwords do not match"
    }
  }
  else {
    registerMessage.value = "Age must be 18"
  }
}

function home() {
  router.push('/')
}
</script>

<template>
  <div class="onPage" id="registerPage">
    <h2 style="text-align: center">Register</h2>

    <label>Firstnames</label>
    <input class="form-control" required id="registerFirstnames" type="text" placeholder="Your firstnames" />

    <label>Surnames</label>
    <input class="form-control" required id="registerSurnames" type="text" placeholder="Your surnames" />

    <label>Date of Birth</label>
    <input class="form-control" required id="registerDOB" type="date" />

    <label>Email</label>
    <input class="form-control" required id="registerEmail" type="email" placeholder="eg. some.fancy@email.com"
      :rules="validateEmail" />

    <label>Password</label>
    <input class="form-control" required id="registerPassword" type="password" placeholder="Password"
      :rules="checkPasswordLength" />

    <label>Confirm Password</label>
    <input class="form-control" required id="registerPassCon" type="password" placeholder="Password" rules="required|confirmed:password"
      :rules="checkPasswordLength" />

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