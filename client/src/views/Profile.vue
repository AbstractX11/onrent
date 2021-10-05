<template>
<div class="Profile">
    <nav-bar :uid="uid" :userData="userData" :authStatus="authStatus"></nav-bar>
    <div class="body">
      <profile :userData="userData"></profile>  
    <post-box class="postbox" :uid="uid"></post-box>
    </div>
</div>
</template>

<script>
import navBar from '../components/navBar.vue'
import profile from '../components/profile.vue'
import PostBox from '../components/postBox.vue'
  export default{
    components:{navBar,profile,PostBox},
      props:['authStatus','uid', 'userData']
  }
</script>
<style scoped>
.body{
  margin-top:60px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.postbox{
  margin: 30px;
}
</style>