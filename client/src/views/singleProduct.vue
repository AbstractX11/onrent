<template>
<div>
  <!-- <nav-bar :uid="uid"  :userData="userData" :authStatus="authStatus"></nav-bar> -->
 <main class="main-container">
     <div v-if="product.sellerid === uid" class="edit">
      <img src="../assets/Image/edit.svg">
    </div>
        <div class="image-view">
            <img id='product-img' :src="product.Image" alt="product" />
        </div>

        <div class="main-view">
            <header id='main-view-header'>
                <div id='title-name'>{{product.Name}}</div>
                <div id='location'>{{product.Address}}</div>
            </header>

            <main id='main-view-mid'>
            </main>

            <nav class="footer-btn">
                <div class="button-container">
                   Rent Now
                </div>
            </nav>

        </div>
    </main>
</div>
</template>

<script>
// import navBar from '@/components/navBar.vue'
import {ref} from 'vue'
import { useRoute } from 'vue-router';
import {getProduct} from '../firebase/productCollection'
export default {
    // components:{navBar},
  props:['uid'],
  setup(){
    const product= ref();
    const route = useRoute();
    console.log(route.params.type) 
    const path = `/products/types/${route.params.type}`
    console.log(path)
    const reqProduct = async()=>{
        product.value = await getProduct(path,route.params.productid)
        console.log(product.value)
      }
    reqProduct()
    return{product}
  }
}
</script>

<style scoped>
.main-container {
  width: 50%;
  min-height: 400px;
  display: flex;
  background-color: #333;
  border-radius: 5px;
}

.image-view {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

#product-img {
  width: 90%;
  height: 90%;
  border-radius: 10px;
  object-fit: cover;
}

.main-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#main-view-header {
  font-size: 25px;
  width: 100%;
  padding-top: 20px;
  font-family: sans-serif;
}

#title-name {
  font-size: 1em;
  font-weight: bold;
  color: #fefefe;
  display: flex;
  align-items: center;
  justify-content: center;
}

#location {
  font-size: 0.6em;
  color: grey;
  margin-top: 10px;
}

.footer-btn {
  padding: 10px 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #fefefe;
    width: 90%;
    font-size: 14px;
    padding: 16px 0;
    border-radius: 10px;
    background-color: #ff385c;
    font-family: sans-serif;
}

#main-view-mid {
  min-height: 60%;
  background-color: yellow;
}
</style>