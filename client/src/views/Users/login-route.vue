<template>
  <div>
    <logo></logo>
    <main>
      <log-in></log-in>
      <img src="../../assets/Image/login.svg" />
    </main>
  </div>
</template>

<script>
import logIn from "../../components/Forms/logIn.vue";
import logo from "../../components/Navbar/logo.vue";
export default {
  components: { logIn, logo },
};
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
@media screen and (max-width: 870px) {
  img {
    display: none;
  }
}
</style>
