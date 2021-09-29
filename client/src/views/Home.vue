<template>
<div>
 <nav-bar :authStatus="authStatus"></nav-bar>
</div>
</template>

<script lang="ts">
  import navBar from '../components/navBar.vue'
  export default{
    components:{navBar},
    props:['authStatus'],

  }
</script>
