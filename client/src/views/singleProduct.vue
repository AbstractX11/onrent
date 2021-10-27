<template>
<div class="singleproduct">
  <nav-bar
      :uid="uid"
      :userData="userData"
      :authStatus="authStatus"
    ></nav-bar>
     <main class="container">
       <div  class="image-view">
        <img id="product-img" :src="product.Image" alt="product" />
      </div>

      <div class="main-view">
        <header id="main-view-header">
          <div id="title-name">{{ product.Name }}</div>
          <div id="location">{{ product.Address }}</div>
        </header>

        <main id="main-view-mid">
          <p>PRICE</p>
          <div id="price">Rs {{ product.Price }}</div>
          <div class="lil-image-view">
            <img id="lil-product-img" :src="product.Image" alt="product" />
          </div>
          <p class="description">Description</p>
          <div id="description">{{ product.Description }}</div>
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
#header{
  width:90vw;
}
.singleproduct{
  display: flex;
  flex-flow:column;
  align-items: center;
}
.container {
  width: 95vw;
  height: 85vh;
  min-height: 400px;
  font-family: Poppins;
  background: linear-gradient(
    to top right,
    rgba(1, 1, 1, 0.7),
    rgba(1, 1, 1, 0.4)
  );
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items: top;
  justify-content: center;
  position: relative;
}
.image-view {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lil-image-view {
  display: none;
  width: 100%;
  height: 50%;
}
#lil-product-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
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
  position: relative;
}

#main-view-header {
  font-size: 25px;
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 25px;
}

#title-name {
  text-transform: uppercase;
  font: size 1.2em;
  font-weight: bold;
  color: #ce5050;
}
.buttons {
  position: absolute;
  right: 10px;
  border-radius: 10px;
}
.popup {
  z-index: 5;
}
.delete,
.edit {
  background: #ce5050;
  color: white;
  outline: none;
  border: none;
  padding: 3px;
  margin: 3px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  z-index: 4;
}
#location {
  font-size: medium;
  margin-top: -5px;
  font-weight: bold;
  color: rgba(144, 142, 142, 0.7);
}
#price {
  font-weight: bold;
  font-size: 1.5em;
  color: white;
  margin-bottom: 25px;
}
#description {
  padding: 15px 5px;
  font-size: small;
  color: rgba(214, 115, 115, 0.7);
}
p {
  font-size: small;
  font-weight: bold;
  text-transform: uppercase;
  color: rgba(144, 142, 142, 0.7);
}
p.description {
  padding: 5px;
  border-bottom: 1px solid rgba(144, 142, 142, 0.3);
}

.footer-btn {
  padding: 10px 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 0;
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
  border-radius: 25px;
  background-color: #ce5050;
}

#main-view-mid {
  min-height: 60%;
}
@media screen and (max-width: 500px) {
  .container {
    height: 75%;
  }
  .image-view {
    display: none;
  }
  .lil-image-view {
    display: block;
  }
  .footer-btn {
    position: relative;
  }
    p.description,
  #description {
    display: none;
  }
}
@media screen and (max-width: 400px) {
  .container {
    width: 90vw;
  }
}
@media screen and (max-width: 270px) {
}

</style>