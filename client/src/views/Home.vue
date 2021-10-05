<template>
<div>
    <nav-bar v-if="screenWidth > 870" :uid="uid" :userData="userData" :authStatus="authStatus"></nav-bar>
</div>
</template>

<script>
  import navBar from '../components/navBar.vue'
  import {ref} from 'vue'
  export default{
    components:{navBar},
      props:['authStatus','userData','uid'],
      setup(){
        const screenWidth = ref(screen.width)
        window.onresize=()=>{
          screenWidth.value = screen.width
        }
        return {screenWidth}
      }

  }
</script>
