<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { firebaseAuthentication, sendPasswordResetEmail } from '@/firebase/database';
import { validateEmail } from '../assets/utils.js';
import { useRouter } from 'vue-router';

const router = useRouter();

function resetPassword(values) {
  sendPasswordResetEmail(firebaseAuthentication, values.email)
    .then(() => {
      router.push({
        name: 'GeneralMessage',
        params: { message: 'Email sent successfully. Redirecting to home page.' }
      });
      setTimeout(home, 1500);
    })
    .catch((error) => {
      loginResponse.value = error.message;
    });
}

function home() {
  router.push('/');
}
</script>

<template>
    <div v-if="!firebaseAuthentication.currentUser">
      <Form label-width="50px" class="form-signin" @submit="resetPassword">
        <h2 class="h3 mb-3 fw-normal">Reset Password</h2>
        <div class="form-floating">
          <Field class="form-control" type="email" placeholder="email" autocomplete="off" name="email"
            :rules="validateEmail" />
          <ErrorMessage name="email" />
          <label for="floatingInput">Email</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" style="margin: auto; margin-top:3px;">Reset Password</button>
      </Form>
    </div>
    <div v-else>
      <h1>You are already logged in.</h1>
    </div>
</template>
