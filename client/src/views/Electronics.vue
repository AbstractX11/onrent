<template>
<div>
  <nav-bar></nav-bar>
  <div v-for="product in products" :key="product.id">
    <section-card :product="product">
    </section-card>
  </div>
</div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import {getProducts} from '../firebase/productCollection'
import {ref} from 'vue'
import SectionCard from '../components/sectionCard.vue'
export default {
  components:{navBar,SectionCard},
  setup(){
      const products = ref([])
      const Products = async()=>{
          products.value = await getProducts()
      }
      Products()
      return{products}
  }

}
</script>

<style>

</style>