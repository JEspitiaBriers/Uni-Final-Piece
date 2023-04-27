<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import {
  firebaseAuthentication,
  updatePassword,
  signInWithEmailAndPassword
} from '@/firebase/database'
import { useRouter } from 'vue-router'

let props = defineProps({
  user: {
    type: Object,
    default: () => { }
  }
})

defineEmits(['logout'])

const passwordResponse = ref(null)
const router = useRouter()

function checkPasswordValid(values) {
  signInWithEmailAndPassword(firebaseAuthentication, props.user.email, values.currentPassword).then(
    (userCredential) => {
      changePassword(values)
    },
    (error) => {
      if (error.message === 'Firebase: Error (auth/wrong-password).') {
        passwordResponse.value = 'The current password you entered is incorrect.'
      }
    }
  )
}
function changePassword(values) {
  updatePassword(firebaseAuthentication.currentUser, values.password)
    .then(() => {
      router.push({
        name: 'GeneralMessage',
        params: { message: 'Password successfully updated. Redirecting to home page.' }
      })
      setTimeout(home, 1500)



      /*
        Instead of redirecting after 1.5 seconds with a message displayed, use a modal
      */



    })

    .catch((error) => {
      if (
        error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'
      ) {
        passwordResponse.value = 'Password must be at least 6 characters'
      }
    })
}

function home() {
  router.push('/')
}

// function userModals(id) {
// 	console.log("called modals")
// 	document.getElementById("update" + id).addEventListener("click", function () {
// 		// Get the values from the hidden inputs
// 		const userID = document.getElementById("userID" + id).value;
// 		const userFirstname = document.getElementById("userFirstname" + id).value;
// 		const userSurname = document.getElementById("userSurname" + id).value;
// 		const userEmail = document.getElementById("userEmail" + id).value;
// 		const userDOB = document.getElementById("userDOB" + id).value;
// 		const userCreated = document.getElementById("userCreated" + id).value;// Update the modal with the values
// 		document.getElementById("modal-id").value = userID;
// 		document.getElementById("modal-firstname").value = userFirstname;
// 		document.getElementById("modal-surname").value = userSurname;
// 		document.getElementById("modal-email").value = userEmail;
// 		document.getElementById("modal-DOB").value = userDOB;
// 		document.getElementById("modal-created").value = userCreated;
// 	});

// 	document.getElementById("delete" + id).addEventListener("click", function () {
// 		// Get the value from the hidden input
// 		const userID = document.getElementById("userID" + id).value;
// 		const userFirstname = document.getElementById("userFirstname" + id).value;
// 		const userSurname = document.getElementById("userSurname" + id).value;
// 		const userEmail = document.getElementById("userEmail" + id).value;
// 		const userDOB = document.getElementById("userDOB" + id).value;
// 		const userCreated = document.getElementById("userCreated" + id).value;// Update the modal with the values
// 		document.getElementById("modal-id").value = userID;
// 		document.getElementById("modal-firstname").value = userFirstname;
// 		document.getElementById("modal-surname").value = userSurname;
// 		document.getElementById("modal-email").value = userEmail;
// 		document.getElementById("modal-DOB").value = userDOB;
// 		document.getElementById("modal-created").value = userCreated;
// 	});
// }


// function userModals(id) {
// 	console.log("called modals");
// 	const modalId = document.querySelector(".modal-id");
// 	modalId.value = document.getElementById("userID" + id).value;
// 	const modalFirstname = document.querySelector(".modal-firstname");
// 	modalFirstname.value = document.getElementById("userFirstname" + id).value;
// 	const modalSurname = document.querySelector(".modal-surname");
// 	modalSurname.value = document.getElementById("userSurname" + id).value;
// 	const modalEmail = document.querySelector(".modal-email");
// 	modalEmail.value = document.getElementById("userEmail" + id).value;
// 	const modalDOB = document.querySelector(".modal-DOB");
// 	modalDOB.value = document.getElementById("userDOB" + id).value;
// 	const modalCreated = document.querySelector(".modal-created");
// 	modalCreated.value = document.getElementById("userCreated" + id).value;
// }
</script>

<template>

<!-- 
--------------------------------
  add delete account funciton 
--------------------------------
-->

  <Form label-width="95px" class="demo-ruleForm form-signin" @submit="checkPasswordValid">
    <h1>Your Details</h1>
    <!-- To be implemented -->
    <h2>Update Password</h2>

    <div class="form-floating">
      <Field class="form-control" type="password" placeholder="password" autocomplete="off" name="currentPassword"
        rules="required" />
      <ErrorMessage name="currentPassword" />
      <label for="floatingInput">Current Password</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" type="password" placeholder="password" required autocomplete="off" name="password"
        rules="required" />
      <ErrorMessage name="password" />
      <label for="floatingInput">New Password</label>
    </div>

    <div class="form-floating">
      <Field class="form-control" type="password" placeholder="password" autocomplete="off" name="confirmation"
        rules="required|confirmed:password" />
      <ErrorMessage name="confirmation" />
      <label for="floatingInput">Confirm New Password</label>
    </div>

    <div v-if="passwordResponse">
      {{ passwordResponse }}
    </div>

    <button class="w-100 btn btn-lg btn-primary" style="margin: auto">Update Password</button>
  </Form>
</template>

<style></style>


