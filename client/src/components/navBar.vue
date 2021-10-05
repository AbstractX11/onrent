<template>
  <div id="header">
    <logo v-if="screenWidth > 270" id="logo"></logo>
    <div class="nav">
      <div id="main-nav" v-if="screenWidth > 870" >
        <nav-bar-links></nav-bar-links>
      </div>
      <div v-else id="ham-menu">
        <img src="../assets/Image/menu.svg" alt="">
      </div>
      <div id="sidediv">
        <router-link :to="{ name: 'Search' }">
          <img src="../assets/Image/search.svg" />
        </router-link>
        <div @click="toggleStatus" id="account">
          <img class="avatar" v-if="authStatus" :src="user.image" />
          <img v-else src="../assets/Image/signin.svg" />
        </div>
        <ul v-if="dropdownStatus" class="dropdown">
          <li v-if="!authStatus">
            <img src="../assets/Image/user.svg" />
            <router-link
              style="text-decoration: none; color: black"
              :to="{ name: 'Login' }"
              >Login</router-link
            >
          </li>
          <div v-else>
            <li>
              <router-link
                style="text-decoration: none;color:black;"
                :to="{ name: 'Profile', params: { id: uid } }"
              >
                <img src="../assets/Image/user.svg" />Profile
              </router-link>
            </li>
            <li
              style="
              border-top: 1px solid #ce5050;
              justify-content: center;
              padding-top: 10px;
            "
            >
              <button @click="popupToggle">Log-out</button>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <pop-ups v-if="popupStatus">
      <p>Are you sure you want to logout?</p>
      <div class="buttons">
        <button id="cancel" @click="popupToggle">Cancel</button>
        <button id="confirm" @click="logout">Confirm</button>
      </div>
    </pop-ups>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import logo from "../components/logo.vue";
import popUps from "../components/popUps.vue";
import { auth } from "../firebase/firebase";
import router from "../router/index";
import navBarLinks from "./navBarLinks.vue"

export default {
  components: { logo, popUps,navBarLinks },
  props: ["authStatus", "userData", "uid"],
  setup(props) {
    const user = reactive({
      username: computed(() => props.userData.username),
      image: computed(() => props.userData.image),
    });
    const dropdownStatus = ref(false);
    const popupStatus = ref(false);
    const imgsrc = ref("../assets/Image/signin.svg");
    if (!user.image) {
      imgsrc.value = user.image;
    }
    const logout = () => {
      auth.signOut();
      router.replace({ name: "Login" });
    };
    const toggleStatus = () => {
      dropdownStatus.value = !dropdownStatus.value;
    };
    const popupToggle = () => {
      popupStatus.value = !popupStatus.value;
    };
    const screenWidth = ref(screen.width)
        window.onresize=()=>{
          screenWidth.value = screen.width
        }
    return {
      dropdownStatus,
      toggleStatus,
      logout,
      popupStatus,
      popupToggle,
      imgsrc,
      user,
      screenWidth
    };
  },
};
</script>

<style scoped>
.nav{
  margin-top:20px;
}
#logo {
  position: absolute;
  margin-top:-14px;

}
p {
  color: #ffffff;
}
.nav{
  display: flex;
  align-items:center;
  justify-content: right;
}
#main-nav{
  min-width: 400px;
  position: static;
  display: flex;
  margin-right:100px;
  align-items: center;
  justify-content: space-between;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 36px;
}
#main-nav .router-link-active {
  border-bottom: 4px solid #ce5050;
}
#sidediv {
  display: flex;
  justify-content: center;
  align-items: center;
}
#account {
  height:24px;
  width: 24px;
  margin-left: 15px;
  margin-bottom: -1px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
#account .avatar {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.dropdown {
  z-index: 2;
  font-family: Poppins;
  width: 110px;
  background: #ffffff;
  position: absolute;
  right: 15px;
  top: 60px;
  padding: 10px 20px;
  border-radius: 5px;
}
.dropdown li,
.dropdown div li {
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.dropdown div li button {
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
}
.buttons button {
  font-weight: bold;
  border: none;
  outline: none;
  background: rgba(44, 44, 44, 1);
  border-radius: 5px;
  margin: 5px;
  margin-bottom: 0;
  padding: 7px;
  cursor: pointer;
}
.buttons {
  text-align: right;
  margin-bottom: 0;
}
#cancel {
  color: #ce5050;
}
#confirm {
  color: #50ce76;
}
</style>
