<script setup>
import { ref } from 'vue'


import { Form, Field, ErrorMessage } from 'vee-validate'
import { validateEmail, checkPasswordLength } from '../assets/utils.js'

import { firebaseAuthentication, signInWithEmailAndPassword } from '@/firebase/database'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import { useRouter } from 'vue-router'

const loginResponse = ref(null)

const router = useRouter()

function login(values) {
  signInWithEmailAndPassword(firebaseAuthentication, values.email, values.password).then(
    (userCredential) => {
      router.push("/")
    },
    (error) => {
      loginResponse.value = error.message.substring(error.message.indexOf("/") + 1, error.message.length() - 2)
    }
  )
}

function resetPassword() {
  router.push('/resetpassword')
}
</script>

<template>
  <main>
    <Form label-width="50px" class="form-signin" @submit="login">
      <h2 class="h3 mb-3 fw-normal">Login</h2>

      <div class="form-floating">
        <Field class="form-control" type="email" placeholder="email" autocomplete="on" name="email"
          :rules="validateEmail" />
        <ErrorMessage name="email" />
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating">
        <Field class="form-control" type="password" placeholder="password" autocomplete="off" name="password"
          :rules="checkPasswordLength" />
        <ErrorMessage name="password" />
        <label for="floatingInput">Password</label>
      </div>
      <div v-if="loginResponse">
        <p>{{ loginResponse }}</p>
      </div>

      <a @click="resetPassword">Reset Password</a>

      <button class="w-100 btn btn-lg btn-primary" style="margin: auto">Login</button>
    </Form>
  </main>
</template>

<style>
.form-signin {
  width: 100%;
  max-width: 300px;
  padding-top: 70px;
  margin: auto;
}

label {
  color: #477979;
}
</style>
