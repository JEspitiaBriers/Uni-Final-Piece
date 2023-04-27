<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Form, Field, ErrorMessage } from 'vee-validate'
import { validateEmail } from '../assets/utils.js'

import {
  firebaseAuthentication,
  createUserWithEmailAndPassword,
  updateProfile
} from '@/firebase/database'

defineEmits(['register-clicked'])

const registerResponse = ref('')

const router = useRouter()

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


function register(values) {
  if (getAge(values.DOB) > 18) {
    createUserWithEmailAndPassword(firebaseAuthentication, values.email, values.password)
      .then((userCredentials) => {
        userCredentials.firstName = values.firstName
        userCredentials.surname = values.surname
        userCredentials.DOB = values.DOB
      })
      .then(() =>
        updateProfile(firebaseAuthentication.currentUser, {
          DOB: values.DOB,
          firstName: values.firstName,
          surname: values.surname
        }).then(() => {
          router.push({
            name: 'Home',
            params: { message: 'Successfully registered and automatically logged in. Redirecting to home page.' }
          })
          setTimeout(home, 1500)
        })
      )
      .catch((error) => {
        registerResponse.value = error.message.substring(10)
      })
  }
  else {
    registerResponse.value = "You must be at least 18 to create an account"
  }
}

// function register(values) {
//   if (getAge(values.DOB) > 18) {
//     createUserWithEmailAndPassword(firebaseAuthentication, values.email, values.password)
//       .then((userCredentials) => {
//         userCredentials.firstName = values.firstName
//         userCredentials.surname = values.surname
//         userCredentials.DOB = values.DOB
//       })
//       .then(() =>
//         updateProfile(firebaseAuthentication.currentUser, {
//           firstName: values.firstName,
//           surname: values.surname,
//           DOB: values.DOB
//         }).then(() => {
//           router.push({
//             name: '/',
//             params: { message: 'Successfully registered and automatically logged in. Redirecting to home page.' }
//           })
//           setTimeout(home, 1500)
//         })
//       )
//       .catch((error) => {
//         openModal("Error During Registration", error)
//       })
//   }
//   else {
//     openModal("Age Warning", "You must be over 18 to create an account")
//     // registerResponse.value = "You must be over 18 to create an account"
//   }
// }

function home() {
  router.push('/')
}
</script>

<template>

  <Form label-width="50px" class="form-signin" @submit="register">
    <h2 class="h3 mb-3 fw-normal">Register</h2>

    <div class="form-floating">
      <Field class="form-control" placeholder="First Name" autocomplete="off" name="firstName" rules="required" />
      <ErrorMessage name="firstName" />
      <label for="floatingInput">First Name</label>
    </div>
    <div class="form-floating">
      <Field class="form-control" placeholder="Surname" autocomplete="off" name="surname" rules="required" />
      <ErrorMessage name="surname" />
      <label for="floatingInput">Surname</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" placeholder="eg. 06/11/2000" autocomplete="off" name="DOB" rules="required" />
      <ErrorMessage name="DOB" />
      <label for="floatingInput">Date of Birth</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" placeholder="Email" autocomplete="on" :rules="validateEmail" name="email" />
      <ErrorMessage name="email" />
      <label for="floatingInput">Email</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" type="password" placeholder="password" autocomplete="off" show-password name="password"
        rules="required" />
      <ErrorMessage name="password" />
      <label for="floatingInput">Password</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" type="password" placeholder="password" autocomplete="off" show-password
        name="confirmation" rules="required|confirmed:password" />
      <ErrorMessage name="confirmation" />
      <label for="floatingInput">Confirm Password</label>
    </div>

    <div v-if="registerResponse">
      <p>{{ registerResponse }}</p>
    </div>

    <button class="w-100 btn btn-lg btn-primary" style="margin: auto">Register</button>
  </Form>
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