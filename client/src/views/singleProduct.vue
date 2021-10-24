<template>
<div>
  <nav-bar
      :uid="uid"
      :userData="userData"
      :authStatus="authStatus"
    ></nav-bar>
       <main class="container">
      <!-- Right Column -->
      <div class="left-column">
        <img :src="product.Image">
      </div>
      <div class="right-column">
        <!-- Product Description -->
        <div class="product-description">
          <h1>{{product.Name}}</h1>
          <span>{{product.Address}}</span>
          <p>{{product.Description}}</p>
        </div>

        <!-- Product Pricing -->
        <div class="product-price">
          <span>{{product.Price}}</span>
          <a href="#" class="cart-btn">RENT NOW</a>
        </div>
      </div>
    </main>
</div>

</template>

<script>
import { useRoute } from 'vue-router'
import navBar from '../components/Navbar/navBar.vue'
import { getProduct } from '../firebase/productCollection'
import {ref} from 'vue'
export default {
  components: { navBar },
  props: ["authStatus", "userData", "uid"],
  setup(){
    const route = useRoute()
    const collectionPath = `products/types/${route.params.type}`
    const product= ref({});
    const get = async()=>{
      product.value = await getProduct(collectionPath,route.params.id)
    }
    get()
    return {product}
  }
}
</script>

<style scoped>
.container{
  width:100%;
  height:80vh;
  padding:10px;
  display:flex;
  justify-content:space-around;
  font-family: Poppins;
  background: linear-gradient(
    to top right,
    rgba(1, 1, 1, 0.7),
    rgba(1, 1, 1, 0.4)
  );
}
.left-column{
  height:100%;
  width:45%;
  min-width:200px;
}
.left-column img{
  height:100%;
  width:100%;
  object-fit: cover;
  border-radius:10px;
}
.right-column{
  width:50%
}
.product-description h1{
  color:#ce5050;
}

</style>