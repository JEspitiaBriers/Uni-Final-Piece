<script setup>
import { ref } from 'vue';

import { validateEmail, checkPasswordLength } from '../assets/utils.js';

import { firebaseAuthentication, signInWithEmailAndPassword } from '@/firebase/database';
import { useRouter } from 'vue-router';

let variables = defineProps({
  user: {
    type: Object,
    default: () => {}
  }
});

const email = ref('');
const password = ref('');
const loginMessage = ref(null);

const router = useRouter();

function passwordToggle() {
  var password = document.getElementById('loginPassword');
  if (password.type === 'password') {
    password.type = 'text';
  } else {
    password.type = 'password';
  }
}

//sends validation requests to firebase and signs in user
function login() {
  signInWithEmailAndPassword(firebaseAuthentication, email.value, password.value).then(
    (userCredential) => {
      router.push('/');
    },
    (error) => {
      if (
        error.message.substring(error.message.indexOf('/') + 1, error.message.length - 2) ==
        'internal-error'
      ) {
        loginMessage.value = 'missing-field';
      } else {
        loginMessage.value = error.message.substring(
          error.message.indexOf('/') + 1,
          error.message.length - 2
        );
      }
    }
  );
}
</script>

<template>
  <div id="loginPage">
    <template v-if="user"
      ><h2 style="text-align: center">You're already logged in as {{ user }}</h2>
      <button to="/">To the Dashboard</button></template
    >

    <template v-else-if="!user">
      <h2 style="text-align: center">Login</h2>

      <label>Email</label>
      <input
        class="form-control"
        v-model="email"
        type="email"
        placeholder="eg. some.fancy@email.com"
        :rules="validateEmail"
      />

      <label>Password</label>
      <input
        class="form-control"
        id="loginPassword"
        v-model="password"
        type="password"
        placeholder="Password"
        :rules="checkPasswordLength"
      />

      <div class="input-group" style="margin-top: 3px; margin-left: 25%">
        <div class="input-group-text">
          <input type="checkbox" @click="passwordToggle()" />
        </div>
        <div class="input-group-append">
          <span class="input-group-text">Show Passwords</span>
        </div>
      </div>

      <div v-if="loginMessage" style="text-align: center">{{ loginMessage }}</div>

      <button class="w-100 btn btn-lg btn-success" style="margin-top: 5px" @click="login()">
        Login
      </button>

      <router-link to="/register" style="margin: 0px 0px 0px 34%">Need to register?</router-link>
    </template>
  </div>
</template>

<style>
#loginPage {
  margin: auto;
  width: 30%;
  display: block;
  margin-bottom: 150px;
}
</style>
