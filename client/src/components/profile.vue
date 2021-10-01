<template>
<div class="profile">
    <div id="image">
        <img :src="user.image"/>
    </div>
    <div id="username">{{user.username}}</div>
</div>
  
</template>

<script>
import {reactive,computed} from 'vue'
export default {
    props:['userData'],
    setup(props){
      const user= reactive({
      username:computed(()=>props.userData.username),
      image:computed(()=>props.userData.image)
    })
    return{user}
      }
}
</script>

<style scoped>
.profile{
    display: flex;
    flex-direction: column;
    align-items: center;   
}
    #image{
        height:120px;
        width:120px;
        background: white;
        border-radius:50%;
        overflow: hidden;
    }
    #image img{
        height: 100%;
        width:100%;
        object-fit: cover;
    }
    #username{
        margin-top:20px;
        font-size:30px;
        text-transform: uppercase;
        font-family:Poppins;
        font-weight: bold;
        color: white;
    }
</style>