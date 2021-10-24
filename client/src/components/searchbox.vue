<template>
<div class="searchbox">
  <input v-model="value" @keyup="$emit('value',value)" class="search" :placeholder="placeholder"/>
</div>
</template>

<script>
import { useRoute } from 'vue-router';
import {ref} from 'vue'
export default {
    emits: ['value'],
    setup(){
     const value = ref("")
     const route = useRoute()
     const placeholder = `Search in ${route.name}`;
     return{placeholder,value}
    }
}
</script>

<style scoped>
.search{
  margin-top:10px;
  width:65vw;
  padding:10px;
  outline:none;
  border:none;
  border-radius:5px;
  background:rgb(58, 58, 58);
  font-family:Poppins;
  color:#ffff;
  letter-spacing:1px;
}
.search:hover{
  background:rgb(95, 95, 95);
}
::placeholder{
  font-family:Poppins;
  color:#ffff;
}
</style>