<template>
  <div id="header">
    <logo></logo>
    <div id="nav">
      <router-link style="text-decoration: none" :to="{ name: 'Rooms' }"
        ><p>Rooms</p></router-link
      >
      <router-link style="text-decoration: none" :to="{ name: 'Vehicles' }"
        ><p>Vehicles</p></router-link
      >
      <router-link style="text-decoration: none" :to="{ name: 'Electronics' }"
        ><p>Electronics</p></router-link
      >
      <router-link style="text-decoration: none" :to="{ name: 'Houses' }"
        ><p>Houses</p></router-link
      >
    </div>
    <div id="sidediv">
      <router-link :to="{ name: 'Search' }">
        <img src="../assets/Image/search.svg" />
      </router-link>
      <div @click="toggleStatus" id="account">
        <img src="../assets/Image/signin.svg" />
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
              :to="{ name: 'Profile' }"
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
    <pop-ups v-if="popupStatus">
      <p>Are you sure you want to logout?</p>
      <div class="buttons">
        <button id="cancel" @click="popupToggle">Cancel</button>
        <button id="confirm" @click="logout">Confirm</button>
      </div>
    </pop-ups>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import logo from "../components/logo.vue";
import popUps from "../components/popUps.vue";
import { auth } from "../firebase/firebase";
import router from "../router/index";

export default {
  components: { logo, popUps },
  props: ["authStatus"],
  setup() {
    const dropdownStatus = ref(false);
    const popupStatus = ref(false);
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
    return { dropdownStatus, toggleStatus, logout, popupStatus, popupToggle };
  },
};
</script>

<style scoped>
#header {
  display: grid;
  grid-template-columns: 55% 30% 15%;
}
p {
  color: #ffffff;
}
#nav {
  min-width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 36px;
}
#sidediv {
  display: flex;
  justify-content: right;
  align-items: center;
}
#account {
  width: 30px;
  height: 30px;
  margin-left: 15px;
  margin-bottom: -1px;
  cursor: pointer;
}
.dropdown {
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
