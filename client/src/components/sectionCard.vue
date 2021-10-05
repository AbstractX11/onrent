<template>
  <div @click="changeRoute" class="section-card">
    <main class="main-container">
      <div v-if="product.sellerid === uid" class="edit">
        <img src="../assets/Image/edit.svg" />
      </div>
      <div class="image-view">
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
// import router from '../router/index'
// import {computed,ref} from 'vue'
import { useRoute } from "vue-router";
export default {
  props: ["product", "uid"],
  setup(props) {
    const route = useRoute();
    const changeRoute = () => {
      const routeName = route.name.toLowerCase();
      console.log(routeName);
      // const id = ref(computed(()=>props.product.id))
      // router.push({name:'Product',params:{type:routeName,productid:id.value},props:{uid:'IxSU6M9Z4pbByQzeFrCJL5K3Qoi1'}})
    };
    return { changeRoute };
  },
};
</script>

<style scoped>
.main-container {
  width: 65vw;
  height: 55vh;
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
  position: relative;
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
.edit {
  background: #ce5050;
  width: 6%;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  position: absolute;
  right: 10px;
  border-radius: 10px;
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
@media screen and (max-width: 1000px) {
  p.description,
  #description {
    display: none;
  }
}
@media screen and (max-width: 500px) {
  .image-view {
    display: none;
  }
}
@media screen and (max-width: 270px) {
  .edit {
    display: none;
  }
}
</style>
