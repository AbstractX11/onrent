<template>
<div class="post-box">
    <div>Wanna rent your product?
        <button @click="onClick">Rent Now</button>
    </div>
    <pop-ups v-if="postBoxpopuUp">
        <product-form :uid="uid" :popupToggle="onClick"></product-form>
    </pop-ups>
</div>
</template>

<script>
import {ref} from'vue'
import popUps from '../components/popUps.vue'
import productForm from '../components/productForm.vue'
export default {
    components:{popUps,productForm},
    props:['uid'],
    setup(){
    const postBoxpopuUp = ref(false)
    const onClick = ()=>{
        postBoxpopuUp.value = !postBoxpopuUp.value
    }
    return {postBoxpopuUp,onClick}
    }

}
</script>

<style scoped>
    .post-box{
        font-family: Poppins;
        width:400px;
        background: white;
        padding-left:20px;
        border-radius:50px;
        box-shadow: 5px 5px 10px black;
    }
    button {
        font-family: Montserrat;
        text-align: center;
        font-size: small;
        font-weight: 600;
        letter-spacing: 1px;
        margin: 10px auto;
        width: 140px;
        height: 40px;
        background: #ce5050;
        border: none;
        box-shadow: 5px 5px 10px rgb(90, 90, 90);
        border-radius: 5px;
        outline: none;
        color: #ffffff;
        cursor: pointer;
    }
</style>