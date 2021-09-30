<template>
<div>
  <nav-bar :authStatus="authStatus"></nav-bar>
  <post-box :uid="uid"></post-box>
</div>
</template>

<script>
import navBar from '../components/navBar.vue'
import PostBox from '../components/postBox.vue'
  export default{
    components:{navBar,PostBox},
    props:['authStatus','uid'],
  }
</script>