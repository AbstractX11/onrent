<template>
  <div class="home">
    <nav-bar
      :uid="uid"
      :userData="userData"
      :authStatus="authStatus"
    ></nav-bar>
  </div>
</template>

<script>
import navBar from "../../components/Navbar/navBar.vue";
import ShowCaseCard from '../../components/Cards/showCaseCard.vue';
export default {
  components: { navBar, ShowCaseCard },
  props: ["authStatus", "userData", "uid"],
};
</script>
