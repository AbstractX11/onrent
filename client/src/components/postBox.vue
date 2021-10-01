<template>
  <div class="post-box">
    <div class="postbox-inner">
      <p>Wanna rent your product?</p>
      <button @click="onClick">Rent Now</button>
    </div>
    <pop-ups v-if="postBoxpopuUp">
      <product-form :uid="uid" :popupToggle="onClick"></product-form>
    </pop-ups>
  </div>
</template>

<script>
import { ref } from "vue";
import popUps from "../components/popUps.vue";
import productForm from "../components/productForm.vue";
export default {
  components: { popUps, productForm },
  props: ["uid"],
  setup() {
    const postBoxpopuUp = ref(false);
    const onClick = () => {
      postBoxpopuUp.value = !postBoxpopuUp.value;
    };
    return { postBoxpopuUp, onClick };
  },
};
</script>

<style scoped>
.post-box {
  font-family: Poppins;
  width: 400px;
  background: linear-gradient(
    to top right,
    rgba(1, 1, 1, 0.7),
    rgba(1, 1, 1, 0.4)
  );
  padding: 10px 20px;
  color:white;
  border-radius: 10px;
}
button {
  font-family: Montserrat;
  text-align: center;
  font-size: small;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 10px auto;
  width: 140px;
  height: 40px;
  background: #ce5050;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color:white
}
</style>
