<template>
  <div class="rooms">
    <nav-bar :uid="uid" :userData="userData" :authStatus="authStatus"></nav-bar>
    <div class="body">
      <searchbox @value="getSearchValue"></searchbox>
      <div class="notfound" v-if="filteredProducts.length == 0">
        <p>oops! There are no such products</p>
      </div>
      <div class="card" v-for="product in filteredProducts" :key="product.id">
        <section-card :uid="uid" :product="product"> </section-card>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/Navbar/navBar.vue";
import { getProducts } from "../../firebase/productCollection";
import { ref } from "vue";
import SectionCard from "../../components/Cards/sectionCard.vue";
import Searchbox from "../../components/searchbox.vue";
export default {
  components: { navBar, SectionCard, Searchbox },
  props: ["authStatus", "uid", "userData"],
  setup() {
    const products = ref([]);
    const filteredProducts = ref([]);
    const getSearchValue = (value) => {
      const searchValue = value.replace(/\s/g, "");
      const regex = new RegExp(`${searchValue}`, "gi");
      if (value === "") {
        filteredProducts.value = products.value;
      } else {
        filteredProducts.value = products.value.filter((product) => {
          regex.lastIndex = 0;
          return regex.exec(product.Name.replace(/\s/g, ""));
        });
      }
    };
    const mainFunction = async () => {
      const Products = async () => {
        products.value = await getProducts("/products/types/rooms");
      };
      await Products();
      filteredProducts.value = products.value;
    };
    mainFunction();
    return { products, getSearchValue, filteredProducts };
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.notfound p {
  text-transform: uppercase;
  font-family: montserrat;
  font-weight: bolder;
  margin: 10px;
  color: #ce5050;
  letter-spacing: 1px;
}
</style>
