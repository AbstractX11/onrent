<template>
  <div id="form">
    <h2>Sign Up</h2>
    <h5>Please fill this form to create an account</h5>
    <form v-on:submit.prevent="Validate">
      <input
        v-model="form.username"
        type="text"
        name="name"
        placeholder="Username"
        required
      />
      <input
        v-model="form.email"
        type="text"
        name="email"
        placeholder="Email"
        required
      />
      <input
        v-model="form.password"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <input
        v-model="confirm"
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        required
      />
      <!-- <div id="terms"><input id="checkbox" type="checkbox" name="terms" v-model="terms" required>
        <label>Accept terms and condition</label></div> -->
      <p class="error" v-if="errors.mainError">
        {{ errors.mainError }}
      </p>
      <p class="error" v-if="errors.confirmError">
        {{ errors.confirmError }}
      </p>

      <button type="submit">Sign Up</button>
    </form>
    <p class="centered">OR<br /><br />Signup with</p>
    <div id="oauth">
      <img src="../assets/Image/googlelogo.svg" />
      <img src="../assets/Image/facebooklogo.svg" />
    </div>
    <p class="centered linktologin">
      Already have an account?
      <router-link
        style="text-decoration: none; color: #ce5050"
        :to="{ name: 'Login' }"
        >Login</router-link
      >
    </p>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import router from "../router";
import { auth, createUser } from "../firebase/firebase";

export default {
  setup() {
    const form = reactive({
      username: "",
      email: "",
      password: "",
    });
    const confirm = ref("");
    const errors = reactive({
      mainError: "",
      confirmError: "",
    });
    const handleSubmit = async () => {
      try {
        const cred = await auth.createUserWithEmailAndPassword(
          form.email,
          form.password
        );
        if (cred.user) {
          const userRecord = {
            uid:cred.user.uid,
            username:form.username
          }
          createUser(userRecord);
          router.replace({ name: "Home" });
        }
      } catch (error) {
        const errorCode = error.code;
        if (errorCode==="auth/invalid-email"){
          errors.mainError = "Invalid email address"
        }else if (errorCode === "auth/email-already-in-use"){
          errors.mainError = "An account already exists with given email address"
        }else if (errorCode === "auth/weak-password"){
          errors.mainError = "Password should be at least 6 characters"
        }
      }
    };
    const Validate = () => {
      errors.confirmError =
        form.password !== confirm.value ? "Passwords do not match" : "";
      if (!errors.confirmError) {
        handleSubmit();
      }
    };
    return { form, confirm, Validate, handleSubmit, errors};
  },
};
</script>

<style scoped>
h2 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  color: #ce5050;
  margin-bottom: 0;
}
h5 {
  margin-top: 10px;
  margin-bottom: 0;
}

form,
#form {
  width: 400px;
  display: flex;
  flex-direction: column;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 1px;
}
form {
  margin-top: 30px;
}
/* #terms{
    height: 40px;
    display: flex;
    align-items: center;
}
#checkbox{
    height: 30px;
    width:30px;
    margin-top:20px;
    appearance: none;
    background: #CE5050;
    margin-right:10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}
#checkbox:checked:after {
  content:"✔";
  color: white;
} */
.centered,
button {
  font-family: Montserrat;
  text-align: center;
  font-size: small;
  font-weight: 600;
}
.centered {
  margin-top: 15px;
}
button {
  margin: 10px auto;
  width: 140px;
  height: 40px;
  background: #ce5050;
  border: none;
  border-radius: 5px;
  outline: none;
  color: #ffffff;
}
button,
#oauth {
  cursor: pointer;
}
input {
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 1px solid #ce5050;
  margin-bottom: 25px;
  padding: 10px 15px;
  color: #ffffff;
  font-size: 15px;
}
::placeholder {
  color: #ffffff;
}
#oauth {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#oauth img {
  margin-right: 10px;
}
.linktologin {
  color: #ce5050;
}
.error{
  font-size:small;
  color: #ce5050;
}
</style>
