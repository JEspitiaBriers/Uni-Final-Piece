<script setup>
import { ref } from 'vue'

import { Form, Field, ErrorMessage } from 'vee-validate'
import { validateEmail, checkPasswordLength } from '../assets/utils.js'

import { firebaseAuthentication, signInWithEmailAndPassword } from '@/firebase/database'

import { useRouter } from 'vue-router'

const loginMessage = ref(null)

const router = useRouter()

function passwordToggle() {
  var password = document.getElementById("loginPassword");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

function login() {
  signInWithEmailAndPassword(firebaseAuthentication, document.getElementById('loginEmail').value, document.getElementById('loginEmail').value).then(
    (userCredential) => {
      router.push("/")
    },
    (error) => {
      if (error.message.substring(error.message.indexOf("/") + 1, error.message.length - 2) == "internal-error") {
        loginMessage = "missing-field"
      }
      else {
        loginMessage.value = error.message.substring(error.message.indexOf("/") + 1, error.message.length - 2)
      }
    }
  )
}

function resetPassword() {
  router.push('/resetpassword')
}
</script>

<template>
  <div class="onPage" id="loginPage">
    <h2 style="text-align: center">Login</h2>

    <label>Email</label>
    <input class="form-control" id="loginEmail" type="email" placeholder="eg. some.fancy@email.com"
      :rules="validateEmail" />

    <label>Password</label>
    <input class="form-control" id="loginPassword" type="password" placeholder="Password" :rules="checkPasswordLength" />

    <div class="input-group" style="margin-top: 3px; margin-left: 25%;">
      <div class="input-group-text">
        <input type="checkbox" @click="passwordToggle()">
      </div>
      <div class="input-group-append">
        <span class="input-group-text">Show Passwords</span>
      </div>
    </div>

    <div v-if="loginMessage" style="text-align: center">{{ loginMessage }}</div>

    <button class="w-100 btn btn-lg btn-primary" style="margin-top: 5px" @click="login()">Login</button>
    <button class="w-50 btn btn-sm btn-secondary" style="margin: 3px 0px 0px 25%;" @click="resetPassword()">Reset
      Password</button>
    <router-link to="/register" style="margin: 0px 0px 0px 34%;">Need to register?</router-link>
  </div>
</template>

<style>
#loginPage {
  margin: auto;
  width: 30%;
  display: block;
}
</style>
