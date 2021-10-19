<template>
  <div class="not-found">
    <h1 id="error">404 Not Found</h1>
    <div class="buttons">
      <button @click="goback" id="go-back">Go Back</button>
      <button @click="gohome" id="go-home">Go to Home</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    setup(){
        const router=useRouter()
        const goback = ()=>{
            router.go(-1)
        }
        const gohome = ()=>{
            router.replace({name:'Home'})
        }
        return{goback,gohome}
    }
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.not-found #error {
  color: #ce5050;
  font-family: Montserrat;
  text-transform: uppercase;
}
button {
  font-family: Poppins;
  outline: none;
  border: none;
  color: #fefefe;
  width: 90%;
  font-size: 14px;
  padding: 12px 0;
  margin: 5px;
  border-radius: 25px;
  background-color: #ce5050;
  cursor: pointer;
}
</style>
