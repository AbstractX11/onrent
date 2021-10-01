<template>
<div>
    <nav-bar :userData="userData" :authStatus="authStatus"></nav-bar>
</div>
</template>

<script>
  import navBar from '../components/navBar.vue'
  export default{
    components:{navBar},
      props:['authStatus','userData'],

  }
</script>
