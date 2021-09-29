<template>
  <div class="popup">
      <div class="popup-inner">
            <slot/> 
      </div>

  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.popup{
    font-family:Poppins;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: rgba(151, 145, 145, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

}
.popup-inner{
    background: #CE5050;
    padding:10px;
    border-radius: 5px;
}


</style>