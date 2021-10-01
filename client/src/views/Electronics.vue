<template>
<div class="electronics">
  <nav-bar :userData="userData" :authStatus="authStatus"></nav-bar>
  <div class="card" v-for="product in products" :key="product.id">
    <section-card :uid="uid" :product="product">
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
  props:['authStatus','uid', 'userData'],
  setup(){
      const products = ref([])
      const Products = async()=>{
          products.value = await getProducts('/products/types/electronics')
      }
      Products()
      return{products}
  }

}
</script>

<style scoped>
.card{
  display: flex;
  flex-direction: column;
  align-items:center;
}

</style>