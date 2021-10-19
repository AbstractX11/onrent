<template>
  <div class="Profile">
    <nav-bar :uid="uid" :userData="userData" :authStatus="authStatus"></nav-bar>
    <div class="body">
      <profile :uid="uid" :userData="userData"></profile>
      <post-box :userData="userData" class="postbox" :uid="uid"></post-box>
      <p id="products">Products</p>
      <div class="card" v-for="product in products" :key="product.id">
      <section-card :uid="uid" :product="product"> </section-card>
    </div>
    </div>
    
  </div>
</template>

<script>
import navBar from "../components/Navbar/navBar.vue";
import profile from "../components/profile.vue";
import PostBox from "../components/postBox.vue";
import {ref} from'vue';
import {getProfileProducts} from '../firebase/productCollection'
import { useRoute } from 'vue-router';
import SectionCard from '../components/Cards/sectionCard.vue';
export default {
  components: { navBar, profile, PostBox, SectionCard },
  props: ["authStatus", "uid", "userData"],
  setup(props){
    const route =useRoute()
    const uid = route.params.id
    const products = ref([]);
    const Products = async () => {
      products.value= await getProfileProducts(uid);
    };
    Products();
    
    return{products}
  }
};
</script>
<style scoped>
.body {
  margin:10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.postbox {
  margin: 30px;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#products{
  font-family: Montserrat;
  font-weight:bolder;
  color:white;
  letter-spacing: 1px;
  text-transform: uppercase;
}

</style>
