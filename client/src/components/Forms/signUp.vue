<template>
  <div id="form">
    <h2>Sign Up</h2>
    <h5>Please fill this form to create an account</h5>
    <form v-on:submit.prevent="Validate">
      <input
        id="imguploader"
        @change="imgChosen($event)"
        accept=".png,.jpeg,.jpg"
        type="file"
        placeholder="Choose image"
        required
      />
      <div class="avatar">
        <img class="photo" v-if="form.image.length" :src="form.image" />
        <img class="svg" v-else src="../../assets/Image/addphoto.svg" />
      </div>
      <input
        class="details username"
        v-model="form.username"
        type="text"
        name="name"
        placeholder="Username"
        required
      />
      <input
        class="details"
        v-model="form.email"
        type="text"
        name="email"
        placeholder="Email"
        required
      />
      <input
        class="details"
        v-model="form.password"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <input
        class="details"
        v-model="confirm"
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        required
      />
      <p class="error" v-if="errors.mainError">
        {{ errors.mainError }}
      </p>
      <p class="error" v-if="errors.confirmError">
        {{ errors.confirmError }}
      </p>
      <p class="error" v-if="errors.imageError">
        {{ errors.imageError }}
      </p>

      <button type="submit">Sign Up</button>
    </form>
    <p class="centered">OR<br /><br />Signup with</p>
    <div id="oauth">
      <img @click="signInwithGoogle" src="../../assets/Image/googlelogo.svg" />
      <img  @click="signInwithFacebook" src="../../assets/Image/facebooklogo.svg" />
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

<script>
import { ref, reactive } from "vue";
import router from "../../router";
import { auth } from "../../firebase/firebase";
import { createUser } from "../../firebase/userCollection";
import { resizeFile } from "../../helper";
import { getAuth,GoogleAuthProvider, signInWithPopup,FacebookAuthProvider} from "firebase/auth";
export default {
  setup() {
    const form = reactive({
      username: "",
      email: "",
      password: "",
      image: "",
    });
    const confirm = ref("");
    const errors = reactive({
      mainError: "",
      confirmError: "",
      imageError: "",
    });
    const imgChosen = async (event) => {
      if (event.target.files) {
        const image = event.target.files[0];
        const compressed_image = await resizeFile(image);
        form.image = compressed_image;
        errors.imageError =
          compressed_image.length > 1000000 ? "Larger image size" : "";
      }
    };
    const handleSubmit = async () => {
      try {
        const cred = await auth.createUserWithEmailAndPassword(
          form.email,
          form.password
        );
        if (cred.user) {
          const userRecord = {
            uid: cred.user.uid,
            username: form.username,
            image: form.image,
          };
          createUser(userRecord);
          router.replace({ name: "Home" });
        }
      } catch (error) {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-email") {
          errors.mainError = "Invalid email address";
        } else if (errorCode === "auth/email-already-in-use") {
          errors.mainError =
            "An account already exists with given email address";
        } else if (errorCode === "auth/weak-password") {
          errors.mainError = "Password should be at least 6 characters";
        }
      }
    };
    const Validate = () => {
      errors.confirmError =
        form.password !== confirm.value ? "Passwords do not match" : "";
      if (!errors.confirmError && !errors.imageError) {
        handleSubmit();
      }
    };
    const signInwithGoogle = async()=>{
      try{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const res = await signInWithPopup(auth, provider);
        const userRecord = {
          uid:res.user.uid,
          username:res.user.displayName,
          image:res.user.photoURL
        }
        createUser(userRecord);
        router.replace({ name: "Home" });

      }catch(error){
        console.log(error)
      }
    }
      const signInwithFacebook = async()=>{
      try{
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        const res = await signInWithPopup(auth, provider);
        const userRecord = {
          uid:res.user.uid,
          username:res.user.displayName,
          image:res.user.photoURL
        }
        createUser(userRecord);
        router.replace({ name: "Home" });

      }catch(error){
        console.log(error)
      }
    }
    return { form, confirm, Validate, handleSubmit, errors, imgChosen,signInwithGoogle,signInwithFacebook };
  }
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
  display: flex;
  flex-direction: column;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 1px;
}
#form {
  width: 40vw;
  margin-bottom: 30px;
  padding: 30px;
}
form {
  align-items: center;
  margin-top: 30px;
}
#imguploader {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  font-family: Poppins;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
}
::-webkit-file-upload-button {
  cursor: pointer;
}
.avatar {
  width: 90px;
  height: 90px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  background: #ce5050;
}
.avatar .photo {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.avatar .svg {
  border-radius: 50%;
}
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
  width: 35%;
  padding: 12px 0;
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
.details {
  width: 100%;
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
  font-family: Poppins;
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
.error {
  font-size: small;
  color: #ce5050;
}
@media screen and (max-width: 1100px) {
  #form {
    width: 50vw;
  }
}
@media screen and (max-width: 870px) {
  #form {
    width: 60vw;
  }
}
@media screen and (max-width: 690px) {
  #form {
    width: 80vw;
  }
}
</style>
