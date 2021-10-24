<template>
  <div class="home"> 
    <nav-bar
      :uid="uid"
      :userData="userData"
      :authStatus="authStatus"
    ></nav-bar>   
    <show-case-card></show-case-card>
  </div>
</template>

<script>
import ShowCaseCard from '../../components/Cards/showCaseCard.vue';
import NavBar from '../../components/Navbar/navBar.vue';
export default {
  components: {NavBar,ShowCaseCard },
  props: ["authStatus", "userData", "uid"],
};
</script>
<style scoped>
.wrapper{
  margin-top:10px;
}
</style>
