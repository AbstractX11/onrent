<template>
  <div id="header">
    <logo v-if="screenWidth > 270" id="logo"></logo>
    <div class="nav">
      <div id="main-nav" v-if="screenWidth > 870">
        <nav-bar-links></nav-bar-links>
      </div>
      <!-- hammenu -->
      <div v-else id="ham-menu">
        <div @click="toggleMenu" class="menu-container">
          <img src="../../assets/Image/menu.svg" alt="" />
        </div>
        <transition name="menu">
          <nav-bar-links v-if="showMenu"></nav-bar-links>
        </transition>
      </div>
      <div id="sidediv">
        <div class="search-box">
          <button class="btn-search">
            <span class="material-icons">
              search
            </span>
          </button>
          <input
            type="text"
            class="input-search"
            placeholder="Type to Search..."
          />
        </div>
        <div @click="toggleStatus" id="account">
          <img class="avatar" v-if="authStatus" :src="user.image" />
          <img v-else src="../../assets/Image/signin.svg" />
        </div>
        <ul v-if="dropdownStatus" class="dropdown">
          <li v-if="!authStatus">
            <img src="../../assets/Image/user.svg" />
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
                <img src="../../assets/Image/user.svg" />Profile
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
import logo from "./logo.vue";
import popUps from "../popUps.vue";
import { auth } from "../../firebase/firebase";
import router from "../../router/index";
import navBarLinks from "./navBarLinks.vue";

export default {
  components: { logo, popUps, navBarLinks },
  props: ["authStatus", "userData", "uid"],
  setup(props) {
    const user = reactive({
      username: computed(() => props.userData.username),
      image: computed(() => props.userData.image),
    });
    const dropdownStatus = ref(false);
    const popupStatus = ref(false);
    const showMenu = ref(false);
    const imgsrc = ref("../../assets/Image/signin.svg");
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
    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };
    const screenWidth = ref(window.innerWidth);
    window.onresize = () => {
      screenWidth.value = window.innerWidth;
    };
    // closing menu with tap on window if opened
    // window.onfocus=()=>{
    //   showMenu.value=showMenu.value? !showMenu.value : showMenu.value
    // }
    return {
      dropdownStatus,
      toggleStatus,
      logout,
      popupStatus,
      popupToggle,
      imgsrc,
      user,
      screenWidth,
      toggleMenu,
      showMenu,
    };
  },
};
</script>

<style scoped>
#header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
p {
  color: #ffffff;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: right;
}
#main-nav .router-link-active {
  border-bottom: 4px solid #ce5050;
}
#ham-menu {
  z-index: 5;
}
#ham-menu .menu-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  cursor: pointer;
}
#ham-menu .navlinks{
  min-width: 40vw;
  background: rgb(53, 51, 51);
  flex-flow: column;
  justify-content: flex-start;
  text-align: right;
  margin-right: 0;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 60px;
  border-radius: 5px;
  line-height: 40px;
}
.menu-enter-from,
.menu-leave-to {
  transform: translateX(400px);
}
.menu-enter-active,
.menu-leave-active {
  transition: all 1s ease;
}

#sidediv {
  display: flex;
  justify-content: center;
  align-items: center;
}
#account {
  height: 24px;
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

/*search*/
.search-box {
  width: fit-content;
  height: fit-content;
  position: relative;
}
.input-search {
  height: 50px;
  width: 50px;
  border-style: none;
  padding: 10px;
  font-size: .8rem;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: transparent;
  padding-right: 50px;
  color: #fff;
}
.input-search::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-size: .8rem;
  letter-spacing: 2px;
  font-weight: 100;
}
.btn-search {
  width: 50px;
  height: 50px;
  border-style: none;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: #ffffff;
  background-color: transparent;
  pointer-events: painted;
}
.btn-search:focus ~ .input-search {
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}
.input-search:focus {
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}
</style>
