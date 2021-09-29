<template>
<div>
  <router-view :authStatus="authStatus"></router-view>
</div>
</template>
<script lang="ts">
import {ref} from 'vue'
import {auth} from './firebase/firebase'
export default {
  setup(){
    const authStatus = ref(false)
    auth.onAuthStateChanged((user:any)=>{
    if(user){
      console.log("user logged in")
      authStatus.value = true;
    }else{
      console.log("user logged out")
      authStatus.value = false
    }
  })
    
    return {authStatus}
  }

}
</script>
<style scoped>
</style>
