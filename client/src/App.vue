<template>
<div>
  <router-view :uid="uid" :authStatus="authStatus"></router-view>
</div>
</template>
<script lang="ts">
import {ref} from 'vue'
import {auth} from './firebase/firebase'

export default {
  setup(){
    const uid =ref('')
    const authStatus = ref(false)
    auth.onAuthStateChanged((user:any)=>{
    if(user){
      uid.value = user.uid
      console.log("user logged in")
      authStatus.value = true;
    }else{
      console.log("user logged out")
      authStatus.value = false
    }
  })
    
    return {authStatus,uid}
  }

}
</script>
<style scoped>
</style>
