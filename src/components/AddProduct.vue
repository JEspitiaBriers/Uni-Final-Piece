<!-- <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Form, Field, ErrorMessage } from 'vee-validate'
import { validateEmail } from '../assets/utils.js'

import {
  firebaseAuthentication,
  createUserWithEmailAndPassword,
  updateProfile
} from '@/firebase/database'

defineEmits(['addProduct-clicked'])

const addProductResponse = ref('')

const router = useRouter()

const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'YOUR_PROJECT_ID',
  keyFilename: '/path/to/keyfile.json',
});


function addProduct(values) {
// Categories
// Description
// Dimensions
// Image
// Price
// Tags
// Title
const data = {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA'
};

  // Add a new document in collection "cities" with ID 'LA'
  const res = await db.collection('cities').doc('LA').set(data);
      )
      .catch((error) => {
        addProductResponse.value = error.message.substring(10)
      })
}

// function addProduct(values) {
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

  <Form label-width="50px" class="form-signin" @submit="addProduct">
    <h2 class="h3 mb-3 fw-normal">Add Product</h2>

    <div class="form-floating">
      <Field class="form-control" placeholder="Title" autocomplete="off" name="Title" rules="required" />
      <ErrorMessage name="Title" />
      <label for="floatingInput">Title</label>
    </div>
    <div class="form-floating">
      <Field class="form-control" placeholder="Description" autocomplete="off" name="Description" rules="required" />
      <ErrorMessage name="Description" />
      <label for="floatingInput">Description</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" placeholder="eg. 99.99" autocomplete="off" name="Price" rules="required" />
      <ErrorMessage name="Price" />
      <label for="floatingInput">Price</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" placeholder="Image/TPHI" autocomplete="on" name="Image" />
      <ErrorMessage name="Image" />
      <label for="floatingInput">Image</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" placeholder="eg. 'Water, bowl, metal'" autocomplete="off" name="Tags" rules="required" />
      <ErrorMessage name="Tags" />
      <label for="floatingInput">Tags</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" placeholder="eg. 'Enclosure'" autocomplete="off" name="Categories" rules="required" />
      <ErrorMessage name="Categories" />
      <label for="floatingInput">Categories</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" placeholder="eg. '180x120x100'" autocomplete="off" name="Dimensions" rules="required" />
      <ErrorMessage name="Dimensions" />
      <label for="floatingInput">Dimensions</label>
    </div>

    <div v-if="addProductResponse">
      <p>{{ addProductResponse }}</p>
    </div>

    <button class="w-100 btn btn-lg btn-primary" style="margin: auto">Add Product</button>
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
</style> -->

<template>

</template>

<script setup>

</script>

<style>

</style>