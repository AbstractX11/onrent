<template>
  <div id="header">
    <logo></logo>
    <div id="nav">
      <router-link style="text-decoration:none;" :to="{name:'Rooms'}"><p>Rooms</p></router-link> 
      <router-link style="text-decoration:none;" :to="{name:'Vehicles'}"><p>Vehicles</p></router-link>
      <router-link style="text-decoration:none;" :to="{name:'Electronics'}"><p>Electronics</p></router-link>
      <router-link style="text-decoration:none;" :to="{name:'Houses'}"><p>Houses</p></router-link>
    </div>
    <div id="sidediv">
      <router-link :to="{name:'Search'}">
        <img src="../assets/Image/search.svg">
      </router-link>
      <div @click="toggleStatus" id="account">
        <img src="../assets/Image/signin.svg">
      </div>
      <ul v-if="dropdownStatus" class="dropdown">
        <li v-if="!loginStatus">
          <img src="../assets/Image/user.svg"/>
          <router-link style="text-decoration:none;
          color:black;" :to="{name:'Login'}">Login</router-link>
        </li>
        <div v-else>
          <li>
          <img src="../assets/Image/user.svg"/>Profile
        </li>
        <li
        style="
        border-top:1px solid #CE5050;
        justify-content:center;
        padding-top:10px;
        ">
          Log-out
        </li>

        </div>
        
      </ul>
    </div>
  </div>
</template>

<script>
import {ref} from "vue"
import logo from '../components/logo.vue'

export default {
  components:{logo},
  setup(){
    const dropdownStatus= ref(false);
    const loginStatus= ref(false);
    const toggleStatus = ()=>{
      dropdownStatus.value=!dropdownStatus.value
    }
    return{dropdownStatus, toggleStatus, loginStatus}
    
  }

}

</script>

<style scoped>
#header{
  display: grid;
  grid-template-columns: 55% 30% 15%;
}
p{
  color: #FFFFFF;
}
#nav{
  min-width:400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 36px;
}
#sidediv{
  display: flex;
  justify-content: right;
  align-items: center;
}
#account{
  width:30px;
  height:30px;
  margin-left:15px;
  margin-bottom:-1px;
  cursor: pointer;
}
.dropdown{
  width:110px;
  background: #FFFFFF;
  position:absolute;
  right:15px;
  top:60px;
  padding:10px 20px;
  border-radius: 5px;
}
.dropdown li,.dropdown div li{
  width:100%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom:10px;
}

</style>
