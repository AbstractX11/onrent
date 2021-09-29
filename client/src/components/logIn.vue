<template>
  <div id="form">
    <h2>Login</h2>
    <form v-on:submit.prevent="handleSubmit">
      <input type="email" placeholder="Email" v-model="form.email" required />
      <input type="password" placeholder="Password" v-model="form.password" required />
       <p class="error" v-if="errors">
        {{errors}}
      </p>
      <p class="centered forgetpswd">Forget Password?</p>
      <button id="loginbtn">Log In</button>
    </form>
    <p class="centered">OR<br /><br />Login with</p>
    <div id="oauth">
      <button><img src="../assets/Image/googlelogo.svg" /></button>
      <button><img src="../assets/Image/facebooklogo.svg" /></button>
    </div>
    <p class="centered linktosignup">
      Don't have an account?
      <router-link
        style="text-decoration: none; color: #ce5050"
        :to="{ name: 'Signup' }"
        >Signup</router-link
      >
    </p>
  </div>
</template>

<script lang="ts">
import {reactive,ref} from 'vue'
import {auth} from "../firebase/firebase"
export default {
    setup(){
      const form = reactive({
        email:'',
        password:''
      })
      const errors =ref ('')
      const handleSubmit =async()=>{
        try {
          await auth.signInWithEmailAndPassword(form.email,form.password)
        }
        catch (error) {
          const errorCode = error.code;
          if(errorCode==="auth/user-not-found"){
            errors.value = "There is no user corresponding to the given email."
          }else if(errorCode === "auth/wrong-password"){
            errors.value = "Wrong Password"
          }
        }
      }
      return{form,handleSubmit,errors}
    }
};
</script>

<style scoped>
h2 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  color: #ce5050;
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
.centered,
#loginbtn {
  font-family: Montserrat;
  text-align: center;
  font-size: small;
  font-weight: 600;
}
.centered {
  margin-top: 15px;
}
#loginbtn,
#oauth,
.forgetpswd {
  cursor: pointer;
}
button {
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
}
#loginbtn {
  margin: 10px auto;
  width: 140px;
  border-radius: 5px;
  height: 40px;
  background: #ce5050;
  color: #ffffff;
}
input {
  border: none;
  outline: none;
  border-bottom: 1px solid #ce5050;
  margin-bottom: 25px;
  padding: 10px 15px;
  color: #ffffff;
  background: transparent;
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
.linktosignup {
  color: #ce5050;
}
.error{
  font-size:small;
  color: #ce5050;
}
</style>
