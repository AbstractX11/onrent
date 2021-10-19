<template>
  <div class="post-box">
    <div class="postbox-inner">
      <div id="image">
      <img :src="user.image" />
     </div>
      <p @click="onClick">Rent your product?</p>
      <!-- <button @click="onClick">Rent Now</button> -->
    </div>
    <pop-ups v-if="postBoxpopuUp">
      <product-form :uid="uid" :popupToggle="onClick"></product-form>
    </pop-ups>
  </div>
</template>

<script>
import { ref ,reactive,computed} from "vue";
import popUps from "../components/popUps.vue";
import productForm from "./Forms/productForm.vue";
export default {
  components: { popUps, productForm },
  props: ["uid","userData"],
  setup(props) {
     const user = reactive({
      username: computed(() => props.userData.username),
      image: computed(() => props.userData.image),
    });
    const postBoxpopuUp = ref(false);
    const onClick = () => {
      postBoxpopuUp.value = !postBoxpopuUp.value;
    };
    return { postBoxpopuUp, onClick,user};
  },
};
</script>

<style scoped>
.post-box {
  font-family: Poppins;
  background: linear-gradient(
    to top right,
    rgba(1, 1, 1, 0.7),
    rgba(1, 1, 1, 0.4)
  );
  padding: 10px 20px;
  color: white;
  border-radius: 10px;
}
.postbox-inner{
  display: flex;
  align-items:center;
  justify-content: space-evenly;
}
.postbox-inner p{
  background:rgba(119, 116, 116, 0.2);
  padding:5px 15px;
  border-radius: 20px;
}
.postbox-inner p:hover{
  background:#3A3B3C;
}
#image {
  height: 40px;
  width: 40px;
  margin-right:10px;
  background: white;
  border-radius: 50%;
  overflow: hidden;
}
#image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
button {
  font-family: Montserrat;
  text-align: center;
  font-size: small;
  font-weight: bold;
  letter-spacing: 1px;
  margin-left:10px;
  padding:10px 5px;
  background: #ce5050;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
}
</style>
