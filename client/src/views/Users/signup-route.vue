<template>
  <div>
    <logo></logo>
    <main>
      <sign-up></sign-up>
      <img src="../../assets/Image/signup.svg" />
    </main>
  </div>
</template>

<script>
import Logo from "@/components/Navbar/logo.vue";
import signUp from "../../components/Forms/signUp.vue";
export default {
  components: { signUp, Logo },
};
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
img {
  display: block;
  margin-right: -140px;
}
@media screen and (max-width: 870px) {
  img {
    display: none;
  }
}
</style>
